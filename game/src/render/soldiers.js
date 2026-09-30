// Batched soldier drawing. Every body part of every soldier is one instance in a shared
// InstancedMesh per part type, so 100+ soldiers cost about 25 draw calls instead of thousands.
// Each soldier has a small skeleton (root, body, legs, arms, shield, spear) posed every frame.
// Factions change the look only: Romans (galea, scutum, gladius), Greeks (bronze Corinthian helmet,
// round hoplon), barbarians (hair and beards, bare chests, round wooden shields, axes).
import * as THREE from 'three';
import { TEAMS, CRESTS } from '../config.js';
import { G, isEnemyTi, isFfa, colorOf, bus } from '../core/state.js';
import { braced } from '../core/sim.js';
import { scene, shadowsOn, camera } from './scene.js';
import { camTarget } from './camera.js';
import { trail } from './effects.js';
import { groundY } from '../core/world.js';
import { quality } from './quality.js';

const MAX_UNITS = 320;

// ---------- geometry ----------
// Segment counts bumped a notch over the original low-poly pass for smoother silhouettes —
// same rig and part count per unit, so the draw-call/instance budget is unchanged.
const scutum = (() => { const g = new THREE.CylinderGeometry(1, 1, 1.15, 14, 1, true, -.42, .84); g.translate(0, 0, -1); return g; })();
const hoplon = (() => { const g = new THREE.SphereGeometry(.95, 24, 8, 0, Math.PI * 2, 0, .7); g.rotateX(Math.PI / 2); g.translate(0, 0, -.95 * Math.cos(.7)); g.scale(1, 1, .6); return g; })();
const roundShield = (() => { const g = new THREE.CylinderGeometry(.5, .5, .08, 22); g.rotateX(Math.PI / 2); return g; })();
// Everything soft and round: capsule limbs, bean-shaped bodies, pebble boots and egg-shaped crests,
// so the soldiers read as chunky toys rather than stacked boxes.
const ellip = (rx, ry, rz, w = 10, h = 7) => { const g = new THREE.SphereGeometry(1, w, h); g.scale(rx, ry, rz); return g; };
const lathe = (pts, seg = 14) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);
const capsule = (r, len, cap = 3, seg = 8) => new THREE.CapsuleGeometry(r, len, cap, seg);
const GEO = {
  leg: capsule(.15, .44, 2, 7),
  boot: (() => { const g = ellip(.13, .1, .19, 8, 6); g.translate(0, .02, .03); return g; })(),
  greave: capsule(.17, .16, 2, 7),
  // a rounded barrel: narrow waist, full chest, soft shoulders
  torso: lathe([[0, -.42], [.3, -.41], [.4, -.33], [.45, -.14], [.47, .06], [.45, .22], [.39, .34], [.26, .42], [0, .45]]),
  skirt: lathe([[.4, .17], [.45, .1], [.52, -.08], [.54, -.14], [.5, -.18], [.4, -.19], [.36, -.14], [.4, .17]]),
  belt: (() => { const g = new THREE.TorusGeometry(.43, .07, 5, 14); g.rotateX(Math.PI / 2); return g; })(),
  head: new THREE.SphereGeometry(.4, 16, 12),
  helm: new THREE.SphereGeometry(.44, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
  corinth: new THREE.SphereGeometry(.47, 16, 10, 0, Math.PI * 2, 0, Math.PI * .52),
  cone: new THREE.ConeGeometry(.44, .7, 16),
  hood: new THREE.SphereGeometry(.45, 18, 10, 0, Math.PI * 2, 0, Math.PI * .6),
  brim: new THREE.CylinderGeometry(.62, .66, .05, 22),
  // a horsehair brush: the top half of an egg, sitting flat on the helmet
  crest: (() => { const g = new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2); g.scale(.06, .24, .33); g.translate(0, -.11, 0); return g; })(),
  cheek: ellip(.05, .16, .13, 8, 6),
  pauldron: (() => { const g = new THREE.SphereGeometry(.17, 12, 8, 0, Math.PI * 2, 0, Math.PI * .55); g.scale(1, .8, 1.1); return g; })(),
  nose: capsule(.04, .16, 3, 6),
  knob: new THREE.SphereGeometry(.09, 10, 8),
  hair: new THREE.SphereGeometry(.45, 18, 10, 0, Math.PI * 2, 0, Math.PI * .55),
  beard: ellip(.23, .17, .12),
  hand: new THREE.SphereGeometry(.12, 8, 6),
  circlet: new THREE.TorusGeometry(.42, .045, 8, 22),
  mantle: (() => { const g = new THREE.TorusGeometry(.42, .14, 6, 14); g.rotateX(Math.PI / 2); return g; })(),
  face: new THREE.PlaneGeometry(.58, .3),
  arm: capsule(.12, .34, 2, 7),
  blade: new THREE.BoxGeometry(.07, .07, 1.0),
  gladius: new THREE.BoxGeometry(.09, .06, .72),
  guard: new THREE.BoxGeometry(.32, .06, .06),
  haft: new THREE.CylinderGeometry(.04, .04, 1.05, 8),
  axeHead: new THREE.BoxGeometry(.05, .36, .26),
  shaft: new THREE.CylinderGeometry(.04, .04, 3.0, 7),
  tip: new THREE.ConeGeometry(.09, .35, 7),
  bow: new THREE.TorusGeometry(.6, .035, 6, 18, Math.PI),
  quiver: capsule(.12, .5, 2, 7),
  scutum, hoplon, roundShield,
  rim: new THREE.TorusGeometry(.6, .05, 8, 28),
  woodRim: new THREE.TorusGeometry(.5, .04, 8, 24),
  boss: new THREE.SphereGeometry(.13, 12, 8),
  shadow: new THREE.CircleGeometry(.62, 18),
  ring: new THREE.RingGeometry(.8, 1.0, 28),
  cape: new THREE.PlaneGeometry(.9, 1.1),
};

