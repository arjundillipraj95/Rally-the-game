"""Paint a generated (untextured) model from its turnaround sheet.

Usage: python3 -I bake_texture.py mesh.glb sheet.png out.glb [size] [figures-json]
(figures-json: {"front": [l, t, r, b], "side": [...], "back": [...]}, where each view sits on the sheet)

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
import os
ITEM = os.environ.get('BAKE_KIND') == 'item'  # (armour, weapons, helmets: no head or face rules)

m = trimesh.load(mesh_path, force='mesh')
V = np.asarray(m.vertices, dtype=np.float64); F = np.asarray(m.faces)
# centre x on the torso (as the rig does), so the model and its texture line up with the skeleton
waist = V[(V[:, 1] > -.2) & (V[:, 1] < -.15)]
x0 = (waist[:, 0].min() + waist[:, 0].max()) / 2; V[:, 0] -= x0
# the head: smoothed evenly all over (Taubin: a pass that smooths, then one that swells back, so it
# keeps its size and shape: cheeks, chin, nose) to take out the small sculpted creases (eye sockets,
# mouth lines) that fight the painted features. All over, not just the face: no rim, no flat plate.
NEWHEAD = os.environ.get('BAKE_NEWHEAD') == '1'
if not ITEM:
    nbr = [set() for _ in range(len(V))]
    for a, b, c in F: nbr[a].update((b, c)); nbr[b].update((a, c)); nbr[c].update((a, b))
    hw = np.clip((V[:, 1] - .24) / .08, 0, 1) * (np.abs(V[:, 0]) < .46)
    for it in range(30):
        avg = np.array([V[list(n)].mean(0) if n else V[i] for i, n in enumerate(nbr)])
        V = V + (avg - V) * ((.5 if it % 2 == 0 else -.53) * hw)[:, None]
    sk = V[(V[:, 1] > .6) & (np.abs(V[:, 0]) < .34)]
    HC = np.array([0., (V[:, 1].max() + .3) / 2, (sk[:, 2].max() + sk[:, 2].min()) / 2])
    HR = np.array([np.percentile(np.abs(sk[:, 0]), 99), V[:, 1].max() - HC[1], (sk[:, 2].max() - sk[:, 2].min()) / 2])
    print('head', HC.round(3), HR.round(3))
sheet = np.asarray(Image.open(sheet_path).convert('RGB')).astype(np.float32)
SH, SW = sheet.shape[:2]
bg = np.median(np.concatenate([sheet[:10].reshape(-1, 3), sheet[-10:].reshape(-1, 3)]), axis=0)

# where each view's figure sits on the sheet (left, top, right, bottom), from the cropped views
FIG = {'front': (15, 130, 502, 759), 'side': (581, 128, 794, 759), 'back': (838, 128, 1352, 759)}
if len(sys.argv) > 5:
    import json; FIG = {k: tuple(v) for k, v in json.loads(sys.argv[5]).items()}
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
inner = ndimage.binary_erosion(fig, iterations=3)  # (keep clear of the picture's outline shading)
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

# the face, rebuilt to match the picture: from just above the brows to the chin, the generated surface
# (its sculpted eyes, snout-like nose and mouth) is replaced by the smoothest surface that carries on
# the curve of the cheeks and forehead around it (a biharmonic fill: round, not flat), then a small
# round nose is added exactly where the picture's nose is. Picture rows (FACE_ROWS, sheet pixels):
# brow top, nose tip, chin; and the nose's column.
if not ITEM and os.environ.get('BAKE_FACE'):
    import json as _j; FR = _j.loads(os.environ['BAKE_FACE'])
    def model_y(py):  # (the model height that lands on this picture row, front view)
        ys = np.linspace(-1, 1, 4001); _, pys, _ = proj('front', np.stack([np.zeros_like(ys), ys, np.zeros_like(ys)], 1)); return float(ys[np.argmin(np.abs(pys - py))])
    def model_x(px):
        xs = np.linspace(-1, 1, 4001); pxs, _, _ = proj('front', np.stack([xs, np.full_like(xs, .5), np.zeros_like(xs)], 1)); return float(xs[np.argmin(np.abs(pxs - px))])
    y_top, y_nose, y_chin, x_nose = model_y(FR['brow']), model_y(FR['nose']), model_y(FR['chin']), model_x(FR['nosex'])
    print('face rows: brow %.3f nose %.3f chin %.3f nose x %.3f' % (y_top, y_nose, y_chin, x_nose))
    from scipy import sparse
    from scipy.sparse.linalg import spsolve
    nb2 = [set() for _ in range(len(V))]
    for a, b, c in F: nb2[a].update((b, c)); nb2[b].update((a, c)); nb2[c].update((a, b))
    front = V[:, 2] > HC[2] + .1
    R = front & (V[:, 1] < y_top) & (V[:, 1] > y_chin - .05) & (np.abs(V[:, 0]) < .26)
    free = np.where(R)[0]; idx = -np.ones(len(V), int); idx[free] = np.arange(len(free))
    # uniform Laplacian on the region and its rim; minimise |L x|^2 with everything outside the region held
    ring = set(free.tolist()); [ring.update(nb2[i]) for i in free.tolist()]; rows = sorted(ring)
    Lr, Lc, Lv = [], [], []
    for r_, i in enumerate(rows):
        n = list(nb2[i]); Lr += [r_] * (len(n) + 1); Lc += [i] + n; Lv += [1.] + [-1. / len(n)] * len(n)
    L = sparse.csr_matrix((Lv, (Lr, Lc)), shape=(len(rows), len(V)))
    Lf, Lk = L[:, free], L[:, np.where(~R)[0]]
    A = (Lf.T @ Lf).tocsc()
    for k in range(3):
        bvec = -(Lf.T @ (Lk @ V[~R, k]))
        V[free, k] = spsolve(A, bvec)
    # the nose: a small round bump where the picture's nose is
    nose = .075 * np.exp(-(((V[:, 0] - x_nose) / .058) ** 2 + ((V[:, 1] - y_nose) / .052) ** 2) / 2) * front
    V[:, 2] += nose
    print('face rebuilt:', len(free), 'points')

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

# the head's centre and hairline (elevation in radians from that centre: at the front, the sides, the back)
HEAD_C = HC if not ITEM else np.array([0, .62, -.02]); HEAD_Y0 = .27; HAIR_FRONT, HAIR_BACK = .5, -.95
_, HAIR_LOW_PY, _ = proj('back', np.array([[0, .44, -.3]])); HAIR_LOW_PY = float(HAIR_LOW_PY[0])
_, HAIR_LOW_SPY, _ = proj('side', np.array([[.3, .62, -.25]])); HAIR_LOW_SPY = float(HAIR_LOW_SPY[0])
# skin colour: the typical colour of the front picture's face (brows, eyes and mouth left out)
_fp = V[(V[:, 1] > .38) & (V[:, 1] < .62) & (np.abs(V[:, 0]) < .26) & (V[:, 2] > .05)] if not ITEM else V[:1]
_px, _py, _ = proj('front', _fp); _c = sheet[np.clip(_py.astype(int), 0, SH - 1), np.clip(_px.astype(int), 0, SW - 1)]
_l = _c.sum(1); SKIN = np.median(_c[_l > np.median(_l) * .9], axis=0); print('skin', SKIN.round())
_hp = V[(V[:, 1] > .8) & (V[:, 2] < HC[2])] if not ITEM else V[:1]; _hx, _hy, _ = proj('back', _hp); HAIR_AVG = np.median(sheet[np.clip(_hy.astype(int), 0, SH - 1), np.clip(_hx.astype(int), 0, SW - 1)], axis=0); HAIR_LUM = HAIR_AVG.sum()
INTERIOR = np.array([46., 40., 36.]); ZMID = (V[:, 2].max() + V[:, 2].min()) / 2  # (inside an item, where no picture sees: dark)

# unwrap, and per-vertex normals for the new layout
vmap, NF, UV = xatlas.parametrize(V.astype(np.float32), F.astype(np.uint32))
NV = V[vmap]; vn = trimesh.Trimesh(V, F, process=False).vertex_normals[vmap]
DIRS = {'front': np.array([0, 0, 1.]), 'back': np.array([0, 0, -1.])}

def sample(px, py):
    xi = np.clip(px.astype(int), 0, SW - 1); yi = np.clip(py.astype(int), 0, SH - 1)
    out = ~inner[yi, xi]; px = np.where(out, NIX[yi, xi] + .5, px); py = np.where(out, NIY[yi, xi] + .5, py)  # (edge samples: from just inside the figure)
    x = np.clip(px, 0, SW - 1.001); y = np.clip(py, 0, SH - 1.001); x0_, y0_ = np.floor(x).astype(int), np.floor(y).astype(int); fx, fy = (x - x0_)[:, None], (y - y0_)[:, None]
    return (sheet[y0_, x0_] * (1 - fx) * (1 - fy) + sheet[y0_, x0_ + 1] * fx * (1 - fy) + sheet[y0_ + 1, x0_] * (1 - fx) * fy + sheet[y0_ + 1, x0_ + 1] * fx * fy)

def head_colour(P, N):
    """the head, painted by rule: hair above a smooth hairline (forehead, past the ears, down to the nape)
    from the pictures' hair; skin below; the features from the front picture where they differ from skin"""
    d = P - HEAD_C; d /= np.linalg.norm(d, axis=1, keepdims=True) + 1e-9
    el = np.arcsin(np.clip(d[:, 1], -1, 1)); az = np.abs(np.arctan2(d[:, 0], d[:, 2])) / np.pi  # (0 front, 1 back)
    line = np.interp(az, [0, .14, .2, .25, .32, .45, .65, .85, 1], [HAIR_FRONT, .46, .34, .14, .02, -.1, -.5, -.72, -.76])  # (a soft turn at the temple, short sideburns to the top of the ear, a rounded nape)  # (the hair comes down the temples to the ears, as in the picture)
    hairw = np.clip((el - line) / .09 + .5, 0, 1) * np.clip((.36 - np.abs(P[:, 0])) / .04, 0, 1)  # (the ears stay skin; a soft hairline)
    # the hair, painted by rule (the captain mostly wears a helmet, so it's a clean short cut whose edges
    # show tidily under one): the picture's hair colour, fine strands combed out from the crown, a little
    # darker toward the hairline
    crown = np.array([0., 1., -.25]); crown /= np.linalg.norm(crown)
    tang = d - crown * (d @ crown)[:, None]; tang /= np.linalg.norm(tang, axis=1, keepdims=True) + 1e-9
    ref = np.cross(crown, [1., 0, 0]); ref /= np.linalg.norm(ref)
    ang = np.arctan2(tang @ np.cross(crown, ref), tang @ ref)  # (angle round the crown: strands run outward from it)
    q = np.round(P * 160).astype(np.int64); rnd = ((q[:, 0] * 73856093) ^ (q[:, 1] * 19349663) ^ (q[:, 2] * 83492791)) % 1000 / 1000.
    strand = .5 + .5 * np.sin(ang * 140 + rnd * 4.0) * (.6 + .4 * np.sin(ang * 23 + el * 9))  # (fine, irregular strands)
    edge = np.clip((el - line) / .25, 0, 1)
    hair = HAIR_AVG[None, :] * (.9 + .07 * strand + .05 * rnd)[:, None] * (.86 + .14 * edge)[:, None]
    fx, fy, _ = proj('front', P); feat = sample(fx, fy)
    fw = np.clip((N[:, 2] - .45) / .2, 0, 1) * (1 - hairw) * np.clip((P[:, 1] - .32) / .04, 0, 1) * np.clip((.3 - np.abs(P[:, 0])) / .06, 0, 1) * np.clip((.71 - P[:, 1]) / .03, 0, 1)  # (the picture's features stop above the brows: its hairline stays out)
    fw = fw * np.clip((np.abs(feat - SKIN).sum(1) - 30) / 45, 0, 1)  # (only what differs from skin: brows, eyes, nose shading, mouth)
    skin = SKIN * (1 - fw[:, None]) + feat * fw[:, None]
    return hair * hairw[:, None] + skin * (1 - hairw[:, None])

