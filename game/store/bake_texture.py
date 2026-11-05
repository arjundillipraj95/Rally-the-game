"""Paint a generated (untextured) model from its turnaround sheet.

Usage: python3 -I bake_texture.py mesh.glb sheet.png out.glb [size]

The mesh is unwrapped (xatlas), then every texel of the new texture is looked up in the views
that can see it: front, back and the side view (used for both sides: the character is near enough
symmetric). Each view counts by how squarely the surface faces it, and only where that point is
the visible surface in that view (a depth test against the mesh itself), so the inside of an arm
doesn't take the colour of the arm in front of it. Background-coloured samples are discounted,
then the islands are padded so seams don't show.
"""
import sys
import numpy as np
import trimesh
import xatlas
from PIL import Image
from scipy import ndimage

mesh_path, sheet_path, out_path = sys.argv[1:4]
TS = int(sys.argv[4]) if len(sys.argv) > 4 else 1024

m = trimesh.load(mesh_path, force='mesh')
V = np.asarray(m.vertices, dtype=np.float64); F = np.asarray(m.faces)
# centre x on the torso (as the rig does), so the model and its texture line up with the skeleton
waist = V[(V[:, 1] > -.2) & (V[:, 1] < -.15)]
x0 = (waist[:, 0].min() + waist[:, 0].max()) / 2; V[:, 0] -= x0
# smooth away the sculpted eyes, brows and mouth on the front of the face: the painted ones carry the
# expression, and sculpted ones that don't line up with the paint read as a second set of features
nbr = [set() for _ in range(len(V))]
for a, b, c in F: nbr[a].update((b, c)); nbr[b].update((a, c)); nbr[c].update((a, b))
face = (V[:, 1] > .3) & (V[:, 1] < .82) & (V[:, 2] > .02)
fw = np.clip((V[:, 2] - .02) / .12, 0, 1) * face  # (more toward the front of the face, nothing at the sides)
for _ in range(10):
    avg = np.array([V[list(n)].mean(0) if n else V[i] for i, n in enumerate(nbr)])
    V = V + (avg - V) * (.6 * fw)[:, None]
sheet = np.asarray(Image.open(sheet_path).convert('RGB')).astype(np.float32)
SH, SW = sheet.shape[:2]
bg = np.median(np.concatenate([sheet[:10].reshape(-1, 3), sheet[-10:].reshape(-1, 3)]), axis=0)

# where each view's figure sits on the sheet (left, top, right, bottom), from the cropped views
FIG = {'front': (15, 130, 502, 759), 'side': (581, 128, 794, 759), 'back': (838, 128, 1352, 759)}
lo, hi = V.min(0), V.max(0)
ADJ = {v: (1., 1., 0., 0.) for v in FIG}  # (scale x, scale y, shift x, shift y) about the figure's centre
def proj(view, P):
    """sheet pixel (px, py) and depth (bigger = nearer that view's camera) for points P"""
    l, t, r, b = FIG[view]; sx, sy, ox, oy = ADJ[view]; cx, cy = (l + r) / 2, (t + b) / 2
    py = t + (hi[1] - P[:, 1]) / (hi[1] - lo[1]) * (b - t)
    if view == 'front': px = l + (P[:, 0] - lo[0]) / (hi[0] - lo[0]) * (r - l); d = P[:, 2]
    elif view == 'back': px = l + (hi[0] - P[:, 0]) / (hi[0] - lo[0]) * (r - l); d = -P[:, 2]
    else: px = l + (hi[2] - P[:, 2]) / (hi[2] - lo[2]) * (r - l); d = np.abs(P[:, 0])  # (side: face to the left)
    return cx + (px - cx) * sx + ox, cy + (py - cy) * sy + oy, d

def raster(tri2d, cb, W, H):
    """call cb(ys, xs, bary) for the integer pixels inside a 2D triangle"""
    (x1, y1), (x2, y2), (x3, y3) = tri2d
    xmin, xmax = int(max(0, np.floor(min(x1, x2, x3)))), int(min(W - 1, np.ceil(max(x1, x2, x3))))
    ymin, ymax = int(max(0, np.floor(min(y1, y2, y3)))), int(min(H - 1, np.ceil(max(y1, y2, y3))))
    if xmax < xmin or ymax < ymin: return
    xs, ys = np.meshgrid(np.arange(xmin, xmax + 1) + .5, np.arange(ymin, ymax + 1) + .5)
    den = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3)
    if abs(den) < 1e-12: return
    a = ((y2 - y3) * (xs - x3) + (x3 - x2) * (ys - y3)) / den
    b2 = ((y3 - y1) * (xs - x3) + (x1 - x3) * (ys - y3)) / den
    c = 1 - a - b2; inside = (a >= -1e-4) & (b2 >= -1e-4) & (c >= -1e-4)
    if inside.any(): cb((ys[inside] - .5).astype(int), (xs[inside] - .5).astype(int), np.stack([a[inside], b2[inside], c[inside]], 1))

# the picture's figure (not background), and for each pixel the nearest figure pixel (to pull edge samples inside)
fig = np.abs(sheet - bg).sum(2) > 30
fig = ndimage.binary_fill_holes(ndimage.binary_opening(fig, iterations=1))  # (the armour's shine is background-grey: still figure)
inner = ndimage.binary_erosion(fig, iterations=3)
_, (NIY, NIX) = ndimage.distance_transform_edt(~inner, return_indices=True)

def mesh_mask(view):
    M = np.zeros((SH, SW), bool); px, py, _ = proj(view, V)
    for f in F:
        def put(ys, xs, bc): M[ys, xs] = True
        raster([(px[f[0]], py[f[0]]), (px[f[1]], py[f[1]]), (px[f[2]], py[f[2]])], put, SW, SH)
    return M