// Faces: one painted texture per expression, swapped per soldier by what he's going through.
const INK = '#1b1512';
function faceTex(draw) {
  const c = document.createElement('canvas'); c.width = 128; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = INK; x.strokeStyle = INK; x.lineCap = 'round'; x.lineJoin = 'round';
  draw(x);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const eyes = (x, rx = 7, ry = 9, y = 26) => { x.beginPath(); x.ellipse(40, y, rx, ry, 0, 0, Math.PI * 2); x.ellipse(88, y, rx, ry, 0, 0, Math.PI * 2); x.fill(); };
const brows = (x, l1, l2, w = 7) => { x.lineWidth = w; x.beginPath(); x.moveTo(24, l1); x.lineTo(54, l2); x.moveTo(104, l1); x.lineTo(74, l2); x.stroke(); };
const FACES = {
  // determined: the old face
  normal: faceTex(x => { eyes(x); brows(x, 10, 17); x.beginPath(); x.moveTo(64, 48); x.quadraticCurveTo(44, 42, 30, 56); x.quadraticCurveTo(46, 50, 64, 54); x.quadraticCurveTo(82, 50, 98, 56); x.quadraticCurveTo(84, 42, 64, 48); x.fill(); }),
  // mid-swing war cry: furious brows, squinting, mouth wide open
  yell: faceTex(x => { eyes(x, 8, 5, 28); brows(x, 8, 22, 8); x.beginPath(); x.ellipse(64, 50, 17, 11, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c0474b'; x.beginPath(); x.ellipse(64, 55, 9, 4, 0, 0, Math.PI * 2); x.fill(); }),
  // just got hit: eyes screwed shut (> <), mouth stretched in a wince
  ouch: faceTex(x => { x.lineWidth = 6; x.beginPath(); x.moveTo(30, 18); x.lineTo(48, 26); x.lineTo(30, 34); x.moveTo(98, 18); x.lineTo(80, 26); x.lineTo(98, 34); x.stroke();
    x.lineWidth = 5; x.beginPath(); x.moveTo(40, 52); x.lineTo(50, 46); x.lineTo(58, 52); x.lineTo(66, 46); x.lineTo(74, 52); x.lineTo(82, 46); x.lineTo(90, 52); x.stroke(); }),
  // stunned: spiral eyes and a wobbly mouth
  dizzy: faceTex(x => { x.lineWidth = 3.5; for (const cx of [40, 88]) { x.beginPath(); for (let a = 0; a < 14; a += .3) { const r = a * .75; x.lineTo(cx + Math.cos(a) * r, 26 + Math.sin(a) * r); } x.stroke(); }
    x.lineWidth = 5; x.beginPath(); x.moveTo(38, 52); for (let i = 0; i <= 8; i++) x.lineTo(38 + i * 6.5, 52 + (i % 2 ? -5 : 4)); x.stroke(); }),
  // captain's down or nearly dead: worried brows, wide eyes, small "o"
  scared: faceTex(x => { x.fillStyle = '#fff'; eyes(x, 10, 12, 28); x.fillStyle = INK; eyes(x, 4, 5, 30); brows(x, 18, 8, 6); x.lineWidth = 5; x.beginPath(); x.ellipse(64, 52, 6, 7, 0, 0, Math.PI * 2); x.stroke(); }),
  // gone: X eyes and the tongue out
  dead: faceTex(x => { x.lineWidth = 6; for (const cx of [40, 88]) { x.beginPath(); x.moveTo(cx - 9, 17); x.lineTo(cx + 9, 35); x.moveTo(cx + 9, 17); x.lineTo(cx - 9, 35); x.stroke(); }
    x.lineWidth = 5; x.beginPath(); x.moveTo(44, 48); x.lineTo(84, 48); x.stroke(); x.fillStyle = '#d75a6a'; x.beginPath(); x.ellipse(72, 55, 7, 8, 0, 0, Math.PI * 2); x.fill(); }),
};
const EXPRS = Object.keys(FACES);
if (import.meta.env.DEV) window.__faces = FACES; // dev-only: lets tests look at the expressions

// White materials take their color from each instance (skin, team color, wood, bronze...).
// Cloth and skin use soft two-tone cartoon shading; metal keeps a shine so helmets still gleam.
const TOON = (() => { const d = new Uint8Array([150, 150, 150, 255, 215, 215, 215, 255, 255, 255, 255, 255]); const t = new THREE.DataTexture(d, 3, 1); t.magFilter = t.minFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
export const MAT = {
  plain: new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap: TOON }),
  plain2: new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap: TOON, side: THREE.DoubleSide }),
  metal: new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 80, specular: 0x8a8a8a }),
  shadow: new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .28, depthWrite: false }),
  ring: new THREE.MeshBasicMaterial({ color: 0xffcf3a, transparent: true, opacity: .8, side: THREE.DoubleSide, depthWrite: false }),
  ringAlly: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .45, side: THREE.DoubleSide, depthWrite: false }),
};
for (const k of EXPRS) MAT['face_' + k] = new THREE.MeshBasicMaterial({ map: FACES[k], transparent: true, depthWrite: false });
const TINTED = new Set(['plain', 'plain2', 'metal']);
const NO_SHADOW = new Set(['shadow', 'ring', 'ringAlly', ...EXPRS.map(k => 'face_' + k)]);

const col = h => new THREE.Color(h);
const C = {
  skin: [0xf2d6bc, 0xe4bc98, 0xc8966e].map(col), hair: [0xe0b85c, 0xb5602a, 0x5a3a22, 0x2e2420].map(col),
  steel: col(0xa6adb8), bronze: col(0xc8903c), wood: col(0x6b4a2e), leather: col(0x4e3420), gold: col(0xffcf3a), linen: col(0xece2c8), fur: col(0x7a5a3c),
  team: TEAMS.map(t => col(t.hex)), dark: TEAMS.map(t => col(t.hex).multiplyScalar(.62)),
};
const hash = u => (Math.imul(u.id | 0, 2654435761) >>> 0);
const skinOf = u => C.skin[hash(u) % 3], hairOf = u => C.hair[(hash(u) >>> 4) % 4];
export const factionOf = u => (G.factions && G.factions[colorOf(u.ti)]) || 'roman';

