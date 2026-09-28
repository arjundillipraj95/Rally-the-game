// Batched soldier drawing. Every body part of every soldier is one instance in a shared
// InstancedMesh per part type, so 100+ soldiers cost about 25 draw calls instead of thousands.
// Each soldier has a small skeleton (root, body, legs, arms, shield, spear) posed every frame.
// Factions change the look only: Romans (galea, scutum, gladius), Greeks (bronze Corinthian helmet,
// round hoplon), barbarians (hair and beards, bare chests, round wooden shields, axes).
import * as THREE from 'three';
import { TEAMS } from '../config.js';
import { G, isEnemyTi, isFfa } from '../core/state.js';
import { braced } from '../core/sim.js';
import { scene, shadowsOn } from './scene.js';

const MAX_UNITS = 320;

// ---------- geometry ----------
const scutum = (() => { const g = new THREE.CylinderGeometry(1, 1, 1.15, 10, 1, true, -.42, .84); g.translate(0, 0, -1); return g; })();
const hoplon = (() => { const g = new THREE.SphereGeometry(.95, 20, 6, 0, Math.PI * 2, 0, .7); g.rotateX(Math.PI / 2); g.translate(0, 0, -.95 * Math.cos(.7)); g.scale(1, 1, .6); return g; })();
const roundShield = (() => { const g = new THREE.CylinderGeometry(.5, .5, .08, 18); g.rotateX(Math.PI / 2); return g; })();
const GEO = {
  leg: new THREE.CylinderGeometry(.15, .13, .7, 7),
  boot: new THREE.BoxGeometry(.2, .14, .32),
  greave: new THREE.CylinderGeometry(.16, .15, .32, 8),
  torso: new THREE.CylinderGeometry(.42, .36, .78, 12),
  skirt: new THREE.CylinderGeometry(.43, .52, .32, 12),
  belt: new THREE.CylinderGeometry(.44, .44, .14, 12),
  head: new THREE.SphereGeometry(.4, 14, 10),
  helm: new THREE.SphereGeometry(.44, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2),
  corinth: new THREE.SphereGeometry(.47, 14, 10, 0, Math.PI * 2, 0, Math.PI * .52),
  cone: new THREE.ConeGeometry(.44, .7, 12),
  hood: new THREE.SphereGeometry(.45, 12, 8, 0, Math.PI * 2, 0, Math.PI * .6),
  brim: new THREE.CylinderGeometry(.66, .66, .05, 16),
  crest: new THREE.BoxGeometry(.1, .22, .62),
  cheek: new THREE.BoxGeometry(.08, .3, .24),
  neckGuard: new THREE.BoxGeometry(.56, .08, .22),
  nose: new THREE.BoxGeometry(.07, .24, .05),
  knob: new THREE.SphereGeometry(.08, 8, 6),
  hair: new THREE.SphereGeometry(.45, 12, 8, 0, Math.PI * 2, 0, Math.PI * .55),
  beard: new THREE.BoxGeometry(.44, .3, .2),
  circlet: new THREE.TorusGeometry(.42, .045, 6, 18),
  mantle: new THREE.CylinderGeometry(.58, .5, .26, 12),
  face: new THREE.PlaneGeometry(.5, .26),
  arm: new THREE.CylinderGeometry(.11, .1, .55, 6),
  blade: new THREE.BoxGeometry(.07, .07, 1.0),
  gladius: new THREE.BoxGeometry(.09, .06, .72),
  guard: new THREE.BoxGeometry(.32, .06, .06),
  haft: new THREE.CylinderGeometry(.04, .04, 1.05, 6),
  axeHead: new THREE.BoxGeometry(.05, .36, .26),
  shaft: new THREE.CylinderGeometry(.04, .04, 3.0, 5),
  tip: new THREE.ConeGeometry(.09, .35, 5),
  bow: new THREE.TorusGeometry(.6, .035, 5, 14, Math.PI),
  quiver: new THREE.CylinderGeometry(.13, .11, .7, 6),
  scutum, hoplon, roundShield,
  rim: new THREE.TorusGeometry(.6, .05, 6, 24),
  woodRim: new THREE.TorusGeometry(.5, .04, 6, 20),
  boss: new THREE.SphereGeometry(.12, 8, 6),
  shadow: new THREE.CircleGeometry(.62, 14),
  ring: new THREE.RingGeometry(.8, 1.0, 24),
  cape: new THREE.PlaneGeometry(.9, 1.1),
};

