// Small shared helpers for the map code: seeded random, angles, polylines.
export function mulberry(a) {
  return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
export const rnd = (a, b) => a + Math.random() * (b - a);
export const angDiff = (a, b) => { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
export const turn = (a, b, m) => a + clamp(angDiff(a, b), -m, m);
// polar point at angle a (radians, 0 = +x axis) and distance d
export const P = (a, d) => [Math.cos(a) * d, Math.sin(a) * d];
export function inPoly(pts, x, z) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, zi] = pts[i], [xj, zj] = pts[j]; if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) c = !c; } return c; }
// Distance from (x,z) to a polyline.
export function distToLine(pts, x, z) {
  let best = 1e9;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1], dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz || 1;
    const t = clamp(((x - ax) * dx + (z - az) * dz) / l2, 0, 1), px = ax + dx * t - x, pz = az + dz * t - z;
    const d = px * px + pz * pz; if (d < best) best = d;
  }
  return Math.sqrt(best);
}
// Smooths a coarse polyline (Chaikin) so roads and ridges curve.
export function smooth(pts, n = 2) {
  for (let k = 0; k < n; k++) {
    const o = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) { const [ax, az] = pts[i], [bx, bz] = pts[i + 1]; o.push([ax * .75 + bx * .25, az * .75 + bz * .25], [ax * .25 + bx * .75, az * .25 + bz * .75]); }
    o.push(pts[pts.length - 1]); pts = o;
  }
  return pts;
}
export const angNear = (a, targets, w) => targets.some(t => Math.abs(angDiff(a, t)) < w);
export const DIAG = [Math.PI / 4, 3 * Math.PI / 4, -3 * Math.PI / 4, -Math.PI / 4], AXES = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