// ---------- part list ----------
const e = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));
// filters: k = kinds, f = factions, t = tier predicate (u => bool), for Footman/Archer/captain
// upgrade tiers so each purchase changes the model, not just the stats.
const K = (...ks) => new Set(ks), F = (...fs) => new Set(fs);
// a captain's crest colour: the one their player picked (unlocked by rank); computer captains wear gold
const CREST_C = CRESTS.map(c => new THREE.Color(c.hex));
const crestCol = u => CREST_C[(G.crests && G.crests[u.ti]) || 0] || CREST_C[0];
const MELEE = K('foot', 'captain'), HELMED = K('foot', 'captain');
const armed = u => u.tier >= 1; // Footman/captain Arms upgrade: spear + javelin
const armored = u => u.tier >= 2; // Footman/captain Armor upgrade: extra plate
// what's in the weapon hand: a player captain shows the weapon they picked; everyone else by tier
const spearOut = u => u.weapon ? u.weapon !== 'sword' : u.tier >= 1;
const trained = u => u.tier >= 1, marksman = u => u.tier >= 2; // Archer tiers
const team = u => C.team[colorOf(u.ti)], dark = u => C.dark[colorOf(u.ti)];
const PARTS = [
  { bone: 'root', geo: 'shadow', mat: 'shadow', m: e(0, .03, 0, -Math.PI / 2), when: 'blob' },
  { bone: 'root', geo: 'ring', mat: 'ring', m: e(0, .05, 0, -Math.PI / 2), when: 'me' },
  { bone: 'root', geo: 'ring', mat: 'ringAlly', m: e(0, .05, 0, -Math.PI / 2), when: 'ally' },
  // legs and feet
  { bone: 'legL', geo: 'leg', mat: 'plain', m: e(0, -.35, 0), col: dark },
  { bone: 'legR', geo: 'leg', mat: 'plain', m: e(0, -.35, 0), col: dark },
  { bone: 'legL', geo: 'boot', mat: 'plain', m: e(0, -.68, .05), col: () => C.leather },
  { bone: 'legR', geo: 'boot', mat: 'plain', m: e(0, -.68, .05), col: () => C.leather },
  { bone: 'legL', geo: 'greave', mat: 'metal', m: e(0, -.46, 0), f: F('greek'), k: HELMED, col: () => C.bronze },
  { bone: 'legR', geo: 'greave', mat: 'metal', m: e(0, -.46, 0), f: F('greek'), k: HELMED, col: () => C.bronze },
  // body
  { bone: 'body', geo: 'torso', mat: 'metal', m: e(0, 1.08, 0), f: F('roman'), k: HELMED, col: () => C.steel },
  { bone: 'body', geo: 'torso', mat: 'metal', m: e(0, 1.08, 0), f: F('greek'), k: K('captain'), col: () => C.bronze },
  { bone: 'body', geo: 'torso', mat: 'plain', m: e(0, 1.08, 0), f: F('greek'), k: K('foot', 'spear'), col: () => C.linen },
  { bone: 'body', geo: 'torso', mat: 'plain', m: e(0, 1.08, 0), f: F('barbarian'), k: MELEE, t: u => !armed(u), col: skinOf },
  { bone: 'body', geo: 'torso', mat: 'plain', m: e(0, 1.08, 0), f: F('barbarian'), k: MELEE, t: armed, col: dark },
  { bone: 'body', geo: 'torso', mat: 'plain', m: e(0, 1.08, 0), k: K('arch'), col: dark },
  { bone: 'body', geo: 'skirt', mat: 'plain', m: e(0, .64, 0), f: F('roman', 'greek'), col: team },
  { bone: 'body', geo: 'belt', mat: 'plain', m: e(0, .78, 0), col: u => factionOf(u) === 'barbarian' ? team(u) : C.leather },
  { bone: 'body', geo: 'head', mat: 'plain', m: e(0, 1.78, 0), col: skinOf },
  ...EXPRS.map(k => ({ bone: 'body', geo: 'face', mat: 'face_' + k, m: e(0, 1.73, .39), t: u => exprOf(u) === k })),
  // archers (every faction)
  { bone: 'body', geo: 'hood', mat: 'plain', m: e(0, 1.82, -.02), k: K('arch'), f: F('roman', 'barbarian'), col: team },
  { bone: 'body', geo: 'helm', mat: 'plain', m: e(0, 1.9, 0, 0, 0, 0, .8, .7, .8), k: K('arch'), f: F('greek'), col: () => C.leather },
  { bone: 'body', geo: 'brim', mat: 'plain', m: e(0, 1.98, 0), k: K('arch'), f: F('greek'), col: team },
  { bone: 'body', geo: 'quiver', mat: 'plain', m: e(.2, 1.25, -.42, 0, 0, .4), k: K('arch'), col: () => C.leather },
  // Roman galea
  { bone: 'body', geo: 'helm', mat: 'metal', m: e(0, 1.86, 0), f: F('roman'), k: HELMED, col: () => C.steel },
  { bone: 'body', geo: 'cheek', mat: 'metal', m: e(.34, 1.64, .12, 0, 0, .12), f: F('roman'), k: HELMED, col: () => C.steel },
  { bone: 'body', geo: 'cheek', mat: 'metal', m: e(-.34, 1.64, .12, 0, 0, -.12), f: F('roman'), k: HELMED, col: () => C.steel },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.36, 0), f: F('roman'), k: K('foot'), t: u => !armed(u), col: team },
  { bone: 'body', geo: 'knob', mat: 'metal', m: e(0, 2.3, 0), f: F('roman'), k: K('foot'), t: armed, col: () => C.bronze },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.36, 0, 0, Math.PI / 2, 0, 1.3, 1.5, 1.25), f: F('roman'), k: K('captain'), col: crestCol },
  // Greek Corinthian helmet with a tall horsehair crest
  { bone: 'body', geo: 'corinth', mat: 'metal', m: e(0, 1.8, 0), f: F('greek'), k: HELMED, col: () => C.bronze },
  { bone: 'body', geo: 'nose', mat: 'metal', m: e(0, 1.74, .45), f: F('greek'), k: HELMED, col: () => C.bronze },
  { bone: 'body', geo: 'cheek', mat: 'metal', m: e(.33, 1.62, .18, 0, 0, .1), f: F('greek'), k: HELMED, col: () => C.bronze },
  { bone: 'body', geo: 'cheek', mat: 'metal', m: e(-.33, 1.62, .18, 0, 0, -.1), f: F('greek'), k: HELMED, col: () => C.bronze },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.4, -.04, 0, 0, 0, 1.3, 1.6, 1.3), f: F('greek'), k: K('foot', 'spear'), col: team },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.42, -.04, 0, 0, 0, 1.45, 1.7, 1.35), f: F('greek'), k: K('captain'), col: crestCol },
  // barbarians: hair, beards, a gold circlet and fur mantle for the chief
  { bone: 'body', geo: 'hair', mat: 'plain', m: e(0, 1.82, -.03), f: F('barbarian'), k: HELMED, col: hairOf },
  { bone: 'body', geo: 'beard', mat: 'plain', m: e(0, 1.55, .3, .15), f: F('barbarian'), k: HELMED, col: hairOf },
  { bone: 'body', geo: 'circlet', mat: 'metal', m: e(0, 1.92, 0, Math.PI / 2), f: F('barbarian'), k: K('captain'), col: crestCol },
  { bone: 'body', geo: 'mantle', mat: 'plain', m: e(0, 1.44, 0), f: F('barbarian'), k: K('captain', 'foot'), col: () => C.fur },
  // captain's cape
  { bone: 'body', geo: 'cape', mat: 'plain2', m: e(0, 1.02, -.44, .12), k: K('captain'), col: team },
  // arms
  { bone: 'sArm', geo: 'arm', mat: 'plain', m: e(0, -.22, 0), col: skinOf },
  { bone: 'wArm', geo: 'arm', mat: 'plain', m: e(0, -.22, 0), col: skinOf },
  { bone: 'sArm', geo: 'hand', mat: 'plain', m: e(0, -.5, .02), col: skinOf },
  { bone: 'wArm', geo: 'hand', mat: 'plain', m: e(0, -.5, .02), col: skinOf },
  // shields (on their own bone so they face forward)
  { bone: 'shield', geo: 'scutum', mat: 'plain2', m: e(0, 0, 0), f: F('roman'), k: MELEE, col: team },
  { bone: 'shield', geo: 'boss', mat: 'metal', m: e(0, 0, .05), f: F('roman'), k: MELEE, col: u => u.leader ? crestCol(u) : C.steel },
  { bone: 'shield', geo: 'hoplon', mat: 'plain2', m: e(0, 0, 0), f: F('greek'), k: MELEE, col: team },
  { bone: 'shield', geo: 'rim', mat: 'metal', m: e(0, 0, 0), f: F('greek'), k: MELEE, col: u => u.leader ? crestCol(u) : C.bronze },
  { bone: 'shield', geo: 'roundShield', mat: 'plain', m: e(0, 0, 0), f: F('barbarian'), k: MELEE, col: team },
  { bone: 'shield', geo: 'woodRim', mat: 'plain', m: e(0, 0, 0), f: F('barbarian'), k: MELEE, col: () => C.wood },
  { bone: 'shield', geo: 'boss', mat: 'metal', m: e(0, 0, .06), f: F('barbarian'), k: MELEE, col: u => u.leader ? crestCol(u) : C.steel },
  // weapons: base tier carries sword + shield; the Arms upgrade (tier 1+) swaps the sword for a
  // spear (reusing the old Spearman's shaft/tip bones) on both squad Footmen and the captain.
  { bone: 'wArm', geo: 'guard', mat: 'plain', m: e(0, -.5, .12), f: F('roman', 'greek'), k: MELEE, col: () => C.leather },
  { bone: 'wArm', geo: 'gladius', mat: 'metal', m: e(0, -.5, .5), f: F('roman'), k: MELEE, t: u => !spearOut(u), col: () => C.steel },
  { bone: 'wArm', geo: 'blade', mat: 'metal', m: e(0, -.5, .6), f: F('greek'), k: MELEE, t: u => !spearOut(u), col: () => C.bronze },
  { bone: 'wArm', geo: 'haft', mat: 'plain', m: e(0, -.5, .42, Math.PI / 2), f: F('barbarian'), k: MELEE, t: u => !spearOut(u), col: () => C.wood },
  { bone: 'wArm', geo: 'axeHead', mat: 'metal', m: e(0, -.35, .86), f: F('barbarian'), k: MELEE, t: u => !spearOut(u), col: () => C.steel },
  { bone: 'spear', geo: 'shaft', mat: 'plain', m: e(0, 0, .6, Math.PI / 2), k: MELEE, t: spearOut, col: () => C.wood },
  { bone: 'spear', geo: 'tip', mat: 'metal', m: e(0, 0, 2.2, Math.PI / 2), k: MELEE, t: spearOut, col: u => factionOf(u) === 'greek' ? C.bronze : C.steel },
  // the Armor upgrade (tier 2) adds a plate over each shoulder, on top of whatever's already worn
  { bone: 'sArm', geo: 'pauldron', mat: 'metal', m: e(0, .08, .02, 0, 0, .3), k: MELEE, t: armored, col: u => factionOf(u) === 'greek' ? C.bronze : C.steel },
  { bone: 'wArm', geo: 'pauldron', mat: 'metal', m: e(0, .08, .02, 0, 0, -.3), k: MELEE, t: armored, col: u => factionOf(u) === 'greek' ? C.bronze : C.steel },
  { bone: 'sArm', geo: 'bow', mat: 'plain', m: e(0, -.48, .2, 0, Math.PI / 2, Math.PI / 2), k: K('arch'), col: () => C.wood },
  // Archer tiers: Training (1+) adds a forearm guard, Marksman (2) reinforces the bow with steel
  { bone: 'wArm', geo: 'guard', mat: 'plain', m: e(0, -.5, .12), k: K('arch'), t: trained, col: () => C.leather },
  { bone: 'wArm', geo: 'guard', mat: 'metal', m: e(0, -.5, .3), k: K('arch'), t: marksman, col: () => C.steel },
];

