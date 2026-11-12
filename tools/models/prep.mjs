// F8 model prep: the two Mixamo packs (captain, soldier) onto one shared skeleton, written as GLB
// into game/public/models. Run from anywhere:
//   node tools/models/prep.mjs <captain pack: zip or folder> <soldier pack: zip or folder>
// It never writes into the packs. A zip is unpacked into a new temp folder.
// What it does, per pack:
//   1. checks the body and every clip: bone names (mixamorig...), up axis, facing, scale, the 22 shared bones
//   2. moves the pack body's skin (which bone moves which part) onto the game's painted body of the same
//      shape (game/public/models/body_plain.glb, soldier.glb): the pack body has no paint and far more triangles
//   3. puts the clips listed in clips.mjs on the shared skeleton (22 bones, the captain's T-pose; the
//      soldier's arms-down body is bound to it turned, so every clip fits every body)
//   4. writes captain_anim.glb and soldier_anim.glb: painted body + skeleton + clips
import { readFileSync, writeFileSync, readdirSync, statSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as THREE from '../../game/node_modules/three/build/three.module.js';
import { FBXLoader } from '../../game/node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { BONES, AIM, CLIPS, FPS, REACH } from './clips.mjs';

const here = dirname(fileURLToPath(import.meta.url)), MODELS = resolve(here, '../../game/public/models');
globalThis.window = globalThis; globalThis.self = globalThis; // (the FBX loader expects a browser)
const warn = console.warn; console.warn = () => {};
const fail = m => { console.error('FAILED: ' + m); process.exit(1); };
const PRE = 'mixamorig', short = n => n.replace(/^mixamorig:?/, '');
const V = (x, y, z) => new THREE.Vector3(x, y, z), Q = () => new THREE.Quaternion();

function openPack(p) {
  if (!p) fail('usage: node tools/models/prep.mjs <captain pack> <soldier pack>');
  if (statSync(p).isDirectory()) return p;
  const d = mkdtempSync(join(tmpdir(), 'rally-pack-')); execFileSync('unzip', ['-oq', p, '-d', d]); return d;
}
const loadFbx = f => { const b = readFileSync(f); return new FBXLoader().parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), ''); };
const bonesOf = o => { const m = {}; o.traverse(c => { if (c.isBone) m[short(c.name)] = c; }); return m; };

// ---- a pack: its body, checked
function readBody(dir, label) {
  const f = readdirSync(dir).find(n => /^white_mesh.*\.fbx$/i.test(n)); if (!f) fail(label + ': no white_mesh body in ' + dir);
  const o = loadFbx(join(dir, f)); o.updateMatrixWorld(true);
  let mesh = null; o.traverse(c => { if (c.isSkinnedMesh) mesh = c; }); if (!mesh) fail(label + ': the body has no skin');
  o.traverse(c => { if (c.isBone && !c.name.startsWith(PRE)) fail(label + ': bone not named mixamorig...: ' + c.name); });
  const B = bonesOf(o); for (const n of BONES) if (!B[n]) fail(label + ': the body lacks the bone ' + n);
  const wp = n => B[n].getWorldPosition(V()), wq = n => B[n].getWorldQuaternion(Q());
  mesh.geometry.computeBoundingBox(); const bb = mesh.geometry.boundingBox, height = bb.max.y - bb.min.y;
  if (Math.abs(o.scale.x - 1) > 1e-3 || Math.abs(mesh.scale.x - 1) > 1e-3) fail(label + ': the body is scaled (' + o.scale.x + ')');
  if (height < 1.5 || height > 2.5) fail(label + ': body height ' + height.toFixed(2) + ' (expected about 1.96: wrong scale?)');
  if (wp('Head').y - wp('Hips').y < .3) fail(label + ': not Y-up');
  if (wp('LeftToeBase').z - wp('LeftFoot').z < .05) fail(label + ': not facing +z');
  if (wp('LeftArm').x < wp('RightArm').x) fail(label + ': left and right are swapped');
  // where the hips are in the clips when the body stands as modelled (clips stand on the ground at y = 0)
  const ht = o.animations[0] && o.animations[0].tracks.find(t => /Hips\.position$/.test(t.name)); if (!ht) fail(label + ': the body has no rest clip');
  const clipHips = V(ht.values[0], ht.values[1], ht.values[2]), bindHips = wp('Hips');
  console.log(`${label}: body ok. height ${height.toFixed(2)}, ${mesh.geometry.attributes.position.count / 3} triangles, ${Object.keys(B).length} bones, hips ${clipHips.y.toFixed(3)} up in clips`);
  return { dir, label, o, mesh, B, wp, wq, off: clipHips.clone().sub(bindHips) };
}

