// F6 hit feel: the three big moments of a fight (two captains' blades meeting, a blow taken on a shield, a captain
// cutting a soldier down), played the same on every phone. The rules send each as a fight moment ('fxmsg':
// fxclash, fxblk, fxcut; net/netgame.js carries them to joined phones). This file plays it: a pooled flash,
// sparks, a sound, both bodies held still for a beat, a camera kick, and a buzz when it's yours.
// Every number is in FEEL (config.js). Nothing here allocates per hit: the flashes and stars live in one pool,
// drawn in one call, and that call isn't made at all while the pool is empty.
import * as THREE from 'three';
import { FEEL } from '../config.js';
import { G, bus } from '../core/state.js';
import { scene, camera } from './scene.js';
import { quality, markFight } from './quality.js';
import { spark, dust, slash, pow } from './effects.js';
import { cam, camKick, camTarget } from './camera.js';
import { reel } from './soldiers.js';
import { sfx, buzz } from '../ui/audio.js';

// ---------- the pool: camera-facing flashes (0 blades meet, 1 a shield takes it, 2 a comic star) ----------
const MAX = 40;
const pool = Array.from({ length: MAX }, () => ({ on: false, kind: 0, t: 0, life: 1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, g: 0, s0: 1, s1: 1, rot: 0, vr: 0, c: null }));
let live = 0, next = 0;
const geo = new THREE.PlaneGeometry(1, 1);
const aFx = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 2), 2), aCol = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 3), 3);
geo.setAttribute('aFx', aFx); geo.setAttribute('aCol', aCol);
const mat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, depthTest: false,
  vertexShader: 'attribute vec2 aFx;\nattribute vec3 aCol;\nvarying vec2 vP;\nvarying vec2 vFx;\nvarying vec3 vCol;\nvoid main(){ vP = uv * 2. - 1.; vFx = aFx; vCol = aCol; gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.); }',
  fragmentShader: 'varying vec2 vP;\nvarying vec2 vFx;\nvarying vec3 vCol;\nvoid main(){\n  float r = length(vP), ang = atan(vP.y, vP.x), a;\n' +
    '  if (vFx.y < .5) { float rays = pow(abs(cos(ang * 4.)), 14.) * (1. - smoothstep(.1, 1., r)); a = max(1. - smoothstep(0., .4, r), rays); }\n' + // (a hot core and eight rays)
    '  else if (vFx.y < 1.5) a = smoothstep(.5, .78, r) * (1. - smoothstep(.84, 1., r)) + .4 * (1. - smoothstep(0., .75, r));\n' + // (a ring rolling out)
    '  else a = 1. - smoothstep(-.03, .03, r - mix(.4, .96, pow(abs(cos(ang * 2.5)), 2.5)));\n' + // (five points)
    '  gl_FragColor = vec4(vCol, a * vFx.x);\n}',
});
const mesh = new THREE.InstancedMesh(geo, mat, MAX);
mesh.frustumCulled = false; mesh.count = 0; mesh.visible = false; mesh.renderOrder = 6;
scene.add(mesh);
const WHITE = new THREE.Color('#fff8e6'), SHIELD = new THREE.Color('#fff3b0'), STAR = new THREE.Color('#ffd23a');
function burst(kind, x, y, z, c, s0, s1, life, vx = 0, vy = 0, vz = 0, g = 0, vr = 0) {
  const p = pool[next]; next = (next + 1) % MAX; // (the oldest slot is reused when the pool is full)
  if (!p.on) live++;
  p.on = true; p.kind = kind; p.t = 0; p.life = life; p.x = x; p.y = y; p.z = z; p.vx = vx; p.vy = vy; p.vz = vz; p.g = g; p.s0 = s0; p.s1 = s1; p.rot = Math.random() * 6.28; p.vr = vr; p.c = c;
}
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _qz = new THREE.Quaternion(), _v = new THREE.Vector3(), _s = new THREE.Vector3(), Z = new THREE.Vector3(0, 0, 1);
export function feelTick(dt) {
  if (!live) { if (mesh.visible) { mesh.visible = false; mesh.count = 0; } return; }
  let n = 0;
  for (let i = 0; i < MAX; i++) {
    const p = pool[i]; if (!p.on) continue;
    p.t += dt; if (p.t >= p.life) { p.on = false; live--; continue; }
    p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.vy -= p.g * dt; p.rot += p.vr * dt;
    const k = p.t / p.life, s = p.s0 + (p.s1 - p.s0) * (p.kind === 2 ? Math.min(1, k * 4) : 1 - (1 - k) * (1 - k));
    _q.copy(camera.quaternion).multiply(_qz.setFromAxisAngle(Z, p.rot));
    mesh.setMatrixAt(n, _m.compose(_v.set(p.x, p.y, p.z), _q, _s.set(s, s, s)));
    aFx.array[n * 2] = p.kind === 2 ? Math.min(1, (1 - k) * 3) : (1 - k) * (1 - k); aFx.array[n * 2 + 1] = p.kind;
    aCol.array[n * 3] = p.c.r; aCol.array[n * 3 + 1] = p.c.g; aCol.array[n * 3 + 2] = p.c.b;
    n++;
  }
  mesh.count = n; mesh.visible = n > 0;
  if (n) { mesh.instanceMatrix.needsUpdate = true; aFx.needsUpdate = true; aCol.needsUpdate = true; }
}
export function clearFeel() { for (const p of pool) p.on = false; live = 0; mesh.count = 0; mesh.visible = false; }