// A bigger head (and everything worn on it) for chunkier, friendlier proportions: every body part
// above the shoulders is scaled up around the head's centre.
const HEAD_S = 1.16, HEAD_C = new THREE.Vector3(0, 1.74, 0);
const headUp = new THREE.Matrix4().makeTranslation(HEAD_C.x, HEAD_C.y, HEAD_C.z)
  .multiply(new THREE.Matrix4().makeScale(HEAD_S, HEAD_S, HEAD_S)).multiply(new THREE.Matrix4().makeTranslation(-HEAD_C.x, -HEAD_C.y, -HEAD_C.z));
for (const p of PARTS) if (p.bone === 'body' && p.m.elements[13] >= 1.5) p.m.premultiply(headUp);

// Closed, chunky shapes get an ink outline (open shells and flat planes would show their insides).
const OUTLINED = new Set(['leg', 'torso', 'skirt', 'head', 'arm', 'beard', 'roundShield', 'mantle', 'quiver', 'greave']);
MAT.outline = new THREE.MeshBasicMaterial({ color: 0x1b1512, side: THREE.BackSide });
MAT.outline.onBeforeCompile = sh => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n  transformed += normalize(normal) * .035;'); };
MAT.outline.customProgramCacheKey = () => 'soldier-outline';

// small bits that don't need to cast a shadow of their own
const TINY = new Set(['hand', 'boot', 'belt', 'cheek', 'nose', 'knob', 'guard', 'boss']);