tex = np.zeros((TS, TS, 3), np.float32); filled = np.zeros((TS, TS), bool)
for f in NF:
    uvp = [(UV[i, 0] * TS, (1 - UV[i, 1]) * TS) for i in f]
    def paint(ys, xs, bc, f=f):
        P = bc @ NV[f]; N = bc @ vn[f]; N /= np.linalg.norm(N, axis=1, keepdims=True) + 1e-9
        # the front of the head (face and cheeks, up to the ears) is painted from the front picture only
        # (the face itself, eased in toward the front so there's no hard line on the cheek or the hair)
        facepart = (not ITEM) * np.clip((P[:, 2] - .04) / .1, 0, 1) * np.clip((N[:, 2] - .3) / .25, 0, 1) * np.clip((P[:, 1] - .28) / .06, 0, 1) * np.clip((.66 - P[:, 1]) / .08, 0, 1)  # (only where the face really faces forward: the cheeks come from the side view, not the front one stretched)
        acc = np.zeros((len(P), 3)); wsum = np.zeros(len(P)); best = np.zeros((len(P), 3)); bestw = np.full(len(P), -1.)
        for view in FIG:
            if view == 'side': face = np.abs(N[:, 0]) * (1 - facepart)  # (the side picture's profile eye must not land on the cheek)
            else: face = (N @ DIRS[view]) * (np.clip(((N @ DIRS[view]) - .15) / .35, 0, 1) if view == 'front' else 1)  # (no front paint stretched round the sides)
            px, py, d = proj(view, P)
            col = sample(px, py)
            vis = np.abs(depth[view][np.clip(py.astype(int), 0, SH - 1), np.clip(px.astype(int), 0, SW - 1)] - d) < .04
            isbg = ~fig[np.clip(py.astype(int), 0, SH - 1), np.clip(px.astype(int), 0, SW - 1)]  # (only real background, not grey inside the figure)
            w = np.clip(face, 0, 1) ** 8 * vis * np.where(isbg, .02, 1)  # (steep: each spot mostly from the view that faces it, so features don't double)
            acc += col * w[:, None]; wsum += w
            fb = np.clip(face, 0, 1) * np.where(isbg, .1, 1); better = fb > bestw; best[better] = col[better]; bestw[better] = fb[better]
        seen = wsum > 1e-4
        # unseen by every picture: an item's insides (surfaces facing in toward its middle) dark; anything
        # else (tops of shoulders, undersides) takes the best view it has
        inward = ((N[:, 0] * P[:, 0] + N[:, 2] * (P[:, 2] - ZMID)) < 0) & (np.abs(N[:, 1]) < .7)
        c = np.where(seen[:, None], acc / np.maximum(wsum, 1e-9)[:, None], np.where((inward & ITEM)[:, None], INTERIOR, best))
        if not ITEM:  # (the fists: skin, as in the pictures)
            hand = np.clip((np.abs(P[:, 0]) - .62) / .04, 0, 1) * ((P[:, 1] > -.2) & (P[:, 1] < .2))
            c = c * (1 - hand[:, None]) + SKIN * .96 * hand[:, None]
        # under the chin and jaw (facing down, seen by no picture): skin, fading in by how far it faces down
        under = np.clip((-N[:, 1] - .25) / .35, 0, 1) * ((P[:, 1] > .22) & (P[:, 1] < .5)) * (not ITEM)
        c = c * (1 - under[:, None]) + SKIN * under[:, None]
        # the head, painted by rule (projected pictures never line up at the face's edges or the hairline):
        # hair above a smooth hairline (forehead, past the ears, down to the nape), from the back picture's
        # hair; skin below; the features from the front picture only where the face looks straight ahead
        head = (P[:, 1] > HEAD_Y0) & (np.abs(P[:, 0]) < .5) & (not ITEM)
        if head.any(): c[head] = head_colour(P[head], N[head])
        if not ITEM: seen = seen | head
        tex[ys, xs] = c; filled[ys, xs] = seen if not ITEM else True  # (the body: unseen spots are filled from their seen neighbours below)
    raster(uvp, paint, TS, TS)