// ---- the game's painted body (GLB): positions read, skin and clips added, written back out
function readGlb(f) {
  const b = readFileSync(f), jl = b.readUInt32LE(12), json = JSON.parse(b.subarray(20, 20 + jl).toString());
  const bin = b.subarray(20 + jl + 8, 20 + jl + 8 + b.readUInt32LE(20 + jl));
  const prim = json.meshes[0].primitives[0], acc = i => { const a = json.accessors[i], v = json.bufferViews[a.bufferView]; return { a, at: (v.byteOffset || 0) + (a.byteOffset || 0) }; };
  const P = acc(prim.attributes.POSITION), pos = new Float32Array(P.a.count * 3); for (let i = 0; i < pos.length; i++) pos[i] = bin.readFloatLE(P.at + i * 4);
  return { json, bin, pos, prim };
}
function writeGlb(src, out, { joints, ibm, skinIndex, skinWeight, clips }) {
  const json = JSON.parse(JSON.stringify(src.json)), parts = [Buffer.from(src.bin)]; let len = src.bin.length;
  const view = buf => { const pad = (4 - len % 4) % 4; if (pad) { parts.push(Buffer.alloc(pad)); len += pad; } json.bufferViews.push({ buffer: 0, byteOffset: len, byteLength: buf.byteLength }); parts.push(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)); len += buf.byteLength; return json.bufferViews.length - 1; };
  const acc = (arr, type, componentType, extra = {}) => { json.accessors.push({ bufferView: view(arr), componentType, type, count: arr.length / { SCALAR: 1, VEC3: 3, VEC4: 4, MAT4: 16 }[type], ...extra }); return json.accessors.length - 1; };
  const prim = json.meshes[0].primitives[0];
  prim.attributes.JOINTS_0 = acc(skinIndex, 'VEC4', 5121); prim.attributes.WEIGHTS_0 = acc(skinWeight, 'VEC4', 5126);
  const n0 = json.nodes.length, r = v => +v.toFixed(6);
  joints.forEach((j, i) => json.nodes.push({ name: j.name, translation: j.t.toArray().map(r), rotation: j.q.toArray().map(r), children: joints.map((c, k) => c.parent === i ? n0 + k : -1).filter(k => k >= 0) }));
  for (const n of json.nodes) if (n.children && !n.children.length) delete n.children;
  json.skins = [{ joints: joints.map((_, i) => n0 + i), skeleton: n0, inverseBindMatrices: acc(ibm, 'MAT4', 5126) }];
  const meshNode = json.nodes.findIndex(n => n.mesh === 0); json.nodes[meshNode].skin = 0; json.nodes[meshNode].name = 'body';
  json.scenes = [{ nodes: [meshNode, n0] }]; json.scene = 0;
  json.animations = clips.map(c => {
    const t = acc(c.times, 'SCALAR', 5126, { min: [0], max: [c.times[c.times.length - 1]] }), samplers = [], channels = [];
    const add = (node, path, output) => { samplers.push({ input: t, output, interpolation: 'LINEAR' }); channels.push({ sampler: samplers.length - 1, target: { node: n0 + node, path } }); };
    add(0, 'translation', acc(c.pos, 'VEC3', 5126));
    joints.forEach((j, i) => { const q = c.quat[i], s = new Int16Array(q.length); for (let k = 0; k < q.length; k++) s[k] = Math.round(Math.max(-1, Math.min(1, q[k])) * 32767); add(i, 'rotation', acc(s, 'VEC4', 5122, { normalized: true })); });
    return { name: c.name, samplers, channels };
  });
  json.asset = { ...json.asset, generator: 'rally tools/models/prep.mjs' };
  json.buffers = [{ byteLength: len }];
  let js = Buffer.from(JSON.stringify(json)); if (js.length % 4) js = Buffer.concat([js, Buffer.alloc(4 - js.length % 4, 32)]);
  const padB = (4 - len % 4) % 4; if (padB) { parts.push(Buffer.alloc(padB)); len += padB; }
  const head = Buffer.alloc(12); head.writeUInt32LE(0x46546c67, 0); head.writeUInt32LE(2, 4); head.writeUInt32LE(12 + 8 + js.length + 8 + len, 8);
  const h1 = Buffer.alloc(8); h1.writeUInt32LE(js.length, 0); h1.writeUInt32LE(0x4e4f534a, 4);
  const h2 = Buffer.alloc(8); h2.writeUInt32LE(len, 0); h2.writeUInt32LE(0x004e4942, 4);
  writeFileSync(out, Buffer.concat([head, h1, js, h2, ...parts]));
  return 12 + 8 + js.length + 8 + len;
}