const faceTex = (() => {
  const c = document.createElement('canvas'); c.width = 128; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#1b1512';
  x.beginPath(); x.ellipse(40, 26, 7, 9, 0, 0, Math.PI * 2); x.ellipse(88, 26, 7, 9, 0, 0, Math.PI * 2); x.fill();
  x.lineWidth = 7; x.lineCap = 'round'; x.strokeStyle = '#1b1512';
  x.beginPath(); x.moveTo(24, 10); x.lineTo(54, 17); x.moveTo(104, 10); x.lineTo(74, 17); x.stroke();
  x.beginPath(); x.moveTo(64, 48); x.quadraticCurveTo(44, 42, 30, 56); x.quadraticCurveTo(46, 50, 64, 54); x.quadraticCurveTo(82, 50, 98, 56); x.quadraticCurveTo(84, 42, 64, 48); x.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();

// White materials take their color from each instance (skin, team color, wood, bronze...).
export const MAT = {
  plain: new THREE.MeshLambertMaterial({ color: 0xffffff }),
  plain2: new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
  metal: new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 70, specular: 0x6a6a6a }),
  shadow: new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .28, depthWrite: false }),
  ring: new THREE.MeshBasicMaterial({ color: 0xffcf3a, transparent: true, opacity: .8, side: THREE.DoubleSide, depthWrite: false }),
  ringAlly: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .45, side: THREE.DoubleSide, depthWrite: false }),
  face: new THREE.MeshBasicMaterial({ map: faceTex, transparent: true, depthWrite: false }),
};
const TINTED = new Set(['plain', 'plain2', 'metal']);
const NO_SHADOW = new Set(['shadow', 'ring', 'ringAlly', 'face']);

const col = h => new THREE.Color(h);
const C = {
  skin: [0xf2d6bc, 0xe4bc98, 0xc8966e].map(col), hair: [0xe0b85c, 0xb5602a, 0x5a3a22, 0x2e2420].map(col),
  steel: col(0xa6adb8), bronze: col(0xc8903c), wood: col(0x6b4a2e), leather: col(0x4e3420), gold: col(0xffcf3a), linen: col(0xece2c8), fur: col(0x7a5a3c),
  team: TEAMS.map(t => col(t.hex)), dark: TEAMS.map(t => col(t.hex).multiplyScalar(.62)),
};
const hash = u => (Math.imul(u.id | 0, 2654435761) >>> 0);
const skinOf = u => C.skin[hash(u) % 3], hairOf = u => C.hair[(hash(u) >>> 4) % 4];
export const factionOf = u => (G.factions && G.factions[u.ti]) || 'roman';