# pad the islands outward so filtering at the seams doesn't pull in black
for _ in range(8 if ITEM else 30):
    nb = np.zeros_like(tex); cnt = np.zeros((TS, TS))
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        sh = np.roll(np.roll(tex, dy, 0), dx, 1); sf = np.roll(np.roll(filled, dy, 0), dx, 1)
        nb += sh * sf[..., None]; cnt += sf
    grow = (~filled) & (cnt > 0); tex[grow] = nb[grow] / cnt[grow][:, None]; filled |= grow
tex[~filled] = bg

img = Image.fromarray(np.clip(tex, 0, 255).astype(np.uint8))
parts = []
if not ITEM and NEWHEAD:
    # a clean head: an ellipsoid the size of the generated skull, the jaw easing in toward a soft chin
    nla, nlo = 40, 64
    th = np.linspace(0, np.pi, nla + 1); ph = np.linspace(0, 2 * np.pi, nlo + 1)
    TH, PH = np.meshgrid(th, ph, indexing='ij')
    def head_point(TH, PH):
        u = np.stack([np.sin(TH) * np.sin(PH), np.cos(TH), np.sin(TH) * np.cos(PH)], -1)  # (PH 0: the front, +z)
        jaw = 1 - .2 * np.clip(-u[..., 1], 0, 1) ** 1.6  # (narrower toward the chin)
        return HC + u * HR * np.stack([jaw, np.ones_like(jaw), jaw], -1)
    HP = head_point(TH, PH)
    hv = HP.reshape(-1, 3); huv = np.stack([PH / (2 * np.pi), 1 - TH / np.pi], -1).reshape(-1, 2)
    hf = []
    for i in range(nla):
        for j in range(nlo):
            a, b, c2, d2 = i * (nlo + 1) + j, i * (nlo + 1) + j + 1, (i + 1) * (nlo + 1) + j, (i + 1) * (nlo + 1) + j + 1
            if i > 0: hf.append((a, c2, b))
            if i < nla - 1: hf.append((b, c2, d2))
    hmesh = trimesh.Trimesh(hv, np.array(hf), process=False)
    hn = hmesh.vertex_normals
    # its texture, painted texel by texel by the head rule
    HT_W, HT_H = 1024, 512
    tu, tv = np.meshgrid((np.arange(HT_W) + .5) / HT_W, (np.arange(HT_H) + .5) / HT_H)
    TT, PP = (tv * np.pi).reshape(-1), (tu * 2 * np.pi).reshape(-1)
    Pt = head_point(TT, PP); e = 1e-3
    Nt = np.cross(head_point(TT, PP + e) - head_point(TT, PP - e), head_point(TT + e, PP) - head_point(TT - e, PP)); Nt /= np.linalg.norm(Nt, axis=1, keepdims=True) + 1e-9
    Nt *= np.sign(((Pt - HC) * Nt).sum(1, keepdims=True))
    htex = head_colour(Pt, Nt).reshape(HT_H, HT_W, 3)
    himg = Image.fromarray(np.clip(htex, 0, 255).astype(np.uint8))
    hmesh.vertices += np.array([x0, 0, 0])
    hmesh.visual = trimesh.visual.TextureVisuals(uv=huv, image=himg, material=trimesh.visual.material.PBRMaterial(baseColorTexture=himg, metallicFactor=0., roughnessFactor=.8))
    parts.append(('head', hmesh))
    # ears: small flattened rounds at the sides, skin
    for sgn in (-1, 1):
        ear = trimesh.creation.uv_sphere(radius=1, count=[12, 16]); ear.vertices *= np.array([.05, .1, .075])
        ear.vertices += np.array([sgn * (HR[0] * .97) + x0, HC[1] - .07, HC[2] - .02])
        ear.visual = trimesh.visual.ColorVisuals(ear, vertex_colors=np.tile(np.r_[SKIN * .97, 255].astype(np.uint8), (len(ear.vertices), 1)))
        parts.append(('ear', ear))
    # tuck the generated head away inside the new one
    hid = (NV[:, 1] > .3) & (np.abs(NV[:, 0]) < .46)
    NV[hid] = HC + (NV[hid] - HC) * .55
    img.save(out_path.rsplit('.', 1)[0] + '_head.png') if False else himg.save(out_path.rsplit('.', 1)[0] + '_head.png')
out = trimesh.Trimesh(NV + np.array([x0, 0, 0]), NF, process=False)  # (back to the original x, as the rig re-centres)
out.visual = trimesh.visual.TextureVisuals(uv=UV, image=img, material=trimesh.visual.material.PBRMaterial(baseColorTexture=img, metallicFactor=0., roughnessFactor=.85))
out.vertex_normals = vn  # (normals from the unsplit surface: smooth across the texture seams)
if parts:
    scene = trimesh.Scene(); scene.add_geometry(out, node_name='body', geom_name='body')
    for k, (n, g) in enumerate(parts): scene.add_geometry(g, node_name=f'{n}{k}', geom_name=f'{n}{k}')
    scene.export(out_path)
else: out.export(out_path)
img.save(out_path.rsplit('.', 1)[0] + '_tex.png')
print('vertices', len(NV), 'faces', len(NF), 'texture', TS)
