// Third-person camera that follows your captain (or an ally's once you fall).
import { G, isEnemyTi } from '../core/state.js';
import { groundY, terrainMeshY, rnd, W } from '../core/world.js';
import { camera, view } from './scene.js';

export const cam = { yaw: 0, pitch: .42, shake: 0 };
export const CAM_PITCH = .42; // a little higher than eye level, so the squad behind you doesn't wall off the fight
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function camTarget() {
  const p = G.player;
  if (p && !p.dead) return p;
  const ally = G.teams.map(s => s.leader).find(L => L && !L.dead && !isEnemyTi(L.ti, G.myTi));
  if (ally) return ally;
  return G.units.find(u => !u.dead && u.ti === G.myTi) || G.units.find(u => !u.dead) || null;
}

const angTo = (from, to) => { let d = (to - from) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
// The director: the camera reads the fight around you. A big clash pulls it back and up to show the
// scale of it; a duel between captains brings it in close and low; quiet ground, the usual view.
const dir = { zoom: 1, lift: 0, t: 0, want: 1, wantLift: 0, orbit: 0, side: 1, ex: null };
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
    if (duel && near <= 6) { dir.want = .86; dir.wantLift = -.6; }
    else { dir.want = 1 + .38 * scale; dir.wantLift = 2.2 * scale; }
  }
  // an execution: in close and low on the two of them, quickly
  // (and swung round side-on, so the kneeling man isn't hidden behind the executioner; eased back after)
  const exU = tgt.execA ? tgt : G.units.find(u => u.execA && !u.dead && Math.hypot(u.x - tgt.x, u.z - tgt.z) < 6), ex = !!exU || tgt.execV;
  if (exU && exU !== dir.ex) { dir.side = Math.sin(cam.yaw + dir.orbit - exU.face) >= 0 ? 1 : -1; }
  dir.ex = exU || null;
  if (ex) { dir.want = .68; dir.wantLift = -.9; dir.t = .4; }
  const wantOrbit = exU ? angTo(cam.yaw, exU.face + dir.side * 1.25) : 0;
  dir.orbit += (wantOrbit - dir.orbit) * Math.min(1, dt * (exU ? 3.5 : 1.6));
  const k = Math.min(1, dt * (ex ? 4 : dir.want < dir.zoom ? 1.4 : .7)); // (eases out slowly, comes back in a little quicker)
  dir.zoom += (dir.want - dir.zoom) * k; dir.lift += (dir.wantLift - dir.lift) * k;
}
export function followCamera(dt) {
  cam.shake = Math.max(0, cam.shake - dt * 1.6);
  const tgt = camTarget(); if (!tgt) return;
  direct(tgt, dt);
  const px = tgt.x, pz = tgt.z, py = tgt.y;
  const dist = ((view.W < view.H ? 11 : 9.5) + (tgt.mounted ? 3 : 0)) * dir.zoom, h = 2.2 + Math.sin(cam.pitch) * dist + (tgt.mounted ? 1 : 0) + dir.lift;
  const yaw = cam.yaw + dir.orbit; // (dir.orbit: the director's swing round, for an execution)
  const cx = px - Math.sin(yaw) * Math.cos(cam.pitch) * dist, cz = pz - Math.cos(yaw) * Math.cos(cam.pitch) * dist;
  const k = Math.min(1, dt * 8);
  camera.position.x += (cx - camera.position.x) * k; camera.position.z += (cz - camera.position.z) * k; camera.position.y += (py + h - camera.position.y) * k;
  const ground = Math.max(groundY(camera.position.x, camera.position.z), terrainMeshY(camera.position.x, camera.position.z)) + 1; if (camera.position.y < ground) camera.position.y = ground;
  if (cam.shake > 0 && !reduceMotion) { camera.position.x += rnd(-1, 1) * cam.shake * .3; camera.position.y += rnd(-1, 1) * cam.shake * .3; }
  camera.lookAt(px + Math.sin(yaw) * 3, py + 1.6 + (tgt.mounted ? 1 : 0), pz + Math.cos(yaw) * 3);
}

// Slow orbit over the battlefield behind the menus.
export function orbitCamera(t) {
  camera.position.set(Math.cos(t * .05) * 62 * W.S, 26 * W.S + (G.map.id === 'frost' ? 4 : 0), Math.sin(t * .05) * 62 * W.S);
  camera.lookAt(0, groundY(0, 0), 0);
}
