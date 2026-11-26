// Third-person camera that follows your captain (or an ally's once you fall).
import { G, isEnemyTi, bus, colorOf } from '../core/state.js';
import { FEEL, EXEC, CASTLE26, TEAMS } from '../config.js';
import { CAMVIEW } from '../config/cam.js';
import { circleOf } from '../core/sim/capture.js'; // (CASTLE4)
import { groundY, terrainMeshY, rnd, W } from '../core/world.js';
import { camera, view, fovMode, resize } from './scene.js';

export const cam = { yaw: 0, pitch: .42, shake: 0, snap: 0, kx: 0, kz: 0 }; // (snap: for this many frames the camera is put straight where it belongs, no glide: a cut under black, F5)
// (F5) your fallen captain: the camera stays on him until you're back (ui/death.js sets and clears it)
export const deathCam = { u: null };
// (F6) a kick: the camera is knocked this far (metres) and eases back by itself
export function camKick(dx, dz) { if (reduceMotion) return; cam.kx += dx; cam.kz += dz; }
// the match's opening (main.js): when set, it may move the camera after the follow camera has placed it
export const introCam = { on: null };
export const CAM_PITCH = .42; // a little higher than eye level, so the squad behind you doesn't wall off the fight
// CAM2 (Arjun 26 Nov): the turning third-person camera is the default again; CAM1's fixed high camera (config/cam.js) is
// Settings > Camera > High. Kept per phone (rally-cammode). ?cam=old|turn: turning; ?cam=high|45|50|55: high.
const camQ = new URLSearchParams(location.search).get('cam');
const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const camSaved = lsGet('rally-cam');
const highQ = camQ === 'high' || !!CAMVIEW.presets[camQ], turnQ = camQ === 'old' || camQ === 'turn';
export const camMode = { fixed: highQ ? true : turnQ ? false : lsGet('rally-cammode') === 'high', angle: CAMVIEW.presets[camQ] ? +camQ : CAMVIEW.presets[camSaved] ? +camSaved : CAMVIEW.def };
camMode.preset = CAMVIEW.presets[camMode.angle];
fovMode.high = camMode.fixed;
// Settings > Camera: Turning or High
export function setCamMode(high) { camMode.fixed = !!high; fovMode.high = camMode.fixed; try { localStorage.setItem('rally-cammode', high ? 'high' : 'turn'); } catch (e) {} dir.fx = null; camLook.on = false; resize(); }
// Settings > Camera angle (45, 50, 55): kept on this phone
export function setCamAngle(a) { if (!CAMVIEW.presets[a]) return; camMode.angle = +a; camMode.preset = CAMVIEW.presets[a]; try { localStorage.setItem('rally-cam', String(a)); } catch (e) {} }
// looking somewhere else (ui/camlook.js): on: the camera's on {x, z} instead of on its target
export const camLook = { on: false, x: 0, z: 0 };
// the faction's own view: from its nexus (base) toward the summit, so the base is at the bottom of the screen
let yawKey = null, yawV = 0;
export function fixedYaw() {
  const key = G.seed + ':' + G.myTi; if (key === yawKey) return yawV;
  const c = colorOf(G.myTi), n = G.layout && G.layout.nexus && G.layout.nexus.find(o => o.c === c);
  const b = n || { x: TEAMS[c].pos[0], z: TEAMS[c].pos[1] };
  yawV = Math.hypot(b.x, b.z) > 1 ? Math.atan2(-b.x, -b.z) : 0; yawKey = key; return yawV;
}
let reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
// F18: the Screen shake setting (off = no shake and no camera kick, like the phone's reduce-motion)
function readShake() { try { return localStorage.getItem('rally-shake') !== 'off'; } catch (e) { return true; } }
if (!readShake()) reduceMotion = true;
export function shakeEnabled() { return !reduceMotion; }
export function setShake(on) { try { localStorage.setItem('rally-shake', on ? 'on' : 'off'); } catch (e) {} reduceMotion = !on || matchMedia('(prefers-reduced-motion: reduce)').matches; }

