// (C5) What Sigrun's moves show, on every phone, from the fx moments in core/sim/sigrun.js and captain.js, in frost
// white and ice blue with her team's colour (Arjun: Unite-like, big readable shapes, a clear area on the ground, a
// bright impact, a trace that lingers; felt by both sides through render/feel.js impact):
// - the wolf's claws: three bright rakes on the ground where it struck; the bite: a jaw-mark and a burst;
// - her overhead chop: the 120° arc it cuts lit on the ground, a burst where the axe lands, dust;
// - Pounce: a ring tightening on the one she springs at and a streak to him, frost trailing her through the air; the
//   landing a burst, a shockwave, a big claw (or axe) mark that lingers, and the hit felt by both (the wolf bites);
// - Spin: on the wolf its path lit ahead and a whirl of the axe round her, a spark and a burst on each one it cuts, a
//   clang and the wolf's yelp on a braced line; on foot a bright ring round her feet and the whirl, a pulse each blow;
// - The Hunt: a wolf's head over every champion she could hunt now (they see it too); the strike a white flash, slow
//   motion, a bright arc that lingers, the howl and HUNTED!; dodged, DODGED!
// - Svinfylkingar: the wedge's lane lit on the ground and a boar's-snout point at its head through the warning (seen by
//   all), then dust behind every rider, a burst on each one struck, the war horn and the word.
// drawSigrun() runs every frame (render/overlay.js). Drawing and sounds only.
import * as THREE from 'three';
import { bus, G, colorOf, isEnemy } from '../core/state.js';
import { scene } from './scene.js';
import { TEAMS } from '../config.js';
import { champOf } from '../champions/index.js';
import { spark, dust, shockwave, puff, pow } from './effects.js';
import { S as AS } from '../app/state.js';
import { cdLeft, unlocked } from '../core/sim/abilities.js';
import { huntable } from '../core/sim/sigrun.js';
import { decal, place, drop, starburst, ringTex, pathTex } from './fxkit.js';
import { impact } from './feel.js';
import { sfx } from '../ui/audio.js';
import { wolfOf } from './heroes.js';
import { wolfMove } from './wolf.js';
import { WOLF_MOVES } from '../config/wolf.js';