# line each view up: try small scales and shifts, keep the one whose outline best matches the picture's
for view in FIG:
    l, t, r, b = FIG[view]; box = (slice(t - 20, b + 20), slice(max(0, l - 20), r + 20)); target = fig[box]
    best = (-1, ADJ[view])
    for sx in (.94, .97, 1., 1.03, 1.06):
        for sy in (.96, .98, 1., 1.02, 1.04):
            ADJ[view] = (sx, sy, 0., 0.); M = mesh_mask(view)[box]
            for ox in range(-10, 11, 2):
                for oy in range(-24, 25, 2):
                    Ms = np.roll(np.roll(M, oy, 0), ox, 1); iou = (Ms & target).sum() / max(1, (Ms | target).sum())
                    if iou > best[0]: best = (iou, (sx, sy, float(ox), float(oy)))
    ADJ[view] = best[1]; print(view, 'aligned', best[1], 'overlap %.3f' % best[0])

# depth maps per view (the nearest surface at each sheet pixel), from the mesh itself
depth = {}
for view in FIG:
    D = np.full((SH, SW), -1e9, np.float32)
    px, py, d = proj(view, V)
    for f in F:
        def put(ys, xs, bc, f=f):
            z = bc @ d[f]; np.maximum.at(D, (ys, xs), z.astype(np.float32))
        raster([(px[f[0]], py[f[0]]), (px[f[1]], py[f[1]]), (px[f[2]], py[f[2]])], put, SW, SH)
    depth[view] = D

# unwrap, and per-vertex normals for the new layout
vmap, NF, UV = xatlas.parametrize(V.astype(np.float32), F.astype(np.uint32))
NV = V[vmap]; vn = trimesh.Trimesh(V, F, process=False).vertex_normals[vmap]
DIRS = {'front': np.array([0, 0, 1.]), 'back': np.array([0, 0, -1.])}

def sample(px, py):
    xi = np.clip(px.astype(int), 0, SW - 1); yi = np.clip(py.astype(int), 0, SH - 1)
    out = ~inner[yi, xi]; px = np.where(out, NIX[yi, xi] + .5, px); py = np.where(out, NIY[yi, xi] + .5, py)  # (edge samples: from just inside the figure)
    x = np.clip(px, 0, SW - 1.001); y = np.clip(py, 0, SH - 1.001); x0_, y0_ = np.floor(x).astype(int), np.floor(y).astype(int); fx, fy = (x - x0_)[:, None], (y - y0_)[:, None]
    return (sheet[y0_, x0_] * (1 - fx) * (1 - fy) + sheet[y0_, x0_ + 1] * fx * (1 - fy) + sheet[y0_ + 1, x0_] * (1 - fx) * fy + sheet[y0_ + 1, x0_ + 1] * fx * fy)

tex = np.zeros((TS, TS, 3), np.float32); filled = np.zeros((TS, TS), bool)
for f in NF:
    uvp = [(UV[i, 0] * TS, (1 - UV[i, 1]) * TS) for i in f]
    def paint(ys, xs, bc, f=f):
        P = bc @ NV[f]; N = bc @ vn[f]; N /= np.linalg.norm(N, axis=1, keepdims=True) + 1e-9
        acc = np.zeros((len(P), 3)); wsum = np.zeros(len(P)); best = np.zeros((len(P), 3)); bestw = np.full(len(P), -1.)
        for view in FIG:
            if view == 'side': face = np.abs(N[:, 0])
            else: face = N @ DIRS[view]
            px, py, d = proj(view, P)
            col = sample(px, py)
            vis = np.abs(depth[view][np.clip(py.astype(int), 0, SH - 1), np.clip(px.astype(int), 0, SW - 1)] - d) < .04
            isbg = ~fig[np.clip(py.astype(int), 0, SH - 1), np.clip(px.astype(int), 0, SW - 1)]  # (only real background, not grey inside the figure)
            w = np.clip(face, 0, 1) ** 8 * vis * np.where(isbg, .02, 1)  # (steep: each spot mostly from the view that faces it, so features don't double)
            acc += col * w[:, None]; wsum += w
            fb = np.clip(face, 0, 1) * np.where(isbg, .1, 1); better = fb > bestw; best[better] = col[better]; bestw[better] = fb[better]
        c = np.where(wsum[:, None] > 1e-4, acc / np.maximum(wsum, 1e-9)[:, None], best)
        tex[ys, xs] = c; filled[ys, xs] = True
    raster(uvp, paint, TS, TS)

# pad the islands outward so filtering at the seams doesn't pull in black
for _ in range(8):
    nb = np.zeros_like(tex); cnt = np.zeros((TS, TS))
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        sh = np.roll(np.roll(tex, dy, 0), dx, 1); sf = np.roll(np.roll(filled, dy, 0), dx, 1)
        nb += sh * sf[..., None]; cnt += sf
    grow = (~filled) & (cnt > 0); tex[grow] = nb[grow] / cnt[grow][:, None]; filled |= grow
tex[~filled] = bg

img = Image.fromarray(np.clip(tex, 0, 255).astype(np.uint8))
out = trimesh.Trimesh(NV + np.array([x0, 0, 0]), NF, process=False)  # (back to the original x, as the rig re-centres)
out.visual = trimesh.visual.TextureVisuals(uv=UV, image=img, material=trimesh.visual.material.PBRMaterial(baseColorTexture=img, metallicFactor=0., roughnessFactor=.85))
out.vertex_normals = vn  # (normals from the unsplit surface: smooth across the texture seams)
out.export(out_path)
img.save(out_path.rsplit('.', 1)[0] + '_tex.png')
print('vertices', len(NV), 'faces', len(NF), 'texture', TS)