export function camTarget() {
  const p = G.player;
  if (p && !p.dead) return (p.chasmT > 0 || p.chasmAt) && p.edge ? p.edge : p; // (F7: going over the chasm's edge: the camera holds at the rim)
  if (deathCam.u) return deathCam.u;
  const ally = G.teams.map(s => s.leader).find(L => L && !L.dead && !isEnemyTi(L.ti, G.myTi));
  if (ally) return ally;
  return G.units.find(u => !u.dead && u.ti === G.myTi) || G.units.find(u => !u.dead) || null;
}

const angTo = (from, to) => { let d = (to - from) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
// The director: the camera reads the fight around you. A big clash pulls it back and up to show the
// scale of it; a duel between captains brings it in close and low; quiet ground, the usual view.
let beatUntil = 0; bus.on('camBeat', () => { beatUntil = performance.now() + 1300; }); // (CASTLE5: a castle taken near you: a beat of camera, back and up)
const dir = { zoom: 1, lift: 0, t: 0, want: 1, wantLift: 0, orbit: 0, side: 1, ex: null, cin: 0, fx: null, fz: 0, fy: 0, back: false, lx: 0, lz: 0 };
function direct(tgt, dt) {
  dir.t -= dt;
  if (dir.t <= 0) {
    dir.t = .25;
    let fighting = 0, near = 0, duel = false;
    for (const u of G.units) {
      if (u.dead) continue;
      const d = Math.hypot(u.x - tgt.x, u.z - tgt.z); if (d > 22) continue;
      if (d < 7) near++;
      if (u.swing > 0 || (u.fd != null && u.fd < 3)) fighting++;
      if (u.leader && u !== tgt && d < 4.5 && !u.mounted && !tgt.mounted && isEnemyTi(u.ti, tgt.ti)) duel = true;
    }
    const scale = Math.min(1, Math.max(0, (fighting - 6) / 16));
    if (camMode.fixed) { // (CAM1: when champions meet it eases out, never in)
      dir.want = tgt.duelId ? CAMVIEW.ring : duel && near <= 6 ? CAMVIEW.duel : 1 + (CAMVIEW.fight - 1) * scale; dir.wantLift = 0;
      if (fighting > 0 && dir.want < CAMVIEW.duel && G.units.some(u => u.leader && u !== tgt && !u.dead && isEnemyTi(u.ti, tgt.ti) && Math.hypot(u.x - tgt.x, u.z - tgt.z) < 9)) dir.want = CAMVIEW.duel;
    }
    else if (tgt.duelId) { dir.want = 1.05; dir.wantLift = 1.8; } // (a called duel: up over the heads of the ring, the two of you inside it)
    else if (duel && near <= 6) { dir.want = .86; dir.wantLift = -.6; }
    else { dir.want = 1 + .38 * scale; dir.wantLift = 2.2 * scale; }
    if (!tgt.dead && G.c2 && circleOf(tgt)) dir.want = Math.max(dir.want, 1 + CASTLE26.circle.cam); // (CASTLE4: in a capture circle, pulled back)
    if (performance.now() < beatUntil) { dir.want = Math.max(dir.want, 1.35); dir.wantLift = Math.max(dir.wantLift, 2.6); dir.t = .1; }
    if (tgt.dead) { dir.want = FEEL.death.zoom; dir.wantLift = FEEL.death.lift; } // (F5: back and up over a fallen captain)
  }
  // an execution: in close and low on the two of them, quickly
  // (and swung round side-on, so the kneeling man isn't hidden behind the executioner; eased back after)
  const exU = tgt.execA ? tgt : G.units.find(u => u.execA && !u.dead && Math.hypot(u.x - tgt.x, u.z - tgt.z) < 6), ex = !!exU || tgt.execV;
  if (exU && exU !== dir.ex) { dir.side = Math.sin(cam.yaw + dir.orbit - exU.face) >= 0 ? 1 : -1; dir.zoom -= EXEC.push; } // (F7f: a very short extra push-in as it begins)
  dir.ex = exU || null;
  if (ex) { dir.want = camMode.fixed ? 1 : .68; dir.wantLift = -.9; dir.t = .4; }
  dir.cin += ((ex ? 1 : 0) - dir.cin) * Math.min(1, dt * (ex ? 4 : 2)); // (CAM1: the close moment's swing down to the low camera, and back up)
  const wantOrbit = exU ? angTo(cam.yaw, exU.face + dir.side * 1.25) : 0;
  dir.orbit += (wantOrbit - dir.orbit) * Math.min(1, dt * (exU ? 3.5 : 1.6));
  const k = Math.min(1, dt * (ex ? 4 : dir.want < dir.zoom ? 1.4 : .7)); // (eases out slowly, comes back in a little quicker)
  dir.zoom += (dir.want - dir.zoom) * k; dir.lift += (dir.wantLift - dir.lift) * k;
}
export function followCamera(dt) {
  cam.shake = Math.max(0, cam.shake - dt * 1.6);
  const tgt = camTarget(); if (!tgt) return;
  if (cam.snap > 0) { dir.zoom = dir.want = 1; dir.lift = dir.wantLift = 0; dir.orbit = 0; dir.t = 0; }
  direct(tgt, dt);
  if (camMode.fixed) { fixedFollow(tgt, dt); return; }
  glide(tgt, dt); const away = camLook.on || dir.back; // (CAM2: the minimap look works with the turning camera too; otherwise exactly as before)
  const px = away ? dir.fx : tgt.x, pz = away ? dir.fz : tgt.z, py = away ? dir.fy : tgt.y;
  const dist = ((view.W < view.H ? 11 : 9.5) + (tgt.mounted ? 3 : 0)) * dir.zoom, h = 2.2 + Math.sin(cam.pitch) * dist + (tgt.mounted ? 1 : 0) + dir.lift;
  const yaw = cam.yaw + dir.orbit; // (dir.orbit: the director's swing round, for an execution)
  const cx = px - Math.sin(yaw) * Math.cos(cam.pitch) * dist, cz = pz - Math.cos(yaw) * Math.cos(cam.pitch) * dist;
  const k = cam.snap > 0 ? 1 : Math.min(1, dt * 8);
  if (cam.snap > 0) { cam.snap--; cam.kx = cam.kz = 0; }
  if (cam.kx || cam.kz) { camera.position.x += cam.kx; camera.position.z += cam.kz; cam.kx = cam.kz = 0; } // (the follow below eases it back)
  camera.position.x += (cx - camera.position.x) * k; camera.position.z += (cz - camera.position.z) * k; camera.position.y += (py + h - camera.position.y) * k;
  const ground = Math.max(groundY(camera.position.x, camera.position.z), terrainMeshY(camera.position.x, camera.position.z)) + 1; if (camera.position.y < ground) camera.position.y = ground;
  if (cam.shake > 0 && !reduceMotion) { camera.position.x += rnd(-1, 1) * cam.shake * .3; camera.position.y += rnd(-1, 1) * cam.shake * .3; }
  if (tgt.edge) { dir.edgeK = Math.min(1, (dir.edgeK || 0) + dt * 2.5); } else dir.edgeK = 0; // (F7: at the chasm's rim the camera tips to look down after him)
  const ek = dir.edgeK * dir.edgeK * (3 - 2 * dir.edgeK);
  camera.lookAt(px + Math.sin(yaw) * (3 + ek * 2), py + 1.6 + (tgt.mounted ? 1 : 0) - ek * 9, pz + Math.cos(yaw) * (3 + ek * 2));
  if (introCam.on) introCam.on(camera, tgt);
}

// where the camera looks: the champion, or a place looked at from the minimap (gliding there and back). Both cameras.
function glide(tgt, dt) {
  const V = CAMVIEW, ty = camLook.on ? null : tgt.y || 0, tx = camLook.on ? camLook.x : tgt.x, tz = camLook.on ? camLook.z : tgt.z;
  if (dir.fx === null || cam.snap > 0) { dir.fx = tx; dir.fz = tz; dir.back = false; }
  if (camLook.on) dir.back = true;
  const rate = camLook.on ? V.look.glide : dir.back ? V.look.back : 0;
  if (rate) { const k = Math.min(1, dt * rate); dir.fx += (tx - dir.fx) * k; dir.fz += (tz - dir.fz) * k; if (!camLook.on && Math.hypot(tx - dir.fx, tz - dir.fz) < .3) dir.back = false; }
  else { dir.fx = tx; dir.fz = tz; }
  const gy = ty === null || dir.back ? groundY(dir.fx, dir.fz) : ty; dir.fy += ((gy || 0) - dir.fy) * Math.min(1, dt * 6); if (cam.snap > 0) dir.fy = gy || 0;
}
// CAM1 the fixed high camera: the look point is the champion (or a place looked at), a little up-screen of him
function fixedFollow(tgt, dt) {
  const V = CAMVIEW, P = camMode.preset, cin = dir.cin, ease = cin * cin * (3 - 2 * cin);
  cam.yaw = fixedYaw(); cam.pitch = P.pitch * Math.PI / 180;
  const yaw = cam.yaw + dir.orbit * ease, fx = Math.sin(yaw), fz = Math.cos(yaw);
  // where the camera is looking: the champion, or a place looked at (gliding there and back)
  glide(tgt, dt);
  // on horseback the look point leads the way he rides
  const M = tgt.mounted && !camLook.on && !tgt.dead, sp = Math.hypot(tgt.vx || 0, tgt.vz || 0), lk = Math.min(1, dt * V.mounted.leadK);
  const wl = M && sp > .5 ? V.mounted.lead * Math.min(1, sp / 12) : 0;
  dir.lx += ((wl ? (tgt.vx / sp) * wl : 0) - dir.lx) * lk; dir.lz += ((wl ? (tgt.vz / sp) * wl : 0) - dir.lz) * lk;
  const pitch = cam.pitch + (V.close.pitch - cam.pitch) * ease;
  const dist = P.dist * dir.zoom * (M ? V.mounted.out : 1) * (1 - ease) + V.close.dist * ease;
  const ahead = V.ahead * (1 - ease), lift = 1.2 + (tgt.mounted ? .8 : 0) * (1 - (camLook.on ? 1 : 0));
  const Lx = dir.fx + fx * ahead + dir.lx, Lz = dir.fz + fz * ahead + dir.lz, Ly = dir.fy + lift;
  const cx = Lx - fx * Math.cos(pitch) * dist, cz = Lz - fz * Math.cos(pitch) * dist, cy = Ly + Math.sin(pitch) * dist;
  const k = cam.snap > 0 ? 1 : Math.min(1, dt * 8);
  if (cam.snap > 0) { cam.snap--; cam.kx = cam.kz = 0; }
  if (cam.kx || cam.kz) { camera.position.x += cam.kx; camera.position.z += cam.kz; cam.kx = cam.kz = 0; }
  camera.position.x += (cx - camera.position.x) * k; camera.position.z += (cz - camera.position.z) * k; camera.position.y += (cy - camera.position.y) * k;
  const ground = Math.max(groundY(camera.position.x, camera.position.z), terrainMeshY(camera.position.x, camera.position.z)) + 1; if (camera.position.y < ground) camera.position.y = ground;
  if (cam.shake > 0 && !reduceMotion) { camera.position.x += rnd(-1, 1) * cam.shake * .3; camera.position.y += rnd(-1, 1) * cam.shake * .3; }
  camera.lookAt(Lx, Ly, Lz); if (import.meta.env.DEV) window.__camDbg = { L: [Lx, Ly, Lz], c: [cx, cy, cz], f: [dir.fx, dir.fz], l: [dir.lx, dir.lz], t: [tgt.x, tgt.z], k, ease, dist };
  if (introCam.on) introCam.on(camera, tgt);
}

// Slow orbit over the battlefield behind the menus.
export function orbitCamera(t) {
  camera.position.set(Math.cos(t * .05) * 62 * W.S, 26 * W.S + (G.map.id === 'frost' ? 4 : 0), Math.sin(t * .05) * 62 * W.S);
  camera.lookAt(0, groundY(0, 0), 0);
}
