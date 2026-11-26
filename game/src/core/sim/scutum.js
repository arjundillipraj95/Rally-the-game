// Battle rules: C3c Shield of Cassius, Titus's special attack 2 (design doc, Titus card and Mount, 17 Nov). The scutum
// raised for a few seconds (tap again drops it): everything from the front arc is blocked (blows, arrows, specials,
// castle shots), for him and for his side in the zone behind him (shorter from the saddle). He can't swing (FEEL2b: Attack stabs over it, stab.js), moves
// slower and can back away facing front; sides and back land fully. An ult breaks it and lands at a share of its
// damage. The recharge counts from when it drops. Numbers on his page (sp2). The host decides; every phone sees it
// raised and its zone from the fxscutum moments (render/scutumfx.js).
import { G, isEnemy } from '../state.js';
import { angDiff, turn } from '../world.js';
import { fx, sound } from './util.js';
import { push } from './army.js'; // (FEEL2b)

export const shields = []; // (the champions with it raised: few, so every blow can ask cheaply)
export function raiseScutum(u, d) {
  u.scutum = { until: G.T + d.up, face: u.face, d }; u.scutumUp = true; u.swing = 0; u.pending = null;
  if (!shields.includes(u)) shields.push(u);
  fx('fxmsg', { k: 'fxscutum', u, q: u.face.toFixed(2) }); sound('thud', u.x, u.z);
}
export function dropScutum(u, why = '') {
  const S = u.scutum; if (!S) return;
  u.scutum = null; u.scutumUp = false; const i = shields.indexOf(u); if (i >= 0) shields.splice(i, 1);
  const c = G.teams[u.ti] && G.teams[u.ti].cds; if (c && G.role !== 'client') c.sp2 = S.d.cd; // (the recharge from now)
  if (G.role !== 'client') fx('fxmsg', { k: 'fxscutumoff', u, q: why });
}
// a joined phone's own champion: raised as the host says (its own slowing and facing)
export function showScutum(u, q, d, on) {
  if (!on) { u.scutum = null; u.scutumUp = false; return; }
  if (!d) return; u.scutum = { until: G.T + d.up, face: +q || u.face, d, own: true }; u.scutumUp = true;
}
// each step while it's up: its time, and his facing (he turns toward where he walks unless he walks backward)
export function scutumTick(u, dt) {
  const S = u.scutum; if (!S) return;
  if (u.dead || G.T > S.until) { if (S.own) { u.scutum = null; u.scutumUp = false; } else dropScutum(u, u.dead ? 'down' : 'time'); return; }
  if (!u.stabT || G.T - u.stabT > .45) u.swing = 0; // (FEEL2b: his stab over it plays out)
  const sp = Math.hypot(u.vx, u.vz);
  if (sp > .5) { const want = Math.atan2(u.vx, u.vz); if (Math.abs(angDiff(S.face, want)) < Math.PI / 2) S.face = turn(S.face, want, dt * S.d.turn); }
  u.face = S.face;
}
export const scutumPace = u => (u.scutum ? u.scutum.d.pace : 1);
// who shields b from a blow coming from (ax, az): b himself, or a champion of his side with b in the zone behind
export function coverOf(b, ax, az) {
  for (const S of shields) {
    if (S.dead || !S.scutum || (S !== b && isEnemy(S, b))) continue;
    const d = S.scutum.d, f = S.scutum.face;
    if (Math.abs(angDiff(f, Math.atan2(ax - S.x, az - S.z))) > d.arc / 2) continue; // (not from his front)
    if (S === b) return S;
    const rx = b.x - S.x, rz = b.z - S.z, fw = rx * Math.sin(f) + rz * Math.cos(f), sd = rx * Math.cos(f) - rz * Math.sin(f);
    if (fw <= .4 && fw >= -(S.mounted ? d.rideZone : d.zone) && Math.abs(sd) <= d.zw) return S;
  }
  return null;
}
// a blow or missile met by it: shown as Blocked, with a thud, on every phone
// (S: the shield's holder, or none for the testudo)
export function blockedBy(S, b, a) {
  fx('fxmsg', { k: 'fxblk', u: b, a: a && a.id != null ? a : null }); sound('thud', b.x, b.z); b.blockT = Math.max(b.blockT || 0, .2);
  // FEEL2b: a champion's melee blow off the Shield of Cassius bounces him back: a step back and a beat off balance
  const R = S && S.scutum && S.scutum.d.rebound; if (!R || !a || !a.leader || a.dead || a.ram || Math.hypot(a.x - b.x, a.z - b.z) > R.near) return;
  const d = Math.hypot(a.x - S.x, a.z - S.z) || 1; push(a, (a.x - S.x) / d * R.kb, (a.z - S.z) / d * R.kb, R.stun);
  fx('fxmsg', { k: 'fxrebound', u: a, a: S });
}
