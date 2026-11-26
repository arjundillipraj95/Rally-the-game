// CAM1 looking somewhere else with the fixed camera (Arjun 25 Nov).
// Alive: press the minimap and the camera goes there; drag on it to look round; let go and it holds a moment, then slides
// back to your champion (you can steer the whole time). With the shout tray open, a tap on the minimap is "Attack here!".
// Dead: drag the screen (or push the stick) to move the camera round the field, tap the minimap to jump there, or tap a
// teammate's face to follow him. It stays where you leave it until you're back.
import { G, bus, colorOf, isEnemyTi } from '../core/state.js';
import { TEAMS, PINGS } from '../config.js';
import { CAMVIEW } from '../config/cam.js';
import { cam, camLook, camMode, deathCam } from '../render/camera.js';
import { miniToWorld } from './pings.js';
import { inp } from './input.js';
import { faceSrc } from './portraits.js';
import { champOf } from '../champions/index.js';

const $ = id => document.getElementById(id);
const L = { held: null, stay: 0, wasDead: false, built: '', bar: null };
const dead = () => !!(G.player && G.player.dead) || (!G.player && G.state === 'play');
const focus = () => { const t = deathCam.u || G.player; return t ? { x: t.x, z: t.z } : { x: 0, z: 0 }; };
export const lookState = () => ({ on: camLook.on, x: +camLook.x.toFixed(1), z: +camLook.z.toFixed(1), held: L.held !== null, follow: deathCam.u && deathCam.u !== G.player ? deathCam.u.ti : null });

// a place to look at, in the world (kept inside the field)
function lookAt(x, z) { const R = (G.layout && G.layout.ext) || 120; const d = Math.hypot(x, z); if (d > R) { x *= R / d; z *= R / d; } camLook.on = true; camLook.x = x; camLook.z = z; }
// screen pixels to metres on the ground (dragged like a map: the ground follows the finger)
function pan(dx, dy) {
  if (!camLook.on) { const f = focus(); lookAt(f.x, f.z); }
  const y = cam.yaw, fx = Math.sin(y), fz = Math.cos(y), rx = -Math.cos(y), rz = Math.sin(y), k = CAMVIEW.pan * (camMode.preset.dist / 19);
  lookAt(camLook.x - (rx * dx - fx * dy) * k, camLook.z - (rz * dx - fz * dy) * k);
}
// input.js hands over the right thumb's drag (the fixed camera doesn't turn)
export function lookDrag(dx, dy) { if (camMode.fixed && dead()) pan(dx, dy); }

export function installCamLook(A) {
  const mini = $('mini');
  mini.addEventListener('pointerdown', e => {
    if (!document.body.classList.contains('bs')) return; e.preventDefault(); e.stopPropagation();
    const pt = miniToWorld(e); if (!pt) return;
    const tray = $('shoutTray');
    if (tray && !tray.hidden && !dead()) { A.shout(PINGS.from, pt); tray.hidden = true; $('shoutBtn').classList.remove('open'); return; } // (shout tray open: Attack here!)
    if (!camMode.fixed) { A.shout(PINGS.from, pt); return; } // (?cam=old: as before)
    L.held = e.pointerId; try { mini.setPointerCapture(e.pointerId); } catch (_) {}
    if (dead()) deathCam.u = G.player || deathCam.u; // (back off a teammate: the camera is yours to move)
    lookAt(pt.x, pt.z);
  });
  mini.addEventListener('pointermove', e => { if (e.pointerId !== L.held) return; const pt = miniToWorld(e); if (pt) lookAt(pt.x, pt.z); });
  const up = e => { if (e.pointerId !== L.held) return; L.held = null; L.stay = CAMVIEW.look.stay; };
  mini.addEventListener('pointerup', up); mini.addEventListener('pointercancel', up); mini.addEventListener('lostpointercapture', up);
  // the teammates' faces while you're down
  L.bar = document.createElement('div'); L.bar.id = 'deadAllies'; L.bar.hidden = true; document.body.appendChild(L.bar);
  L.bar.addEventListener('pointerdown', e => {
    const b = e.target.closest('button'); if (!b) return; e.preventDefault(); e.stopPropagation();
    const ti = +b.dataset.ti, u = G.teams[ti] && G.teams[ti].leader; if (!u) return;
    deathCam.u = ti === G.myTi ? G.player : u; camLook.on = false; L.held = null; bar(true);
  });
}
// the faces: you first (back to where you fell), then each living teammate's champion
function bar(force) {
  const show = camMode.fixed && dead() && G.state === 'play';
  if (L.bar.hidden === show) L.bar.hidden = !show;
  if (!show) { L.built = ''; return; }
  const mates = G.teams.map((s, ti) => ({ s, ti })).filter(({ s, ti }) => ti !== G.myTi && s.active !== false && s.leader && !s.leader.dead && !isEnemyTi(ti, G.myTi));
  const key = mates.map(m => m.ti).join(',') + '|' + (deathCam.u && deathCam.u.ti) + '|' + camLook.on;
  if (!force && key === L.built) return; L.built = key;
  const btn = (ti, label) => { const c = champOf(ti), on = !camLook.on && deathCam.u && deathCam.u.ti === ti;
    return `<button data-ti="${ti}" class="${on ? 'on' : ''}" style="--c:${TEAMS[colorOf(ti)].css}"><img src="${faceSrc(c.id)}" alt="" draggable="false"><span>${label}</span></button>`; };
  L.bar.innerHTML = btn(G.myTi, 'You') + mates.map(m => btn(m.ti, champOf(m.ti).name.split(' ')[0])).join('');
}
// every frame of a battle, before the camera
export function camLookTick(dt) {
  if (!L.bar) return;
  const d = dead();
  if (d && !L.wasDead) { camLook.on = false; L.held = null; }
  if (!d && L.wasDead) { camLook.on = false; L.held = null; } // (back on your feet: the camera is his again; the respawn cut hides the move)
  L.wasDead = d;
  if (G.state !== 'play') { camLook.on = false; L.held = null; }
  if (!d && camLook.on && L.held === null) { L.stay -= dt; if (L.stay <= 0) camLook.on = false; } // (alive: a look holds a moment, then slides back)
  if (d && camMode.fixed && inp.joy.active && (inp.joy.x || inp.joy.y)) pan(-inp.joy.x * 520 * dt, -inp.joy.y * 520 * dt); // (dead: the stick moves the camera too)
  bar(false);
}
bus.on('respawnMe', () => { camLook.on = false; L.held = null; });