export const ICE = 0xbfeaff;
const now = () => G.T;
function tex(w, h, paint) { const c = document.createElement('canvas'); c.width = w; c.height = h; paint(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
// three claw rakes, near end at the bottom
const clawTex = tex(256, 256, g => { g.lineCap = 'round'; for (let i = 0; i < 3; i++) { const x = 72 + i * 56; for (const [w, a] of [[30, .3], [12, 1]]) { g.strokeStyle = `rgba(225,246,255,${a})`; g.lineWidth = w; g.beginPath(); g.moveTo(x - 26, 236); g.quadraticCurveTo(x + 16, 128, x - 4, 20); g.stroke(); } } });
// a jaw-mark: two arcs of teeth closing on a point
const biteTex = tex(256, 256, g => { g.lineCap = 'round'; for (const s of [-1, 1]) { g.strokeStyle = 'rgba(225,246,255,.35)'; g.lineWidth = 26; g.beginPath(); g.arc(128, 128 + s * 28, 82, s < 0 ? Math.PI * .15 : Math.PI * 1.15, s < 0 ? Math.PI * .85 : Math.PI * 1.85); g.stroke();
  g.fillStyle = 'rgba(240,252,255,1)'; for (let i = 0; i < 6; i++) { const a = (s < 0 ? .2 : 1.2) * Math.PI + i * .12 * Math.PI, x = 128 + Math.cos(a) * 82, y = 128 + s * 28 + Math.sin(a) * 82; g.beginPath(); g.moveTo(x - 7, y); g.lineTo(x, y - s * 22); g.lineTo(x + 7, y); g.fill(); } } });
// a fan of `deg` degrees opening from its near point (bottom middle): a bright rim, a soft fill
export function fanTex(deg) {
  return tex(256, 256, (g, w, h) => { const a = deg * Math.PI / 360, cx = w / 2, cy = h - 2, R = h - 6;
    const gr = g.createRadialGradient(cx, cy, 0, cx, cy, R); gr.addColorStop(0, 'rgba(200,240,255,.05)'); gr.addColorStop(.85, 'rgba(200,240,255,.4)'); gr.addColorStop(.97, 'rgba(240,252,255,1)'); gr.addColorStop(1, 'rgba(240,252,255,0)');
    g.fillStyle = gr; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R, -Math.PI / 2 - a, -Math.PI / 2 + a); g.closePath(); g.fill(); });
}
const chopTex = fanTex(120);
// marks on the ground that light up, then fade: { m, t0, life, grow }
const marks = [], later = [];
export function mark(t, w, l, x, z, face, { life = .6, color = ICE, from = .5, grow = 0, opacity = 1 } = {}) {
  const m = decal(t, w, l, { color, from, opacity }); place(m, x, z, face, .14); marks.push({ m, t0: now(), life, grow, o: opacity }); return m;
}
// something to do a moment from now (game time): the blow landing
export const at = (dt, f) => later.push({ t: now() + dt, f });
const teamIce = u => new THREE.Color(TEAMS[colorOf(u.ti)] ? TEAMS[colorOf(u.ti)].css : '#ffffff').lerp(new THREE.Color(ICE), .15).getHex(); // (BAL1: her army's colour)
const ahead = (u, d) => [u.x + Math.sin(u.face) * d, u.z + Math.cos(u.face) * d];

bus.on('fxmsg', e => {
  const u = e.u; if (!u) return;
  if (e.k === 'fxwolf') { // a claw or the bite
    const W = wolfOf(u); wolfMove(W, e.q); const M = WOLF_MOVES[e.q], hitAt = M ? M.t * M.at : .2, bite = e.q === 'bite';
    sfx.axeWhoosh(u.x, u.z);
    at(hitAt, () => { const [x, z] = ahead(u, 2.4); (bite ? sfx.wolfBite : sfx.wolfClaw)(x, z);
      mark(bite ? biteTex : clawTex, bite ? 2.4 : 2.2, bite ? 2.4 : 2.6, x, z, u.face + (e.q === 'clawL' ? .35 : e.q === 'clawR' ? -.35 : 0), { life: bite ? .8 : .6, color: teamIce(u), grow: .25 });
      starburst(x, (u.y || 0) + 1.2, z, bite ? 2.6 : 1.8); if (bite) spark(x, (u.y || 0) + 1.1, z, '#e9f8ff', 8); });
  } else if (e.k === 'fxchop') { // her overhead chop: the arc lit at once (where it will land), the burst as it lands
    const r = champOf(u.ti).stats.reach + 1.6;
    mark(chopTex, r * 2 * Math.sin(Math.PI / 3) + .6, r, u.x, u.z, u.face, { life: .75, color: teamIce(u), from: 0 });
    sfx.axeWhoosh(u.x, u.z);
    at(.32, () => { const [x, z] = ahead(u, 1.6); sfx.axeChop(x, z); starburst(x, (u.y || 0) + .6, z, 2.4); dust(x, z); });
  }
});
const flights = []; // (C5c) pounces in the air: { u, t0, tg, ring }
bus.on('fxmsg', e => {
  const u = e.u; if (!u) return;
  if (e.k === 'fxpounce') {
    const W = u.mounted && wolfOf(u), [x, z] = String(e.q).split(',').map(Number), d = champOf(u.ti).sp1 || {};
    if (W) wolfMove(W, 'pounce'); else if (e.fromNet) u.act = { name: 'pounce', t: G.T };
    (W ? sfx.wolfSnarl : sfx.axeWhoosh)(u.x, u.z);
    const len = Math.hypot(x - u.x, z - u.z), tg = e.a || null;
    if (len > .5) mark(pathTex, 1.4, len, u.x, u.z, Math.atan2(x - u.x, z - u.z), { life: (d.crouch || .15) + (d.air || .3) + .5, color: teamIce(u), from: 0, opacity: .9 });
    const ring = mark(ringTex, 3, 3, tg ? tg.x : x, tg ? tg.z : z, 0, { life: (d.crouch || .15) + (d.air || .3) + .1, color: teamIce(u) });
    flights.push({ u, t0: now(), tg, ring, end: now() + (d.crouch || .15) + (d.air || .3) });
  } else if (e.k === 'fxpounceland') {
    const W = u.mounted && wolfOf(u), tg = e.a; if (e.q === 'miss') { dust(u.x, u.z); return; }
    if (W) wolfMove(W, 'bite');
    const x = tg ? tg.x : u.x, z = tg ? tg.z : u.z;
    (W ? sfx.wolfBite : sfx.axeChop)(x, z); starburst(x, (tg && tg.y || 0) + 1.2, z, e.heavy ? 3.2 : 2.4); shockwave(x, z, 2.2, '#dff6ff'); dust(x, z);
    mark(W ? clawTex : chopTex, 3, 3.2, x, z, u.face, { life: 1.3, color: teamIce(u), grow: .2, from: W ? .5 : .15 });
    if (tg && tg.leader) impact(tg, u, e.q === 'kill' ? 1.4 : 1.1); else if (tg) spark(x, 1.1, z, '#e9f8ff', 10);
  }
});
// (C5d) the axe's whirl: a flat ring of light round her at waist height, turning
const whirlGeo = new THREE.RingGeometry(1.15, 1.75, 40, 1, 0, Math.PI * 1.6); whirlGeo.rotateX(-Math.PI / 2);
const spins = new Map(); // u.id -> { u, whirl, ring, t0, end }
function endSpinFx(id) { const S = spins.get(id); if (!S) return; scene.remove(S.whirl); S.whirl.material.dispose(); if (S.ring) drop(S.ring); spins.delete(id); }
bus.on('fxmsg', e => {
  const u = e.u; if (!u) return; const d = champOf(u.ti).sp2 || {};
  if (e.k === 'fxspin') {
    endSpinFx(u.id); const ride = String(e.q)[0] === 'c', col = teamIce(u);
    const whirl = new THREE.Mesh(whirlGeo, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: .85, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    whirl.renderOrder = 4; whirl.frustumCulled = false; scene.add(whirl);
    let ring = null;
    if (ride) { const a = +String(e.q).split(',')[3]; mark(pathTex, (d.w || 1.1) * 2 + .4, d.rideDist || 10, u.x, u.z, a, { life: (d.rideDur || .6) + .7, color: col, from: 0, opacity: .95 }); }
    else { ring = decal(ringTex, (d.r || 2.3) * 2, (d.r || 2.3) * 2, { color: col }); if (e.fromNet) u.act = { name: 'spin', t: G.T }; }
    spins.set(u.id, { u, whirl, ring, t0: now(), end: now() + (ride ? (d.rideDur || .6) + .1 : (d.dur || 2.5)) + .2, ride });
    sfx.spinLoop(u.x, u.z); if (ride) sfx.wolfSnarl(u.x, u.z);
  } else if (e.k === 'fxspintick') {
    sfx.spinLoop(u.x, u.z); shockwave(u.x, u.z, d.r || 2.3, '#dff6ff');
    for (const o of G.units) if (!o.dead && o.leader && o.ti !== u.ti && isEnemy(o, u) && Math.hypot(o.x - u.x, o.z - u.z) <= (d.r || 2.3) + (o.r || 0)) impact(o, u, .6);
  } else if (e.k === 'fxspincut' && e.a) {
    const o = e.a; starburst(o.x, (o.y || 0) + 1.1, o.z, o.leader ? 2.4 : 1.6); spark(o.x, (o.y || 0) + 1.1, o.z, '#e9f8ff', 6); sfx.axeChop(o.x, o.z);
    if (o.leader) impact(o, u, .9);
  } else if (e.k === 'fxspinbrace') {
    sfx.clang && sfx.clang(u.x, u.z); spark(u.x, (u.y || 0) + 1.2, u.z, '#ffffff', 12); impact(u, e.a || null, 1.3); endSpinFx(u.id);
  } else if (e.k === 'fxspinend') { const S = spins.get(u.id); if (S) S.end = Math.min(S.end, now() + .15); if (e.fromNet && u.act && u.act.name === 'spin') u.act = null; }
});
// (C5e) the wolf's-head mark: a snarling head in frost white on a dark-red glow
const headTex = tex(128, 128, g => { const gr = g.createRadialGradient(64, 64, 6, 64, 64, 62); gr.addColorStop(0, 'rgba(200,30,20,.75)'); gr.addColorStop(1, 'rgba(200,30,20,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  g.fillStyle = '#f2fbff'; g.strokeStyle = '#2a0c08'; g.lineWidth = 4; g.beginPath(); g.moveTo(30, 22); g.lineTo(50, 46); g.lineTo(78, 46); g.lineTo(98, 22); g.lineTo(100, 66); g.lineTo(82, 92); g.lineTo(64, 112); g.lineTo(46, 92); g.lineTo(28, 66); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#c8261a'; for (const x of [50, 78]) { g.beginPath(); g.moveTo(x - 9, 64); g.lineTo(x + 9, 60); g.lineTo(x, 70); g.fill(); } g.fillStyle = '#2a0c08'; g.beginPath(); g.arc(64, 96, 6, 0, Math.PI * 2); g.fill(); });
const heads = new Map(); // target id -> sprite
function drawHeads() {
  const want = new Set();
  for (const s of G.teams) { const u = s && s.leader; if (!u || u.dead) continue; const d = champOf(u.ti).ult; if (!d || !d.need || !unlocked(u.ti, 'ult') || cdLeft(u.ti, 'ult') > 0) continue;
    for (const o of G.units) if (huntable(u, o, d)) { want.add(o.id); let m = heads.get(o.id); if (!m) { m = new THREE.Sprite(new THREE.SpriteMaterial({ map: headTex, transparent: true, depthWrite: false, depthTest: false })); m.renderOrder = 6; scene.add(m); heads.set(o.id, m); } m.userData.o = o; } }
  for (const [id, m] of heads) { const o = m.userData.o; if (!want.has(id) || o.dead) { scene.remove(m); m.material.dispose(); heads.delete(id); continue; }
    const p = 1 + .12 * Math.sin(now() * 9); m.position.set(o.x, (o.y || 0) + 3.9, o.z); m.scale.setScalar(1.25 * p); }
}
export const huntMarks = () => heads.size; // (tests)
let flashEl = null;
function whiteFlash() { if (typeof document === 'undefined') return; if (!flashEl) { flashEl = document.createElement('div'); flashEl.style.cssText = 'position:fixed;inset:0;background:#fff;pointer-events:none;z-index:40;opacity:0;transition:opacity .35s ease-out'; document.body.appendChild(flashEl); }
  flashEl.style.transition = 'none'; flashEl.style.opacity = '.85'; void flashEl.offsetWidth; flashEl.style.transition = 'opacity .35s ease-out'; flashEl.style.opacity = '0'; }
bus.on('fxmsg', e => {
  const u = e.u; if (!u) return;
  if (e.k === 'fxhunt') {
    const W = u.mounted && wolfOf(u), tg = e.a; if (W) wolfMove(W, 'pounce'); else if (e.fromNet) u.act = { name: 'pounce', t: G.T };
    sfx.wolfSnarl(u.x, u.z); if (tg) mark(pathTex, 1.6, Math.hypot(tg.x - u.x, tg.z - u.z), u.x, u.z, Math.atan2(tg.x - u.x, tg.z - u.z), { life: .9, color: 0xff6a5a, from: 0 });
  } else if (e.k === 'fxhuntend') {
    const tg = e.a, W = u.mounted && wolfOf(u);
    if (e.q === 'dodged' && tg) { pow(tg.x, (tg.y || 0) + 3.2, tg.z, 'DODGED!', '#bfeaff', 3); return; }
    if (e.q !== 'kill' || !tg) return;
    const me = G.player, near = me && Math.hypot(me.x - tg.x, me.z - tg.z) < 30, mine = me === u || me === tg;
    if (W) { wolfMove(W, 'shake'); at(.55, () => { const W2 = wolfOf(u); wolfMove(W2, 'howl'); }); }
    at(.4, () => sfx.howl(u.x, u.z)); sfx.huntSting(tg.x, tg.z);
    if (near || mine) { whiteFlash(); AS.slowmo = Math.max(AS.slowmo || 0, .5); }
    mark(W ? clawTex : chopTex, 4.2, 4.2, tg.x, tg.z, u.face, { life: 2, color: 0xffffff, grow: .3, from: W ? .5 : .15 });
    starburst(tg.x, (tg.y || 0) + 1.3, tg.z, 4); shockwave(tg.x, tg.z, 6, '#ffffff'); pow(tg.x, (tg.y || 0) + 3.4, tg.z, 'HUNTED!', '#e8f8ff', 3); impact(tg, u, 1.6);
  }
});
const snouts = []; // (C5f) { u, t0, warn, dur, lane, tip, riders, a, x, z }
const snoutTex = fanTex(50);
bus.on('fxmsg', e => {
  const u = e.u; if (!u) return;
  if (e.k === 'fxsvin') {
    const p = String(e.q).split(','), a = +p[0], x = +p[1], z = +p[2], len = +p[3], warn = +p[4], dur = +p[5], ids = p.slice(6).map(Number), col = 0xff8a6a;
    const lane = mark(pathTex, 5.5, len + 4, x, z, a, { life: warn + dur + .6, color: col, from: 0, opacity: .9 }), tip = mark(snoutTex, 5, 4, x + Math.sin(a) * 2, z + Math.cos(a) * 2, a, { life: warn + .1, color: 0xffe0d0, from: 0 });
    snouts.push({ u, t0: now(), warn, dur, lane, tip, a, riders: ids.map(id => G.units.find(o => o.id === id)).filter(Boolean) });
    sfx.charge && sfx.charge(u.x, u.z); sfx.horn && sfx.horn(); pow(u.x, (u.y || 0) + 3.6, u.z, 'SVINFYLKING!', '#ffb08a', 3);
  } else if (e.k === 'fxsvinhit') {
    const o = u, r = e.a; starburst(o.x, (o.y || 0) + 1.1, o.z, 1.8); spark(o.x, (o.y || 0) + 1, o.z, '#ffd2c0', 6); dust(o.x, o.z); if (o.leader) impact(o, r || null, .9);
  }
});
function drawSnouts() {
  for (let i = snouts.length - 1; i >= 0; i--) { const W = snouts[i], k = now() - W.t0;
    if (k > W.warn + W.dur + .2) { snouts.splice(i, 1); continue; }
    if (k < W.warn) { const p = .6 + .4 * Math.sin(k * 18); W.lane.material.opacity = p; continue; }
    for (const r of W.riders) if (!r.dead && Math.random() < .5) dust(r.x - Math.sin(W.a) * 1.2, r.z - Math.cos(W.a) * 1.2);
  }
}
export function drawSigrun() {
  drawHeads(); drawSnouts();
  for (const [id, S] of spins) { const u = S.u;
    if (now() > S.end || u.dead || now() < S.t0) { endSpinFx(id); continue; }
    S.whirl.position.set(u.x, (u.y || 0) + (S.ride ? 1.9 : 1.05), u.z); S.whirl.rotation.y = -now() * 16; S.whirl.material.opacity = .55 + .3 * Math.sin(now() * 30);
    if (S.ring) { place(S.ring, u.x, u.z, now() * 4, .13); S.ring.material.opacity = .7 + .3 * Math.sin(now() * 12); }
    if (S.ride && Math.random() < .7) puff({ x: u.x + (Math.random() - .5), y: (u.y || 0) + .4, z: u.z + (Math.random() - .5), vx: 0, vy: .6, vz: 0, life: .5, c: '#e8f6ff', s: .6 });
  }
  for (let i = flights.length - 1; i >= 0; i--) { const F = flights[i], u = F.u;
    if (now() > F.end + .1 || u.dead) { flights.splice(i, 1); continue; }
    if (F.tg && !F.tg.dead) place(F.ring, F.tg.x, F.tg.z, now() * 3, .14); F.ring.scale.setScalar(1.3 - .6 * Math.min(1, (now() - F.t0) / (F.end - F.t0)));
    if (now() - F.t0 > .12) puff({ x: u.x + (Math.random() - .5) * .6, y: (u.y || 0) + .8 + Math.random() * .8, z: u.z + (Math.random() - .5) * .6, vx: 0, vy: .4, vz: 0, life: .45, c: '#dff6ff', s: .5 });
  }
  const T = now();
  for (let i = later.length - 1; i >= 0; i--) if (T >= later[i].t || T < later[i].t - 5) { const f = later[i].f; later.splice(i, 1); f(); }
  for (let i = marks.length - 1; i >= 0; i--) { const k = (T - marks[i].t0) / marks[i].life, M = marks[i];
    if (k >= 1 || k < 0) { drop(M.m); marks.splice(i, 1); continue; }
    M.m.material.opacity = M.o * (k < .15 ? k / .15 : 1 - (k - .15) / .85); if (M.grow) M.m.scale.setScalar(1 + M.grow * k); }
}
export const sigrunMarks = () => marks.length; // (tests)