// One InstancedMesh per (geometry, material) pair.
const batches = new Map();
for (const p of PARTS) {
  const key = p.geo + '|' + p.mat;
  let b = batches.get(key);
  if (!b) { b = { perUnit: 0, n: 0, mesh: null, geo: p.geo, mat: p.mat }; batches.set(key, b); }
  b.perUnit++; p.batch = b;
}
for (const b of batches.values()) {
  const cap = Math.max(1, b.perUnit) * MAX_UNITS;
  const m = new THREE.InstancedMesh(GEO[b.geo], MAT[b.mat], cap);
  m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  if (TINTED.has(b.mat)) { m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(cap * 3), 3); m.instanceColor.setUsage(THREE.DynamicDrawUsage); }
  m.frustumCulled = false; m.count = 0;
  m.castShadow = !NO_SHADOW.has(b.mat) && !TINY.has(b.geo); m.receiveShadow = !NO_SHADOW.has(b.mat);
  if (b.mat === 'shadow' || b.mat.startsWith('ring')) m.renderOrder = 1;
  scene.add(m); b.mesh = m;
  // a thin dark outline: the same instances drawn again, puffed out a touch, back faces only
  if (OUTLINED.has(b.geo)) {
    const o = new THREE.InstancedMesh(GEO[b.geo], MAT.outline, cap);
    o.instanceMatrix = m.instanceMatrix; o.frustumCulled = false; o.count = 0; o.castShadow = o.receiveShadow = false;
    scene.add(o); b.outline = o;
  }
}
// ---------- helmets that pop off and go bouncing across the field ----------
const HELM_GEOS = new Set(['helm', 'corinth', 'crest', 'cheek', 'nose', 'knob', 'circlet']);
const PROP_MAX = 36, props = [];
const propMesh = {};
for (const g of ['helm', 'corinth', 'circlet']) {
  const m = new THREE.InstancedMesh(GEO[g], MAT.metal, PROP_MAX);
  m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(PROP_MAX * 3), 3); m.count = 0; m.castShadow = true; m.frustumCulled = false;
  scene.add(m); propMesh[g] = m;
}
function popHelmet(u) {
  const fac = factionOf(u), s = u.kind === 'captain' ? 1.18 : 1;
  const geo = fac === 'roman' ? 'helm' : fac === 'greek' ? 'corinth' : u.kind === 'captain' ? 'circlet' : null;
  if (!geo) { u.helmOff = false; return; } // barbarian footmen fight bareheaded anyway
  if (props.length >= PROP_MAX) props.shift();
  const R = (lo, hi) => lo + Math.random() * (hi - lo);
  props.push({ geo, s, col: geo === 'helm' ? C.steel : geo === 'corinth' ? C.bronze : crestCol(u),
    x: u.x, y: u.y + 1.9 * s, z: u.z, vx: u.vx * .6 + R(-2, 2), vy: R(6, 9) + Math.max(0, u.vy) * .4, vz: u.vz * .6 + R(-2, 2),
    rx: 0, ry: 0, rz: 0, wx: R(-12, 12), wy: R(-8, 8), wz: R(-12, 12), t: 0, clank: 0 });
  // a little clink the moment it flies off; a lighter one on each bounce (handled below)
}
const pm = new THREE.Matrix4(), pq = new THREE.Quaternion(), pe = new THREE.Euler(), pv = new THREE.Vector3(), ps = new THREE.Vector3();
function drawProps(dt) {
  const n = { helm: 0, corinth: 0, circlet: 0 };
  for (let i = props.length - 1; i >= 0; i--) {
    const p = props[i]; p.t += dt;
    if (p.t > 14) { props.splice(i, 1); continue; }
    const gy = groundY(p.x, p.z) + .18 * p.s;
    p.vy -= 20 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
    if (p.y < gy) {
      p.y = gy;
      if (p.vy < -2.5) { p.vy = -p.vy * .42; p.wx *= .6; p.wz *= .6; if (p.clank < 3) { p.clank++; bus.emit('sfx', { name: 'helmClank', x: p.x, z: p.z }); } }
      else { p.vy = 0; p.rx += (Math.round(p.rx / Math.PI) * Math.PI - p.rx) * Math.min(1, dt * 6); p.rz += (0 - p.rz) * Math.min(1, dt * 6); p.wx = p.wz = 0; }
      const f = Math.pow(.08, dt); p.vx *= f; p.vz *= f; p.wy *= f;
    }
    p.rx += p.wx * dt; p.ry += p.wy * dt; p.rz += p.wz * dt;
    const sink = p.t > 11 ? (p.t - 11) * .25 : 0;
    pe.set(p.rx, p.ry, p.rz); pq.setFromEuler(pe);
    pm.compose(pv.set(p.x, p.y - sink, p.z), pq, ps.set(p.s, p.s, p.s));
    const m = propMesh[p.geo], k = n[p.geo]++;
    m.setMatrixAt(k, pm); m.setColorAt(k, p.col);
  }
  for (const g in propMesh) { const m = propMesh[g]; m.count = n[g]; m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
}
export function clearProps() { props.length = 0; for (const g in propMesh) propMesh[g].count = 0; }

export const drawCalls = () => [...batches.values()].filter(b => b.mesh.count > 0).length;

// ---------- per-unit animation state ----------
const anim = new WeakMap();
function exprOf(u) { const a = anim.get(u); return (a && a.expr) || 'normal'; }
function stateOf(u) {
  let a = anim.get(u);
  if (!a) {
    a = { walk: Math.random() * 6, bodyY: 0, bodyRX: 0, bodyRZ: 0, yaw: 0, lift: 0, sink: 0, legL: [0, 0, 0], legR: [0, 0, 0], sArmX: 0, sArmPX: .5, wArmX: 0, wArmZ: 0, spearRX: 0, spearZ: 0, block: 0, over: 0, rag: null };
    anim.set(u, a);
  }
  return a;
}
export const ringFor = u => {
  if (u.kind !== 'captain') return null;
  if (u.ti === G.myTi) return 'me';
  if (!isFfa() && !isEnemyTi(u.ti, G.myTi)) return 'ally';
  return null;
};

// Ragdoll-style death: the body is knocked over with a spring and a bounce, spins off the hit,
// and arms and legs flop to loose, random angles.
function ragdoll(u, a, dt) {
  let r = a.rag;
  if (!r) {
    const R = (lo, hi) => lo + Math.random() * (hi - lo), dir = u.fallDir || 1;
    r = a.rag = { dir, pitch: a.bodyRX, pv: -dir * R(3, 6), roll: 0, rollT: R(-.4, .4), spin: R(-4, 4),
      arms: [R(-3, -.3), R(-3, -.3), R(-1.3, -.2)], legs: [R(-.7, .7), R(-.7, .7), R(.05, .5)],
      // launched: tumble head over heels (sometimes sideways too), limbs windmilling
      flip: u.launch ? dir * R(9, 15) : 0, twirl: u.launch ? R(-8, 8) : 0, cart: u.launch && Math.random() < .35 ? R(8, 12) * (Math.random() < .5 ? -1 : 1) : 0, fl: 0 };
    // helmets come off on the big ones (and occasionally on an ordinary fall)
    if (u.kind !== 'arch' && (u.launch ? Math.random() < .8 : Math.random() < .12)) { u.helmOff = true; popHelmet(u); }
  }
  const air = u.y - groundY(u.x, u.z) > .25;
  if (r.flip || r.cart) {
    if (air && u.deadT < 3) { // mid-air: spin freely and flail
      r.pitch += r.flip * dt; r.roll += r.cart * dt; a.yaw += r.twirl * dt; r.fl += dt * 22;
      a.sArmX = -1.6 + Math.sin(r.fl) * 1.4; a.wArmX = -1.6 + Math.sin(r.fl + 2) * 1.4; a.wArmZ = Math.sin(r.fl * .7) * .8;
      a.legL[0] = Math.sin(r.fl + 1) * .9; a.legR[0] = Math.sin(r.fl + 3.5) * .9; a.legL[2] = .3; a.legR[2] = -.3;
      a.bodyY = 0; a.bodyRX = r.pitch; a.bodyRZ = r.roll; a.lift = .5; a.sink = 0;
      return;
    }
    // down: settle flat on whichever side is nearest, then lie there like everyone else
    const TAU = Math.PI * 2, norm = x => ((x % TAU) + TAU + Math.PI) % TAU - Math.PI;
    r.pitch = norm(r.pitch); r.dir = r.pitch > 0 ? -1 : 1; r.roll = norm(r.roll) * .3; r.rollT = 0;
    r.pv = 0; r.flip = r.cart = 0; r.spin = r.twirl * .3;
  }
  const P = -r.dir * Math.PI / 2 * .97;
  r.pv += ((P - r.pitch) * 70 - r.pv * 6) * dt; r.pitch += r.pv * dt;
  if (Math.abs(r.pitch) > Math.PI / 2 * 1.02) { r.pitch = Math.sign(r.pitch) * Math.PI / 2 * 1.02; r.pv *= -.35; }
  r.spin *= Math.exp(-dt * 2.5); a.yaw += r.spin * dt;
  r.roll += (r.rollT - r.roll) * Math.min(1, dt * 5);
  const k = Math.min(1, dt * 9);
  a.sArmX += (r.arms[0] - a.sArmX) * k; a.wArmX += (r.arms[1] - a.wArmX) * k; a.wArmZ += (r.arms[2] - a.wArmZ) * k;
  a.legL[0] += (r.legs[0] - a.legL[0]) * k; a.legR[0] += (r.legs[1] - a.legR[0]) * k;
  a.legL[2] += (r.legs[2] - a.legL[2]) * k; a.legR[2] += (-r.legs[2] - a.legR[2]) * k;
  a.bodyY = 0; a.bodyRX = r.pitch; a.bodyRZ = r.roll; a.block += (0 - a.block) * k;
  a.lift = .3 * Math.min(1, Math.abs(r.pitch) / 1.4);
  a.sink = u.deadT > 10 ? Math.min(1.5, (u.deadT - 10) * .4) : 0;
}

// Swing timing as one "phase" p: 0 at rest, +1 fully wound back, -1 at the end of the follow-through.
// Wind-up eases back (anticipation), the strike snaps through fast, the follow-through holds a beat,
// then the arm recovers. The wind-up is short on purpose: the captain's blow lands at t ≈ .32, so
// the blade is sweeping through right as the hit registers (computer soldiers land a touch later).
const ease = x => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
function swingPhase(t) {
  if (t < .18) return ease(t / .18);
  if (t < .34) return 1 - 2 * ease((t - .18) / .16);
  if (t < .62) return -1;
  return -1 + ease((t - .62) / .38);
}
const near = (x, to, k) => x + (to - x) * k;

// Advances one soldier's pose (walk, swing, block, brace, aim, ride, stagger, landing).
function pose(u, dt) {
  const a = stateOf(u);
  if (u.dead) { a.bodyRY = 0; a.expr = 'dead'; a.dizzy = 0; ragdoll(u, a, dt); return a; }
  a.rag = null; a.yaw = 0; a.lift = 0; a.sink = 0; a.bodyRZ = 0; a.bodyRY = 0;
  a.idle = (a.idle || 0) + dt;
  // got hit: flash toward white and get knocked back on a spring that overshoots and settles
  if (a.hp != null && u.hp < a.hp - .5) {
    const sev = Math.min(1, (a.hp - u.hp) / 18);
    a.flash = Math.min(1, Math.max(a.flash || 0, sev));
    if (a.hp - u.hp > u.max * .3 && Math.random() < .35) a.dizzy = 1.4; // a real clout (a third of his health) leaves him seeing stars
    a.stagV = (a.stagV || 0) - (3 + 6 * sev); a.stagYV = (a.stagYV || 0) + (Math.random() < .5 ? -1 : 1) * 4 * sev; // (a kick to the spring)
  }
  a.hp = u.hp; if (a.flash > 0) a.flash = Math.max(0, a.flash - dt * 6);
  a.stag = a.stag || 0; a.stagY = a.stagY || 0; a.stagV = a.stagV || 0; a.stagYV = a.stagYV || 0;
  a.stagV += (-a.stag * 140 - a.stagV * 13) * dt; a.stag += a.stagV * dt;
  a.stagYV += (-a.stagY * 120 - a.stagYV * 12) * dt; a.stagY += a.stagYV * dt;

  const sp = Math.hypot(u.vx, u.vz), mv = Math.min(1, sp / 3);
  const t = u.swing > 0 ? 1 - u.swing / .38 : -1, P = t >= 0 ? swingPhase(t) : 0;
  // the face: stunned > just hit > yelling mid-swing > scared (captain down, or nearly dead) > normal
  if (u.stun > .3) a.dizzy = Math.max(a.dizzy || 0, u.stun + .4);
  if (a.dizzy > 0) a.dizzy -= dt;
  const L = G.teams[u.ti] && G.teams[u.ti].leader;
  a.expr = a.dizzy > 0 ? 'dizzy' : a.flash > .25 ? 'ouch' : (t >= 0 && t < .62 && u.kind !== 'arch') ? 'yell'
    : ((!u.leader && L && L.dead) || u.hp < u.max * .25) ? 'scared' : 'normal';
  u.seesStars = a.dizzy > 0; // the overlay draws the little stars
  const kind = u.mounted ? 0 : u.swingKind | 0;
  const spearArmed = (u.kind === 'foot' || u.kind === 'captain') && spearOut(u);
  const melee = u.kind === 'foot' || u.kind === 'captain';
  // ready stance: an enemy within a few steps and not running flat out
  const ready = melee && !u.mounted && !u.carrying && u.fd != null && u.fd < 6 && sp < 3.5;
  a.ready = near(a.ready || 0, ready ? 1 : 0, Math.min(1, dt * 6));
  const air = u.jy > .05;
  if (a.wasAir && !air) a.land = .2; // touched down: a quick crouch
  a.wasAir = air; if (a.land > 0) a.land -= dt;
  const land = a.land > 0 ? a.land / .2 : 0;

  if (u.mounted) {
    a.bodyY = 1.02 + .03 * Math.sin(a.walk * 2);
    a.legL[0] = -.9; a.legL[1] = 0; a.legL[2] = .55; a.legR[0] = -.9; a.legR[1] = 0; a.legR[2] = -.55;
    a.bodyRX = 0; a.bodyRY = .35 * P;
    a.walk += dt * sp * .9;
  } else {
    a.walk += dt * sp * 2.2;
    const sw = Math.sin(a.walk) * mv * .7;
    const wide = .13 * a.ready;
    a.legL[0] = sw; a.legL[1] = 0; a.legL[2] = wide; a.legR[0] = -sw; a.legR[1] = 0; a.legR[2] = -wide;
    a.bodyY = Math.abs(Math.cos(a.walk)) * mv * .08 + (1 - mv) * .012 * Math.sin(a.idle * 2.1) - .05 * a.ready;
    a.bodyRZ = Math.sin(a.walk) * mv * .05; // a little side-to-side roll in the stride
    a.bodyRX = u.stun > 0 ? -.2 : Math.min(.15, sp * .02) + .06 * a.ready;
    if (t >= 0 && melee) { // step into the blow: front foot forward, weight leaning through
      const into = Math.max(0, -P);
      a.legL[0] -= .45 * into; a.legR[0] += .25 * into; a.bodyRX += (kind === 2 ? .35 : .16) * into - .08 * Math.max(0, P);
      if (kind === 2) a.bodyY -= .08 * into;
    }
    if (air) { a.legL[0] = -.9; a.legR[0] = .35; a.bodyY = 0; a.bodyRX = .12; }
    if (land) { a.bodyY -= .2 * land; a.legL[0] = -.55 * land; a.legR[0] = .45 * land; a.bodyRX += .15 * land; }
  }
  a.bodyRX += a.stag; a.bodyRY += a.stagY * .5;
  a.yaw = a.stagY * .3;

  let blocking = false;
  const k8 = Math.min(1, dt * 8), k12 = Math.min(1, dt * 12);
  const armSw = Math.sin(a.walk) * mv * .35; // natural arm swing while walking
  if (u.weapon === 'jav' && !u.mounted) {
    // javelin cocked back over the shoulder, body turned away; whipped forward with the whole torso
    const r = t >= 0 ? ease(Math.min(1, t / .4)) : 0;
    a.wArmX = near(a.wArmX, t >= 0 ? -2.75 + 2.4 * r : -2.6, Math.min(1, dt * (t >= 0 ? 30 : 10)));
    a.spearRX = 1.5 + .4 * r; a.spearZ = t >= 0 ? -.35 + .95 * r : -.5;
    a.bodyRY += t >= 0 ? .45 - .8 * r : .3;
    a.sArmX = near(a.sArmX, -.9 + .4 * r, k8);
  } else if (spearArmed) {
    const lowered = braced(u) || u.swing > 0 || a.ready > .5;
    a.wArmX = near(a.wArmX, lowered ? -1.45 : -.35 + armSw, Math.min(1, dt * 10));
    a.spearRX = lowered ? 1.45 : -.2;
    // pull the shaft back, then drive it forward, turning the shoulders into the thrust
    a.spearZ = t >= 0 ? (P > 0 ? -.5 * P : 1.0 * -P) : 0;
    a.bodyRY += t >= 0 ? .3 * P : 0;
    if (t >= 0) a.bodyRX += .15 * Math.max(0, -P);
    a.sArmX = near(a.sArmX, -.6 - .25 * a.ready, k8);
  } else if (u.kind === 'arch') {
    a.sArmX = near(a.sArmX, u.aim ? -1.5 : -.3 - armSw, Math.min(1, dt * 10));
    a.wArmX = near(a.wArmX, u.aim ? (t >= 0 ? -1.2 : -1.5) : -.35 + armSw, k12);
    if (u.aim) a.bodyRY += .25; // side-on to draw the bow
  } else {
    if (t >= 0) {
      if (kind === 2) { // overhead: raised high behind the head, chopped straight down through
        a.wArmX = -1.55 - 1.65 * P; a.wArmZ = -.1;
      } else if (kind === 1) { // backhand: wound across the body, swept out the other way
        a.wArmX = -1.5 - .9 * Math.abs(P); a.wArmZ = .25 + .75 * P; a.bodyRY -= .45 * P;
      } else { // forehand: wound out to the side, swept across
        a.wArmX = -1.5 - .9 * Math.abs(P); a.wArmZ = (u.mounted ? -.6 : -.2) - .7 * P; a.bodyRY += .45 * P;
      }
    } else {
      const rest = -.35 + armSw * (1 - a.ready) - .5 * a.ready + .03 * Math.sin(a.idle * 2.1 + 1);
      a.wArmX = near(a.wArmX, rest, Math.min(1, dt * 10)); a.wArmZ = near(a.wArmZ, 0, Math.min(1, dt * 10));
    }
    blocking = ((u.human && u.blocking) || u.blockT > 0) && !u.mounted;
    const over = u.shieldwall && u.kind === 'foot';
    a.over = near(a.over, over ? 1 : 0, k8);
    const shieldRest = u.carrying ? -.1 : -.35 - armSw * (1 - a.ready) - .45 * a.ready;
    // the shield arm counter-swings a little against the blow
    a.sArmX = near(a.sArmX, (over ? -2.9 : blocking ? -1.35 : shieldRest) + (t >= 0 && !blocking && !over ? .25 * P : 0), Math.min(1, dt * 14));
    a.sArmPX = blocking ? .28 : .5;
    if (blocking) { a.bodyY -= .05; a.bodyRX += .08; } // brace behind the shield
  }
  if (air && !u.mounted && t < 0 && u.weapon !== 'jav') a.sArmX = near(a.sArmX, -1.1, k12); // arms up on the rise
  // the battle's over: winners jump about with their arms in the air, everyone else runs for it
  if (G.state === 'end' && G.endInfo && G.endInfo.w >= 0 && !u.mounted) {
    const ph = a.idle * 7 + (u.id % 7);
    if (G.ALLY[colorOf(u.ti)] === G.endInfo.w) {
      a.lift = Math.abs(Math.sin(ph)) * .38; a.expr = 'yell';
      a.sArmX = -2.7 + Math.sin(ph * 2) * .25; a.wArmX = -2.9 + Math.sin(ph * 2 + 1) * .3; a.wArmZ = 0; a.spearRX = -.2;
      a.legL[0] = a.legR[0] = -.3 * Math.abs(Math.sin(ph));
    } else {
      a.expr = 'scared';
      a.sArmX = -2.3 + Math.sin(a.walk * 2) * .7; a.wArmX = -2.3 + Math.sin(a.walk * 2 + 2) * .7; a.bodyRX = -.12;
    }
  }
  a.block = near(a.block, blocking ? 1 : 0, Math.min(1, dt * 16));
  return a;
}

// ---------- bones ----------
const M = { root: new THREE.Matrix4(), hips: new THREE.Matrix4(), body: new THREE.Matrix4(), legL: new THREE.Matrix4(), legR: new THREE.Matrix4(), sArm: new THREE.Matrix4(), wArm: new THREE.Matrix4(), spear: new THREE.Matrix4(), shield: new THREE.Matrix4() };
const flashC = new THREE.Color(), WHITE = new THREE.Color(1, 1, 1);
const tmp = new THREE.Matrix4(), out = new THREE.Matrix4(), eu = new THREE.Euler(), qq = new THREE.Quaternion(), vp = new THREE.Vector3(), vs = new THREE.Vector3(), tipV = new THREE.Vector3();
function local(x, y, z, rx, ry, rz) { eu.set(rx, ry, rz); qq.setFromEuler(eu); return tmp.compose(vp.set(x, y, z), qq, vs.set(1, 1, 1)); }
function bones(u, a) {
  const s = u.kind === 'captain' ? 1.18 : 1;
  eu.set(0, u.face + a.yaw, 0); qq.setFromEuler(eu);
  M.root.compose(vp.set(u.x, u.y + a.lift - a.sink, u.z), qq, vs.set(s, s, s));
  M.body.multiplyMatrices(M.root, local(0, a.bodyY, 0, a.bodyRX, a.bodyRY || 0, a.bodyRZ));
  // legs hang from the hips, which lean a little with the body but don't twist with the shoulders
  M.hips.multiplyMatrices(M.root, local(0, a.bodyY, 0, a.bodyRX * (u.dead ? 1 : .35), 0, a.bodyRZ));
  M.legL.multiplyMatrices(M.hips, local(-.18, .7, 0, a.legL[0], a.legL[1], a.legL[2]));
  M.legR.multiplyMatrices(M.hips, local(.18, .7, 0, a.legR[0], a.legR[1], a.legR[2]));
  M.sArm.multiplyMatrices(M.body, local(a.sArmPX, 1.3, .05, a.sArmX, 0, 0));
  M.wArm.multiplyMatrices(M.body, local(-.5, 1.3, .05, a.wArmX, 0, a.wArmZ));
  if ((u.kind === 'foot' || u.kind === 'captain') && spearOut(u)) M.spear.multiplyMatrices(M.wArm, local(0, -.48, a.spearZ, a.spearRX, 0, 0));
  if (u.kind === 'foot' || u.kind === 'captain') {
    // held at the side and turned out a little; raised to the front when blocking
    // shieldwall: the shield goes flat overhead, locking with the neighbours' shields
    const o = a.over, b = a.block * (1 - o), big = factionOf(u) === 'greek' ? .08 : 0;
    const x = .56 - .38 * b, y = 1.02 + .26 * b + big, z = .3 + .3 * b;
    M.shield.multiplyMatrices(M.body, local(x + (.08 - x) * o, y + (2.5 - y) * o, z + (.1 - z) * o, -.05 * (1 - b) * (1 - o) - Math.PI / 2 * o, .5 * (1 - b) * (1 - o), 0));
  }
}

// Poses and draws every soldier in the list.
export function drawSoldiers(units, dt) {
  for (const b of batches.values()) b.n = 0;
  const blob = !shadowsOn(), outlines = quality.level !== 'low';
  let drawn = 0;
  // Friendly soldiers standing between the camera and your captain step out of the picture, so
  // you can always see yourself and who you're fighting. Enemies are never hidden.
  const tg = camTarget(), cp = camera.position;
  let lx = 0, ly = 0, lz = 0, l2 = 0;
  if (tg && !tg.dead) { lx = tg.x - cp.x; ly = tg.y + 1.3 - cp.y; lz = tg.z - cp.z; l2 = lx * lx + ly * ly + lz * lz; }
  for (const u of units) {
    if (u.hidden) continue;
    if (l2 > 0 && u !== tg && !u.dead) {
      const a = stateOf(u);
      if (!isEnemyTi(u.ti, G.myTi)) {
        const ux = u.x - cp.x, uy = u.y + 1.1 - cp.y, uz = u.z - cp.z, t = (ux * lx + uy * ly + uz * lz) / l2;
        if (t > 0 && t < .93) {
          const ex = ux - lx * t, ey = uy - ly * t, ez = uz - lz * t;
          if (ex * ex + ey * ey + ez * ez < 1.05 * 1.05) a.occT = .3; // keep hidden a moment, so it doesn't flicker
        }
      }
      if (a.occT > 0) { a.occT -= dt; continue; }
    }
    if (drawn >= MAX_UNITS) break;
    drawn++;
    const a = pose(u, dt);
    bones(u, a);
    // a brief streak off the blade/spear tip while mid-swing, so a fast hit reads as motion
    if (u.swing > 0 && !u.dead && (u.kind === 'foot' || u.kind === 'captain')) {
      if (spearOut(u)) tipV.set(0, 0, 2.1).applyMatrix4(M.spear); else tipV.set(0, -.4, 1.0).applyMatrix4(M.wArm);
      trail(tipV.x, tipV.y, tipV.z, '#eef2f5');
    }
    const ring = ringFor(u), fac = factionOf(u);
    for (const p of PARTS) {
      if (p.k && !p.k.has(u.kind)) continue;
      if (p.f && !p.f.has(fac)) continue;
      if (p.t && !p.t(u)) continue;
      if (u.helmOff && HELM_GEOS.has(p.geo)) continue;
      if (p.when && (p.when === 'blob' ? !blob : p.when !== ring)) continue;
      const b = p.batch, i = b.n++;
      out.multiplyMatrices(M[p.bone], p.m);
      b.mesh.setMatrixAt(i, out);
      if (p.col) b.mesh.setColorAt(i, a.flash > 0 ? flashC.copy(p.col(u)).lerp(WHITE, a.flash * .75) : p.col(u));
    }
  }
  drawProps(dt);
  for (const b of batches.values()) {
    b.mesh.count = b.n;
    if (b.outline) b.outline.count = outlines ? b.n : 0;
    if (!b.n) continue;
    // upload only the instances in use, not the whole buffer
    const im = b.mesh.instanceMatrix; im.clearUpdateRanges(); im.addUpdateRange(0, b.n * 16); im.needsUpdate = true;
    const ic = b.mesh.instanceColor; if (ic) { ic.clearUpdateRanges(); ic.addUpdateRange(0, b.n * 3); ic.needsUpdate = true; }
  }
}
