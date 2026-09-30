// Ridges on the big maps: long banks of boulders that wall off routes. One instanced mesh of
// faceted rock per map; each boulder is tinted by a palette (moss on top in the valley, snow on the
// frost map, pale sandstone in the desert). Boulders between the camera and your captain fade.
import * as THREE from 'three';
import { terrainMeshY, mulberry } from '../core/world.js';
import { stoneTex } from './look.js';
import { seeThrough } from './seethrough.js';

const PAL = {
  rock: { base: 0x9a948a, top: 0x6f9244, topAt: .35 },
  snow: { base: 0x8d939b, top: 0xf6f9fc, topAt: .2 },
  sand: { base: 0xc0925c, top: 0xe0c08c, topAt: .5, flat: true },
};

// a lumpy rock: an icosahedron with its vertices pushed about, coloured by how much each face looks up
function rockGeo(pal, seed) {
  const R = mulberry(seed), g = new THREE.IcosahedronGeometry(1, 1), p = g.attributes.position;
  const bump = new Map();
  for (let i = 0; i < p.count; i++) {
    const key = `${p.getX(i).toFixed(3)},${p.getY(i).toFixed(3)},${p.getZ(i).toFixed(3)}`;
    if (!bump.has(key)) bump.set(key, .8 + R() * .4);
    const k = bump.get(key); let y = p.getY(i) * k;
    if (pal.flat && y > .45) y = .45 + (y - .45) * .25; // sandstone: flat-topped, like a small mesa
    p.setXYZ(i, p.getX(i) * k, y, p.getZ(i) * k);
  }
  g.computeVertexNormals();
  const n = g.attributes.normal, base = new THREE.Color(pal.base), top = new THREE.Color(pal.top), c = new THREE.Color(), cs = [];
  for (let i = 0; i < n.count; i++) { const up = n.getY(i); c.copy(base).lerp(top, up > pal.topAt ? Math.min(1, (up - pal.topAt) * 2.6) : 0); cs.push(c.r, c.g, c.b); }
  g.setAttribute('color', new THREE.Float32BufferAttribute(cs, 3));
  return g;
}

export function buildRidges(world, L) {
  const byKind = {};
  for (const g of L.ridges) (byKind[g.kind] = byKind[g.kind] || []).push(g);
  const R = mulberry(515);
  for (const [kind, list] of Object.entries(byKind)) {
    const pal = PAL[kind]; if (!pal) continue;
    const rocks = [];
    for (const g of list) for (let i = 0; i < g.pts.length - 1; i++) {
      const [ax, az] = g.pts[i], [bx, bz] = g.pts[i + 1], len = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.round(len / (g.w * .75)));
      const nx = -(bz - az) / len, nz = (bx - ax) / len;
      for (let k = 0; k < n; k++) {
        const t = (k + R()) / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t;
        const w = g.w * (.8 + R() * .35), h = g.h * (.55 + R() * .5);
        rocks.push([x, z, w, h, R() * 6.28]);
        // lower shoulders either side, so the ridge has a foot rather than a sheer wall
        if (R() < .35) { const s = R() < .5 ? -1 : 1, o = g.w * .55; rocks.push([x + nx * o * s, z + nz * o * s, g.w * (.5 + R() * .25), g.h * (.3 + R() * .2), R() * 6.28]); }
      }
    }
    const geos = [rockGeo(pal, 11), rockGeo(pal, 23), rockGeo(pal, 37)];
    const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, map: stoneTex(), vertexColors: true, flatShading: true });
    const mx = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), tint = new THREE.Color();
    geos.forEach((geo, gi) => {
      const mine = rocks.filter((_, i) => i % 3 === gi); if (!mine.length) return;
      const im = new THREE.InstancedMesh(geo, mat, mine.length);
      mine.forEach(([x, z, w, h, ry], i) => {
        e.set((R() - .5) * .25, ry, (R() - .5) * .25); q.setFromEuler(e);
        mx.compose(v.set(x, terrainMeshY(x, z) + h * .25, z), q, s.set(w, h * .72, w * (.85 + R() * .3))); im.setMatrixAt(i, mx);
        im.setColorAt(i, tint.setScalar(.86 + R() * .2));
      });
      im.castShadow = true; im.receiveShadow = true; world.add(im);
      seeThrough(im, mine.map(([x, z, w]) => ({ x, z, r: w })));
    });
  }
}