// ---------- part list ----------
const e = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));
// filters: k = kinds, f = factions
const K = (...ks) => new Set(ks), F = (...fs) => new Set(fs);
const MELEE = K('foot', 'captain'), HELMED = K('foot', 'captain', 'spear');
const team = u => C.team[u.ti], dark = u => C.dark[u.ti];
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
  { bone: 'body', geo: 'torso', mat: 'plain', m: e(0, 1.08, 0), f: F('barbarian'), k: MELEE, col: skinOf },
  { bone: 'body', geo: 'torso', mat: 'plain', m: e(0, 1.08, 0), f: F('barbarian'), k: K('spear'), col: dark },
  { bone: 'body', geo: 'torso', mat: 'plain', m: e(0, 1.08, 0), k: K('arch'), col: dark },
  { bone: 'body', geo: 'skirt', mat: 'plain', m: e(0, .64, 0), f: F('roman', 'greek'), col: team },
  { bone: 'body', geo: 'belt', mat: 'plain', m: e(0, .78, 0), col: u => factionOf(u) === 'barbarian' ? team(u) : C.leather },
  { bone: 'body', geo: 'head', mat: 'plain', m: e(0, 1.78, 0), col: skinOf },
  { bone: 'body', geo: 'face', mat: 'face', m: e(0, 1.73, .39) },
  // archers (every faction)
  { bone: 'body', geo: 'hood', mat: 'plain', m: e(0, 1.82, -.02), k: K('arch'), f: F('roman', 'barbarian'), col: team },
  { bone: 'body', geo: 'helm', mat: 'plain', m: e(0, 1.9, 0, 0, 0, 0, .8, .7, .8), k: K('arch'), f: F('greek'), col: () => C.leather },
  { bone: 'body', geo: 'brim', mat: 'plain', m: e(0, 1.98, 0), k: K('arch'), f: F('greek'), col: team },
  { bone: 'body', geo: 'quiver', mat: 'plain', m: e(.2, 1.25, -.42, 0, 0, .4), k: K('arch'), col: () => C.leather },
  // Roman galea
  { bone: 'body', geo: 'helm', mat: 'metal', m: e(0, 1.86, 0), f: F('roman'), k: HELMED, col: () => C.steel },
  { bone: 'body', geo: 'cheek', mat: 'metal', m: e(.34, 1.64, .12, 0, 0, .12), f: F('roman'), k: HELMED, col: () => C.steel },
  { bone: 'body', geo: 'cheek', mat: 'metal', m: e(-.34, 1.64, .12, 0, 0, -.12), f: F('roman'), k: HELMED, col: () => C.steel },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.36, 0), f: F('roman'), k: K('foot'), col: team },
  { bone: 'body', geo: 'knob', mat: 'metal', m: e(0, 2.3, 0), f: F('roman'), k: K('spear'), col: () => C.bronze },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.36, 0, 0, Math.PI / 2, 0, 1.3, 1.5, 1.25), f: F('roman'), k: K('captain'), col: () => C.gold },
  // Greek Corinthian helmet with a tall horsehair crest
  { bone: 'body', geo: 'corinth', mat: 'metal', m: e(0, 1.8, 0), f: F('greek'), k: HELMED, col: () => C.bronze },
  { bone: 'body', geo: 'nose', mat: 'metal', m: e(0, 1.74, .45), f: F('greek'), k: HELMED, col: () => C.bronze },
  { bone: 'body', geo: 'cheek', mat: 'metal', m: e(.33, 1.62, .18, 0, 0, .1), f: F('greek'), k: HELMED, col: () => C.bronze },
  { bone: 'body', geo: 'cheek', mat: 'metal', m: e(-.33, 1.62, .18, 0, 0, -.1), f: F('greek'), k: HELMED, col: () => C.bronze },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.5, -.04, 0, 0, 0, 1.2, 2.3, 1.6), f: F('greek'), k: K('foot', 'spear'), col: team },
  { bone: 'body', geo: 'crest', mat: 'plain', m: e(0, 2.58, -.04, 0, 0, 0, 1.4, 2.8, 1.9), f: F('greek'), k: K('captain'), col: () => C.gold },
  // barbarians: hair, beards, a gold circlet and fur mantle for the chief
  { bone: 'body', geo: 'hair', mat: 'plain', m: e(0, 1.82, -.03), f: F('barbarian'), k: HELMED, col: hairOf },
  { bone: 'body', geo: 'beard', mat: 'plain', m: e(0, 1.55, .3, .15), f: F('barbarian'), k: HELMED, col: hairOf },
  { bone: 'body', geo: 'circlet', mat: 'metal', m: e(0, 1.92, 0, Math.PI / 2), f: F('barbarian'), k: K('captain'), col: () => C.gold },
  { bone: 'body', geo: 'mantle', mat: 'plain', m: e(0, 1.44, 0), f: F('barbarian'), k: K('captain', 'foot'), col: () => C.fur },
  // captain's cape
  { bone: 'body', geo: 'cape', mat: 'plain2', m: e(0, 1.02, -.44, .12), k: K('captain'), col: team },
  // arms
  { bone: 'sArm', geo: 'arm', mat: 'plain', m: e(0, -.22, 0), col: skinOf },
  { bone: 'wArm', geo: 'arm', mat: 'plain', m: e(0, -.22, 0), col: skinOf },
  // shields (on their own bone so they face forward)
  { bone: 'shield', geo: 'scutum', mat: 'plain2', m: e(0, 0, 0), f: F('roman'), k: MELEE, col: team },
  { bone: 'shield', geo: 'boss', mat: 'metal', m: e(0, 0, .05), f: F('roman'), k: MELEE, col: u => u.leader ? C.gold : C.steel },
  { bone: 'shield', geo: 'hoplon', mat: 'plain2', m: e(0, 0, 0), f: F('greek'), k: MELEE, col: team },
  { bone: 'shield', geo: 'rim', mat: 'metal', m: e(0, 0, 0), f: F('greek'), k: MELEE, col: u => u.leader ? C.gold : C.bronze },
  { bone: 'shield', geo: 'roundShield', mat: 'plain', m: e(0, 0, 0), f: F('barbarian'), k: MELEE, col: team },
  { bone: 'shield', geo: 'woodRim', mat: 'plain', m: e(0, 0, 0), f: F('barbarian'), k: MELEE, col: () => C.wood },
  { bone: 'shield', geo: 'boss', mat: 'metal', m: e(0, 0, .06), f: F('barbarian'), k: MELEE, col: u => u.leader ? C.gold : C.steel },
  // weapons
  { bone: 'wArm', geo: 'guard', mat: 'plain', m: e(0, -.5, .12), f: F('roman', 'greek'), k: MELEE, col: () => C.leather },
  { bone: 'wArm', geo: 'gladius', mat: 'metal', m: e(0, -.5, .5), f: F('roman'), k: MELEE, col: () => C.steel },
  { bone: 'wArm', geo: 'blade', mat: 'metal', m: e(0, -.5, .6), f: F('greek'), k: MELEE, col: () => C.bronze },
  { bone: 'wArm', geo: 'haft', mat: 'plain', m: e(0, -.5, .42, Math.PI / 2), f: F('barbarian'), k: MELEE, col: () => C.wood },
  { bone: 'wArm', geo: 'axeHead', mat: 'metal', m: e(0, -.35, .86), f: F('barbarian'), k: MELEE, col: () => C.steel },
  { bone: 'spear', geo: 'shaft', mat: 'plain', m: e(0, 0, .6, Math.PI / 2), k: K('spear'), col: () => C.wood },
  { bone: 'spear', geo: 'tip', mat: 'metal', m: e(0, 0, 2.2, Math.PI / 2), k: K('spear'), col: u => factionOf(u) === 'greek' ? C.bronze : C.steel },
  { bone: 'sArm', geo: 'bow', mat: 'plain', m: e(0, -.48, .2, 0, Math.PI / 2, Math.PI / 2), k: K('arch'), col: () => C.wood },
];

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
  m.castShadow = !NO_SHADOW.has(b.mat); m.receiveShadow = b.mat !== 'face' && !NO_SHADOW.has(b.mat);
  if (b.mat === 'shadow' || b.mat.startsWith('ring')) m.renderOrder = 1;
  scene.add(m); b.mesh = m;
}
export const drawCalls = () => [...batches.values()].filter(b => b.mesh.count > 0).length;

