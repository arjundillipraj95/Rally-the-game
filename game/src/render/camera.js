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

export function followCamera(dt) {
  cam.shake = Math.max(0, cam.shake - dt * 1.6);
  const tgt = camTarget(); if (!tgt) return;
  const px = tgt.x, pz = tgt.z, py = tgt.y;
  const dist = (view.W < view.H ? 11 : 9.5) + (tgt.mounted ? 3 : 0), h = 2.2 + Math.sin(cam.pitch) * dist + (tgt.mounted ? 1 : 0);
  const cx = px - Math.sin(cam.yaw) * Math.cos(cam.pitch) * dist, cz = pz - Math.cos(cam.yaw) * Math.cos(cam.pitch) * dist;
  const k = Math.min(1, dt * 8);
  camera.position.x += (cx - camera.position.x) * k; camera.position.z += (cz - camera.position.z) * k; camera.position.y += (py + h - camera.position.y) * k;
  const ground = Math.max(groundY(camera.position.x, camera.position.z), terrainMeshY(camera.position.x, camera.position.z)) + 1; if (camera.position.y < ground) camera.position.y = ground;
  if (cam.shake > 0 && !reduceMotion) { camera.position.x += rnd(-1, 1) * cam.shake * .3; camera.position.y += rnd(-1, 1) * cam.shake * .3; }
  camera.lookAt(px + Math.sin(cam.yaw) * 3, py + 1.6 + (tgt.mounted ? 1 : 0), pz + Math.cos(cam.yaw) * 3);
}

// Slow orbit over the battlefield behind the menus.
export function orbitCamera(t) {
  camera.position.set(Math.cos(t * .05) * 62 * W.S, 26 * W.S + (G.map.id === 'frost' ? 4 : 0), Math.sin(t * .05) * 62 * W.S);
  camera.lookAt(0, groundY(0, 0), 0);
}