// ---- skin moved from the pack body onto the painted body: each painted point takes the weights of
// the nearest point on the pack body's surface
function moveSkin(body, pos, label) {
  const g = body.mesh.geometry, P = g.attributes.position.array, SI = g.attributes.skinIndex.array, SW = g.attributes.skinWeight.array, nT = P.length / 9;
  const skel = body.mesh.skeleton.bones, core = skel.map(b => { let c = b; while (c && !BONES.includes(short(c.name))) c = c.parent; return c ? BONES.indexOf(short(c.name)) : 0; }); // (fingers and end bones fold into the nearest shared bone above them)
  const CELL = .04, grid = new Map(), key = (x, y, z) => x + ',' + y + ',' + z, c = v => Math.floor(v / CELL);
  for (let t = 0; t < nT; t++) {
    const o = t * 9, x0 = c(Math.min(P[o], P[o + 3], P[o + 6])), x1 = c(Math.max(P[o], P[o + 3], P[o + 6])), y0 = c(Math.min(P[o + 1], P[o + 4], P[o + 7])), y1 = c(Math.max(P[o + 1], P[o + 4], P[o + 7])), z0 = c(Math.min(P[o + 2], P[o + 5], P[o + 8])), z1 = c(Math.max(P[o + 2], P[o + 5], P[o + 8]));
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) { const k = key(x, y, z); let l = grid.get(k); if (!l) grid.set(k, l = []); l.push(t); }
  }
  const tri = new THREE.Triangle(), p = V(), cp = V(), bc = V(), n = pos.length / 3, sIdx = new Uint8Array(n * 4), sW = new Float32Array(n * 4); let worst = 0, sum = 0;
  for (let i = 0; i < n; i++) {
    p.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]); let best = 1e9, bt = -1; const bb = V();
    for (let r = 1; r <= 12 && (bt < 0 || best > (r - 1) * CELL); r++) {
      const cx = c(p.x), cy = c(p.y), cz = c(p.z);
      for (let x = cx - r; x <= cx + r; x++) for (let y = cy - r; y <= cy + r; y++) for (let z = cz - r; z <= cz + r; z++) {
        if (Math.max(Math.abs(x - cx), Math.abs(y - cy), Math.abs(z - cz)) !== r && r > 1) continue; // (only the new shell)
        const l = grid.get(key(x, y, z)); if (!l) continue;
        for (const t of l) { const o = t * 9; tri.a.set(P[o], P[o + 1], P[o + 2]); tri.b.set(P[o + 3], P[o + 4], P[o + 5]); tri.c.set(P[o + 6], P[o + 7], P[o + 8]); tri.closestPointToPoint(p, cp); const d = cp.distanceTo(p); if (d < best) { best = d; bt = t; tri.getBarycoord(cp, bc); bb.copy(bc); } }
      }
    }
    if (bt < 0) fail(label + ': painted body point ' + i + ' is nowhere near the pack body');
    worst = Math.max(worst, best); sum += best; if (process.env.DIST) (globalThis.__d = globalThis.__d || []).push([best, p.x, p.y, p.z]);
    const w = new Float32Array(BONES.length);
    for (let k = 0; k < 3; k++) { const v = bt * 3 + k, f = [bb.x, bb.y, bb.z][k]; for (let j = 0; j < 4; j++) w[core[SI[v * 4 + j]]] += f * SW[v * 4 + j]; }
    const top = [...w.keys()].filter(k => w[k] > 1e-4).sort((a, b) => w[b] - w[a]).slice(0, 4), tot = top.reduce((s, k) => s + w[k], 0) || 1;
    top.forEach((k, j) => { sIdx[i * 4 + j] = k; sW[i * 4 + j] = w[k] / tot; });
  }
  if (process.env.DIST) { const d = globalThis.__d.sort((a, b) => a[0] - b[0]); console.log("dist p50/p90/p99/max", [.5, .9, .99, 1].map(f => d[Math.min(d.length - 1, Math.floor(f * d.length))][0].toFixed(4)).join(" "), "far points", d.filter(x => x[0] > .03).length, d.slice(-6).map(x => x.map(v => +v.toFixed(2)).join("/")).join("  ")); globalThis.__d = []; }
  if (worst > .12) fail(`${label}: the painted body is not the pack body's shape (a point ${worst.toFixed(3)} away)`);
  console.log(`${label}: skin moved onto the painted body (${n} points; average ${(sum / n * 1000).toFixed(1)} mm from the pack body, worst ${(worst * 1000).toFixed(0)} mm)`);
  return { skinIndex: sIdx, skinWeight: sW };
}

