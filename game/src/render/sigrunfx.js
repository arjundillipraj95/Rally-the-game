// (C5) What Sigrun's moves show, on every phone, from the fx moments in core/sim/sigrun.js and captain.js, in frost
// white and ice blue with her team's colour (Arjun: Unite-like, big readable shapes, a clear area on the ground, a
// bright impact, a trace that lingers; felt by both sides through render/feel.js impact):
// - the wolf's claws: three bright rakes on the ground where it struck; the bite: a jaw-mark and a burst;
// - her overhead chop: the 120° arc it cuts lit on the ground, a burst where the axe lands, dust.
// drawSigrun() runs every frame (render/overlay.js). Drawing and sounds only.
import * as THREE from 'three';
import { bus, G, colorOf } from '../core/state.js';
import { TEAMS } from '../config.js';
import { champOf } from '../champions/index.js';
import { spark, dust } from './effects.js';
import { decal, place, drop, starburst } from './fxkit.js';
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
const teamIce = u => new THREE.Color(TEAMS[colorOf(u.ti)] ? TEAMS[colorOf(u.ti)].css : '#ffffff').lerp(new THREE.Color(ICE), .7).getHex();
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
export function drawSigrun() {
  const T = now();
  for (let i = later.length - 1; i >= 0; i--) if (T >= later[i].t || T < later[i].t - 5) { const f = later[i].f; later.splice(i, 1); f(); }
  for (let i = marks.length - 1; i >= 0; i--) { const k = (T - marks[i].t0) / marks[i].life, M = marks[i];
    if (k >= 1 || k < 0) { drop(M.m); marks.splice(i, 1); continue; }
    M.m.material.opacity = M.o * (k < .15 ? k / .15 : 1 - (k - .15) / .85); if (M.grow) M.m.scale.setScalar(1 + M.grow * k); }
}
export const sigrunMarks = () => marks.length; // (tests)