// ---------- the moments ----------
// (what a test can count: each moment played here, and what it set off)
export const feelStats = { clash: 0, block: 0, cut: 0, stop: 0, flash: 0, sound: 0, kick: 0, buzz: 0, last: null };
const lowQ = () => quality.level === 'low';
// both bodies hold their pose for a beat. When it's your own blow the whole screen holds instead (main.js 'hitstop').
function hold(u, a, F, mine) {
  feelStats.stop++;
  if (mine) { bus.emit('hitstop', F.world); return; }
  if (u && !(u.fz > F.stop)) u.fz = F.stop;
  if (a && !(a.fz > F.stop)) a.fz = F.stop;
}
const slashM = new THREE.Matrix4(), _e = new THREE.Euler(), _t = new THREE.Matrix4();
bus.on('fxmsg', d => {
  const k = d.k, u = d.u, a = d.a;
  if (!u || (k !== 'fxclash' && k !== 'fxblk' && k !== 'fxcut')) return;
  const F = k === 'fxclash' ? FEEL.clash : k === 'fxblk' ? FEEL.block : FEEL.cut;
  const me = G.player, mine = !!me && (u === me || a === me), t = camTarget();
  // a joined phone hears of a man cut down a moment after he drops out of the snapshot: he falls away from the blade
  if (k === 'fxcut' && d.fromNet && u.dead && a && (u.deadT || 0) < .3) {
    const ang = Math.atan2(u.x - a.x, u.z - a.z), f = d.heavy ? F.launch : F.kb;
    u.vx = Math.sin(ang) * f; u.vz = Math.cos(ang) * f; if (d.heavy && !u.launch) { u.launch = true; u.vy = F.up[1] * 2; }
  }
  if (!mine && !(t && Math.hypot(u.x - t.x, u.z - t.z) < F.near)) return; // (far off: nobody's watching)
  markFight(); // (F14: a blow near the camera: no visible graphics step now)
  const name = k === 'fxclash' ? 'clash' : k === 'fxblk' ? 'block' : 'cut';
  feelStats[name]++; feelStats.last = name;
  const ax = a ? a.x : u.x, az = a ? a.z : u.z, ay = a ? a.y : u.y;
  const ang = Math.atan2(ax - u.x, az - u.z); // (from the struck man to the one who struck)
  if (k === 'fxclash') { // two captains' blades meet between them
    const mx = (u.x + ax) / 2, mz = (u.z + az) / 2, my = (u.y + ay) / 2 + 1.5;
    burst(0, mx, my, mz, WHITE, .5, F.flash * (mine ? 1 : .8), F.flashT); feelStats.flash++;
    spark(mx, my, mz, '#ffe9a8', lowQ() ? F.sparks >> 1 : F.sparks);
    sfx.clash(mx, mz); feelStats.sound++;
    hold(u, a, F, mine);
    reel(u, ang, F.reel); if (a) reel(a, ang + Math.PI, F.reel);
    cam.shake = Math.max(cam.shake, F.shake[mine ? 1 : 0]);
    if (mine) { const o = u === me ? 1 : -1; camKick(-Math.sin(ang) * o * F.kick, -Math.cos(ang) * o * F.kick); feelStats.kick++; buzz(F.buzz); feelStats.buzz++; pow(mx, my + 1.3, mz, 'CLASH!', '#fff3b0', 1); }
    return;
  }
  if (k === 'fxblk') { // a blow taken on a shield: the shield flashes, the attacker's weapon rebounds
    const sx = u.x + Math.sin(ang) * .55, sz = u.z + Math.cos(ang) * .55;
    burst(1, sx, u.y + 1.25, sz, SHIELD, .45, F.flash, F.flashT); feelStats.flash++;
    sfx.shield(sx, sz); feelStats.sound++;
    hold(u, a, F, mine);
    if (a) reel(a, ang + Math.PI, F.recoil); // (the attacker rocks back off it)
    reel(u, ang, F.jolt);
    if (mine) {
      cam.shake = Math.max(cam.shake, F.shake[u === me ? 1 : 0]);
      if (u === me) { camKick(-Math.sin(ang) * F.kick, -Math.cos(ang) * F.kick); feelStats.kick++; }
      buzz(F.buzz[u === me ? 1 : 0]); feelStats.buzz++;
    }
    return;
  }
  // a captain cuts a soldier down: a wide stroke, a beat, stars and dust where he stood, a yelp
  if (a) {
    _e.set(0, ang + Math.PI, 0); _q.setFromEuler(_e);
    slashM.compose(_v.set(a.x, a.y + 1.3, a.z), _q, _s.set(1, 1, 1)); slashM.multiply(_t.makeRotationX(-.4)).multiply(_t.makeRotationZ(-.2)).multiply(_t.makeScale(F.slash, 1, F.slash));
    slash(slashM, '#ffe9a8', 1);
  }
  const n = lowQ() ? F.stars >> 1 : F.stars;
  for (let i = 0; i < n; i++) burst(2, u.x, u.y + 1.7, u.z, STAR, .1, F.star, F.starT, (Math.random() - .5) * 4 - Math.sin(ang) * 1.5, 3 + Math.random() * 2, (Math.random() - .5) * 4 - Math.cos(ang) * 1.5, 9, (Math.random() - .5) * 10);
  feelStats.flash++;
  dust(u.x, u.z);
  sfx.cut(u.x, u.z); sfx.yelp(u.x, u.z); feelStats.sound++;
  hold(u, a, F, mine);
  cam.shake = Math.max(cam.shake, F.shake[a === me ? 1 : 0]);
  if (a === me) { camKick(-Math.sin(ang) * F.kick, -Math.cos(ang) * F.kick); feelStats.kick++; buzz(F.buzz); feelStats.buzz++; }
});