// ---- the shared skeleton: the captain's, as modelled (T-pose), the 22 bones
function sharedRig(cap) {
  return BONES.map(n => { const b = cap.B[n]; return { name: n, parent: BONES.indexOf(short(b.parent.name || '')), q: b.quaternion.clone(), wq: cap.wq(n), wp: cap.wp(n) }; });
}
// a body on the shared skeleton: the turn (W) that takes each of the captain's bones to this body's as
// modelled, the bone lengths of this body, and the bind matrices. For the captain W is no turn at all.
function fitBody(body, rig, cap) {
  const same = body === cap, W = [], K = [], joints = [], ibm = new Float32Array(BONES.length * 16), m = new THREE.Matrix4(), one = V(1, 1, 1);
  const end = (b, n) => (b.B[AIM[n]] ? b.wp(AIM[n]) : null);
  BONES.forEach((n, i) => {
    const p = rig[i].parent, w = Q();
    if (!same && n !== 'Hips') {
      if (AIM[n] && end(cap, n) && end(body, n)) w.setFromUnitVectors(end(cap, n).sub(cap.wp(n)).normalize(), end(body, n).sub(body.wp(n)).normalize());
      else w.copy(W[p]); // (hands: as the forearm)
    }
    W.push(w); const bindQ = w.clone().multiply(rig[i].wq); // (this bone's turn in the world, as this body was modelled)
    K.push(body.wq(n).invert().multiply(bindQ));
    const t = p < 0 ? body.wp(n).add(body.off) : body.wp(n).sub(body.wp(BONES[p])).applyQuaternion(W[p].clone().multiply(rig[p].wq).invert());
    if (p < 0) t.y -= body.off.y; // (the game draws a man from his middle: clips are brought down by the same)
    joints.push({ name: n, parent: p, t, q: rig[i].q.clone() });
    m.compose(body.wp(n), bindQ, one).invert().toArray(ibm, i * 16);
  });
  return { joints, ibm, K };
}