// ---------- per-unit animation state ----------
const anim = new WeakMap();
function stateOf(u) {
  let a = anim.get(u);
  if (!a) {
    a = { walk: Math.random() * 6, bodyY: 0, bodyRX: 0, bodyRZ: 0, yaw: 0, lift: 0, sink: 0, legL: [0, 0, 0], legR: [0, 0, 0], sArmX: 0, sArmPX: .5, wArmX: 0, wArmZ: 0, spearRX: 0, spearZ: 0, block: 0, rag: null };
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
      arms: [R(-3, -.3), R(-3, -.3), R(-1.3, -.2)], legs: [R(-.7, .7), R(-.7, .7), R(.05, .5)] };
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

// Advances one soldier's pose (walk, swing, block, brace, aim, ride).
function pose(u, dt) {
  const a = stateOf(u);
  if (u.dead) { ragdoll(u, a, dt); return a; }
  a.rag = null; a.yaw = 0; a.lift = 0; a.sink = 0; a.bodyRZ = 0;
  const sp = Math.hypot(u.vx, u.vz);
  if (u.mounted) {
    a.bodyY = 1.02 + .03 * Math.sin(a.walk * 2);
    a.legL[0] = -.9; a.legL[1] = 0; a.legL[2] = .55; a.legR[0] = -.9; a.legR[1] = 0; a.legR[2] = -.55;
    a.bodyRX = 0;
    a.walk += dt * sp * .9;
  } else {
    a.walk += dt * sp * 2.2;
    const sw = Math.sin(a.walk) * Math.min(1, sp / 3) * .7;
    a.legL[0] = sw; a.legL[1] = a.legL[2] = 0; a.legR[0] = -sw; a.legR[1] = a.legR[2] = 0;
    a.bodyY = Math.abs(Math.cos(a.walk)) * Math.min(1, sp / 3) * .08;
    a.bodyRX = u.stun > 0 ? -.25 : Math.min(.15, sp * .02);
  }
  const t = u.swing > 0 ? 1 - u.swing / .38 : -1;
  let blocking = false;
  if (u.kind === 'spear') {
    const lowered = braced(u) || u.swing > 0;
    a.wArmX += ((lowered ? -1.45 : -.35) - a.wArmX) * Math.min(1, dt * 10);
    a.spearRX = lowered ? 1.45 : -.2;
    a.spearZ = t >= 0 ? Math.sin(t * Math.PI) * .8 : 0;
    a.sArmX += (-.6 - a.sArmX) * Math.min(1, dt * 8);
  } else if (u.kind === 'arch') {
    a.sArmX += ((u.aim ? -1.5 : -.3) - a.sArmX) * Math.min(1, dt * 10);
    a.wArmX += ((u.aim ? (t >= 0 ? -1.2 : -1.5) : -.35) - a.wArmX) * Math.min(1, dt * 12);
  } else {
    if (t >= 0) {
      a.wArmX = t < .35 ? -.35 - 2.65 * (t / .35) : -3.0 + 2.2 * Math.min(1, (t - .35) / .3);
      a.wArmZ = u.mounted ? -.9 : -.3;
    } else { a.wArmX += (-.35 - a.wArmX) * Math.min(1, dt * 10); a.wArmZ = 0; }
    blocking = ((u.human && u.blocking) || u.blockT > 0) && !u.mounted;
    a.sArmX += ((blocking ? -1.35 : u.carrying ? -.1 : -.35) - a.sArmX) * Math.min(1, dt * 14);
    a.sArmPX = blocking ? .28 : .5;
  }
  a.block += ((blocking ? 1 : 0) - a.block) * Math.min(1, dt * 16);
  return a;
}

// ---------- bones ----------
const M = { root: new THREE.Matrix4(), body: new THREE.Matrix4(), legL: new THREE.Matrix4(), legR: new THREE.Matrix4(), sArm: new THREE.Matrix4(), wArm: new THREE.Matrix4(), spear: new THREE.Matrix4(), shield: new THREE.Matrix4() };
const tmp = new THREE.Matrix4(), out = new THREE.Matrix4(), eu = new THREE.Euler(), qq = new THREE.Quaternion(), vp = new THREE.Vector3(), vs = new THREE.Vector3();
function local(x, y, z, rx, ry, rz) { eu.set(rx, ry, rz); qq.setFromEuler(eu); return tmp.compose(vp.set(x, y, z), qq, vs.set(1, 1, 1)); }
function bones(u, a) {
  const s = u.kind === 'captain' ? 1.18 : 1;
  eu.set(0, u.face + a.yaw, 0); qq.setFromEuler(eu);
  M.root.compose(vp.set(u.x, u.y + a.lift - a.sink, u.z), qq, vs.set(s, s, s));
  M.body.multiplyMatrices(M.root, local(0, a.bodyY, 0, a.bodyRX, 0, a.bodyRZ));
  M.legL.multiplyMatrices(M.body, local(-.18, .7, 0, a.legL[0], a.legL[1], a.legL[2]));
  M.legR.multiplyMatrices(M.body, local(.18, .7, 0, a.legR[0], a.legR[1], a.legR[2]));
  M.sArm.multiplyMatrices(M.body, local(a.sArmPX, 1.3, .05, a.sArmX, 0, 0));
  M.wArm.multiplyMatrices(M.body, local(-.5, 1.3, .05, a.wArmX, 0, a.wArmZ));
  if (u.kind === 'spear') M.spear.multiplyMatrices(M.wArm, local(0, -.48, a.spearZ, a.spearRX, 0, 0));
  if (u.kind === 'foot' || u.kind === 'captain') {
    // held at the side and turned out a little; raised to the front when blocking
    const b = a.block, big = factionOf(u) === 'greek' ? .08 : 0;
    M.shield.multiplyMatrices(M.body, local(.56 - .38 * b, 1.02 + .26 * b + big, .3 + .3 * b, -.05 * (1 - b), .5 * (1 - b), 0));
  }
}

// Poses and draws every soldier in the list.
export function drawSoldiers(units, dt) {
  for (const b of batches.values()) b.n = 0;
  const blob = !shadowsOn();
  let drawn = 0;
  for (const u of units) {
    if (u.hidden) continue;
    if (drawn >= MAX_UNITS) break;
    drawn++;
    const a = pose(u, dt);
    bones(u, a);
    const ring = ringFor(u), fac = factionOf(u);
    for (const p of PARTS) {
      if (p.k && !p.k.has(u.kind)) continue;
      if (p.f && !p.f.has(fac)) continue;
      if (p.when && (p.when === 'blob' ? !blob : p.when !== ring)) continue;
      const b = p.batch, i = b.n++;
      out.multiplyMatrices(M[p.bone], p.m);
      b.mesh.setMatrixAt(i, out);
      if (p.col) b.mesh.setColorAt(i, p.col(u));
    }
  }
  for (const b of batches.values()) {
    b.mesh.count = b.n;
    if (!b.n) continue;
    // upload only the instances in use, not the whole buffer
    const im = b.mesh.instanceMatrix; im.clearUpdateRanges(); im.addUpdateRange(0, b.n * 16); im.needsUpdate = true;
    const ic = b.mesh.instanceColor; if (ic) { ic.clearUpdateRanges(); ic.addUpdateRange(0, b.n * 3); ic.needsUpdate = true; }
  }
}