// ---- one clip, sampled on its own pack's skeleton and brought onto the shared one
function readClip(body, fit, rig, def) {
  const f = join(body.dir, 'sword and shield ' + def.file + '.fbx'), alt = join(body.dir, def.file + '.fbx');
  let o; try { o = loadFbx(f); } catch (e) { try { o = loadFbx(alt); } catch (e2) { fail(`${body.label}: clip file missing: ${def.file}`); } }
  const B = bonesOf(o), clip = o.animations[0]; if (!clip) fail(`${body.label}: ${def.file} has no animation`);
  for (const n of BONES) if (!B[n]) fail(`${body.label}: ${def.file} lacks the bone ${n}`);
  for (const t of clip.tracks) if (!t.name.startsWith(PRE)) fail(`${body.label}: ${def.file} moves a bone not named mixamorig...: ${t.name}`);
  const mixer = new THREE.AnimationMixer(o); mixer.clipAction(clip).play();
  const N = Math.round(clip.duration * FPS), F = [], hand = V(), prev = V(); let peak = 0, peakI = 0;
  for (let i = 0; i <= N; i++) {
    mixer.setTime(Math.min(clip.duration - 1e-5, i / FPS)); o.updateMatrixWorld(true);
    B.RightHand.getWorldPosition(hand); if (i) { const v = hand.distanceTo(prev); if (v > peak) { peak = v; peakI = i; } } prev.copy(hand);
    F.push({ p: B.Hips.position.clone(), q: BONES.map(n => B[n].quaternion.clone()) });
  }
  if (Math.abs(F[0].p.y - body.off.y - body.wp('Hips').y) > .6) fail(`${body.label}: ${def.file} is at another scale (hips ${F[0].p.y.toFixed(2)} up)`);
  let a = 0, b = N;
  if (def.trim) { a = Math.max(0, peakI - Math.round(def.trim[0] * FPS)); b = Math.min(N, peakI + Math.round(def.trim[1] * FPS)); }
  const e = new THREE.Euler(), yawOf = q => e.setFromQuaternion(q, 'YXZ').y, trav = F[N].p.clone().sub(F[0].p), Y = V(0, 1, 0);
  let yaw = 0, lastYaw = yawOf(F[0].q[0]); const yaws = F.map(fr => { const y = yawOf(fr.q[0]); let d = y - lastYaw; d -= Math.round(d / (2 * Math.PI)) * 2 * Math.PI; yaw += d; lastYaw = y; return yaw; });
  const n = b - a + 1, times = new Float32Array(n), pos = new Float32Array(n * 3), quat = BONES.map(() => new Float32Array(n * 4)), last = BONES.map(() => null);
  for (let i = a; i <= b; i++) {
    const fr = F[i], k = i - a, p = fr.p.clone(), hq = fr.q[0].clone();
    if (def.root === 'loop') { p.x -= trav.x * i / N; p.z -= trav.z * i / N; }
    else if (def.root === 'anchor') { const c = v => Math.max(-REACH, Math.min(REACH, v)); p.x = F[0].p.x + c(fr.p.x - F[peakI].p.x); p.z = F[0].p.z + c(fr.p.z - F[peakI].p.z); }
    else if (def.root === 'unyaw') { p.x = F[0].p.x; p.z = F[0].p.z; hq.premultiply(Q().setFromAxisAngle(Y, -yaws[i])); }
    p.y -= body.off.y;
    times[k] = k / FPS; p.toArray(pos, k * 3);
    BONES.forEach((_, j) => {
      const pj = rig[j].parent, q = j === 0 ? hq.multiply(fit.K[0]) : fit.K[pj].clone().invert().multiply(fr.q[j]).multiply(fit.K[j]);
      q.normalize(); if (last[j] && last[j].dot(q) < 0) { q.x = -q.x; q.y = -q.y; q.z = -q.z; q.w = -q.w; } last[j] = q; q.toArray(quat[j], k * 4);
    });
  }
  const loopLen = Math.hypot(trav.x, trav.z);
  return { name: def.name, times, pos, quat, info: { name: def.name, dur: +((n - 1) / FPS).toFixed(3), hit: def.trim ? +((peakI - a) / FPS).toFixed(3) : undefined, stride: def.root === 'loop' && loopLen > .3 ? +loopLen.toFixed(2) : undefined, turn: def.root === 'unyaw' ? +yaws[N].toFixed(2) : undefined } };
}

const cap = readBody(openPack(process.argv[2]), 'captain pack'), sold = readBody(openPack(process.argv[3]), 'soldier pack');
const rig = sharedRig(cap), table = {};
for (const [body, srcName, outName] of [[cap, 'body_plain.glb', 'captain_anim.glb'], [sold, 'soldier.glb', 'soldier_anim.glb']]) {
  const src = readGlb(join(MODELS, srcName)), fit = fitBody(body, rig, cap), skin = moveSkin(body, src.pos, body.label);
  const clips = CLIPS.map(def => readClip(body, fit, rig, def));
  const bytes = writeGlb(src, join(MODELS, outName), { ...fit, ...skin, clips });
  console.log(`${body.label}: ${clips.length} clips checked and on the shared skeleton -> game/public/models/${outName} (${(bytes / 1024).toFixed(0)} KB)`);
  table[body.label] = clips.map(c => c.info);
}
console.log('\nClip table (captain pack; durations, the blow, ground covered per loop: these go in config.js ANIM):');
for (const c of table['captain pack']) console.log(' ', JSON.stringify(c));
console.warn = warn;
