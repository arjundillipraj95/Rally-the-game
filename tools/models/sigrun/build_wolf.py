# (C5) Sigrun's great grey wolf, as devi/build_horse_devi.py builds a horse: slimmed, turned into the old horse's frame
# (so the game's mount code, gait and rider seat keep working: leg_<k> and knee_<k> as every horse), plus two bones
# of its own for her moves: 'head' (neck and head: the bite, the howl) and 'tail'. The valknut on the saddle cloth is
# painted out (the cloth's middle reads plain blue). Usage: <wolf.glb> <out.glb> <check prefix>
import bpy, bmesh, sys, math, numpy as np
from mathutils import Vector, Matrix
src, out, chk = sys.argv[-3], sys.argv[-2], sys.argv[-1]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
bpy.ops.import_scene.gltf(filepath=src)
H = [o for o in bpy.data.objects if o.type == 'MESH'][0]; H.name = 'wolf'
bpy.context.view_layer.objects.active = H; H.select_set(True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
bm = bmesh.new(); bm.from_mesh(H.data); bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5); bm.to_mesh(H.data); bm.free()
d = H.modifiers.new('d', 'DECIMATE'); d.ratio = .17; d.use_collapse_triangulate = True; bpy.ops.object.modifier_apply(modifier='d')
me = H.data
# (Hunyuan stood this horse at an angle: turn it so its length runs along x, the head (its highest part) at -x)
P = np.array([v.co[:] for v in me.vertices]); xy = P[:, :2] - P[:, :2].mean(0)
w, V = np.linalg.eigh(np.cov(xy.T)); ax = V[:, np.argmax(w)]; a = -math.atan2(ax[1], ax[0])
R = np.array([[math.cos(a), -math.sin(a)], [math.sin(a), math.cos(a)]]); xy = xy @ R.T
top = P[:, 2] > np.percentile(P[:, 2], 97)
if xy[top, 0].mean() > 0: xy = -xy
for v, q in zip(me.vertices, xy): v.co.x, v.co.y = float(q[0]), float(q[1])
me.update(); print('turned', round(math.degrees(a), 1), 'length', round(float(np.ptp(xy[:, 0])), 3), 'width', round(float(np.ptp(xy[:, 1])), 3))
nat = np.array([v.co[:] for v in me.vertices])
print('frame x', round(float(nat[:,0].min()),3), round(float(nat[:,0].max()),3), 'z', round(float(nat[:,2].max()),3))
TAILX = .42          # its own frame: x along it (head at -x), y across (left -y), z up, hooves at 0
# the four legs: where the vertices low down gather
low = nat[(nat[:, 2] > .02) & (nat[:, 2] < .08) & (nat[:, 0] < TAILX)]   # (her long tail hangs as low as the hooves, behind the staggered back left leg: not a leg)   # (the leg bands: above the hooves, below the tail's tip)
C = {'frontL': (-.25, -.06), 'frontR': (-.25, .06), 'backL': (.2, -.06), 'backR': (.2, .06)}
for _ in range(10):
    lab = np.array([min(C, key=lambda k: (p[0] - C[k][0]) ** 2 + (p[1] - C[k][1]) ** 2) for p in low])
    C = {k: tuple(low[lab == k][:, :2].mean(0)) for k in C}
print('legs', {k: tuple(round(v, 3) for v in c) for k, c in C.items()})
PIV, BELLY = .34, .27
KNEES = {'front': .13, 'back': .17}                        # shoulder or hip, knee or hock, where a leg leaves the body
fx_, bx_ = (C['frontL'][0] + C['frontR'][0]) / 2, (C['backL'][0] + C['backR'][0]) / 2
SEATF = .5
SEAT = (fx_ + SEATF * (bx_ - fx_), 0, .53)
S = 2.1 / SEAT[2]                                        # the seat as high as the old horse's, about
to_old = lambda p: Vector((p[1], -p[2], p[0])) * S       # -> the old horse's frame (x across, -y up, -z forward)
for v, p in zip(me.vertices, nat): v.co = to_old(p)
me.update()
# skeleton
arm_d = bpy.data.armatures.new('rig'); arm = bpy.data.objects.new('rig', arm_d); bpy.context.collection.objects.link(arm)
bpy.context.view_layer.objects.active = arm; bpy.ops.object.mode_set(mode='EDIT')
eb = arm_d.edit_bones; body = eb.new('body'); body.head = to_old((0, 0, .5)); body.tail = to_old((0, 0, .6))
for k, (cx, cy) in C.items():
    KNEE = KNEES[k[:-1]]
    a = eb.new('leg_' + k); a.head = to_old((cx, cy, PIV)); a.tail = to_old((cx, cy, KNEE)); a.parent = body
    b = eb.new('knee_' + k); b.head = to_old((cx, cy, KNEE)); b.tail = to_old((cx, cy, .02)); b.parent = a
NX = float(nat[:, 0].min()); hd = eb.new('head'); hd.head = to_old((fx_ - .02, 0, .42)); hd.tail = to_old((NX + .05, 0, .5)); hd.parent = body
tl = eb.new('tail'); tl.head = to_old((bx_ + .1, 0, .4)); tl.tail = to_old((float(nat[:, 0].max()), 0, .25)); tl.parent = body
bpy.ops.object.mode_set(mode='OBJECT')
H.parent = arm; mod = H.modifiers.new('arm', 'ARMATURE'); mod.object = arm
G = {n: H.vertex_groups.new(name=n) for n in ['body', 'head', 'tail'] + [p + k for k in C for p in ('leg_', 'knee_')]}
ss = lambda a, b, x: (lambda t: t * t * (3 - 2 * t))(min(1, max(0, (x - a) / (b - a))))
for i, p in enumerate(nat):
    k = min(C, key=lambda k: (p[0] - C[k][0]) ** 2 + (p[1] - C[k][1]) ** 2); dist = math.hypot(p[0] - C[k][0], p[1] - C[k][1])
    leg = (1 - ss(BELLY, BELLY + .09, p[2])) * (1 - ss(.10, .15, dist))    # (low down and near a leg)
    if p[0] > bx_ + .08: leg = 0                                           # (the tail hangs behind the hocks)
    KNEE = KNEES[k[:-1]]; kn = 1 - ss(KNEE - .03, KNEE + .03, p[2])
    if leg > 0:
        G['leg_' + k].add([i], leg * (1 - kn), 'REPLACE')
        if kn > 0: G['knee_' + k].add([i], leg * kn, 'REPLACE')
    if leg < 1:
        rest = 1 - leg
        hw = ss(fx_ - .02, fx_ - .12, p[0]) * ss(.28, .36, p[2])          # (in front of the shoulders and up: the neck and head)
        tw = ss(bx_ + .02, bx_ + .2, p[0]) * ss(.1, .22, p[2]) * (1 - leg)  # (behind the hips: the tail)
        if hw > 0: G['head'].add([i], rest * hw, 'REPLACE')
        if tw > 0: G['tail'].add([i], rest * tw, 'REPLACE')
        if rest * (1 - hw - tw) > 0: G['body'].add([i], rest * max(0, 1 - hw - tw), 'REPLACE')
# textures: colour only, 1024; the saddle cloth (blue) its own material over a grey copy for the team tint
img = None
for m in me.materials:
    for n in (m.node_tree.nodes if m and m.use_nodes else []):
        if n.type == 'TEX_IMAGE' and 'normal' not in n.image.name and 'metal' not in n.image.name: img = n.image
img.scale(1024, 1024); px = np.empty(1024 * 1024 * 4, np.float32); img.pixels.foreach_get(px); px = px.reshape(-1, 4)
col = bpy.data.images.new('wolf_col', 1024, 1024); col.pixels.foreach_set(px.ravel()); col.file_format = 'JPEG'
lum = px[:, :3] @ np.array([.299, .587, .114], np.float32); r, g, b = px[:, 0], px[:, 1], px[:, 2]
blue = (b > .15) & (b > r * 1.15) & (b > g * 1.1); k = .85 / max(1e-3, float(np.median(lum[blue]))) if blue.any() else 1
gry = np.repeat(np.clip(lum * k, 0, 1)[:, None], 3, 1); gry = np.concatenate([gry, np.ones((len(gry), 1), np.float32)], 1)
team = bpy.data.images.new('wolf_team', 1024, 1024); team.pixels.foreach_set(gry.ravel()); team.file_format = 'JPEG'
def material(name, image):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; bsdf = nt.nodes['Principled BSDF']
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = image; nt.links.new(t.outputs['Color'], bsdf.inputs['Base Color'])
    bsdf.inputs['Metallic'].default_value = 0; bsdf.inputs['Roughness'].default_value = .8; return m
uv = me.uv_layers.active.data; me.materials.clear(); me.materials.append(material('wolf_body', col)); me.materials.append(material('wolf_team_cloth', team))
for p in me.polygons:
    u = sum(uv[i].uv.x for i in p.loop_indices) / p.loop_total; v = sum(uv[i].uv.y for i in p.loop_indices) / p.loop_total
    q = px[min(1023, int(v % 1 * 1024)) * 1024 + min(1023, int(u % 1 * 1024))]
    p.material_index = 1 if (q[2] > .15 and q[2] > q[0] * 1.15 and q[2] > q[1] * 1.1) else 0
# the valknut: the saddle cloth's middle (each side) takes one plain blue texel
cloth = [p for p in me.polygons if p.material_index == 1]
U = []
for p in cloth:
    u = sum(uv[i].uv.x for i in p.loop_indices) / p.loop_total; v = sum(uv[i].uv.y for i in p.loop_indices) / p.loop_total
    q = px[min(1023, int(v % 1 * 1024)) * 1024 + min(1023, int(u % 1 * 1024))]
    if q[2] > .2 and q[2] > q[0] * 1.2: U.append((u, v))
Um = np.median(np.array(U), 0) if U else (.5, .5); flat = 0
for side in (-1, 1):
    cs = [p for p in cloth if p.center.x * side > 0]
    if not cs: continue
    Y = np.array([p.center.y for p in cs]); Z = np.array([p.center.z for p in cs])
    y0, y1 = np.percentile(Y, [4, 96]); z0, z1 = np.percentile(Z, [4, 96])
    for p in me.polygons:
        if not (p.center.x * side > 0 and y0 < p.center.y < y1 and z0 < p.center.z < z1): continue
        u = sum(uv[i].uv.x for i in p.loop_indices) / p.loop_total; v = sum(uv[i].uv.y for i in p.loop_indices) / p.loop_total
        q = px[min(1023, int(v % 1 * 1024)) * 1024 + min(1023, int(u % 1 * 1024))]
        brown = q[0] > q[2] * 1.25 and q[0] > .12; dark = (q[0] + q[1] + q[2]) / 3 < .06
        if p.material_index == 1 or not (brown or dark):
            for i in p.loop_indices: uv[i].uv = (float(Um[0]), float(Um[1]))
            p.material_index = 1; flat += 1
print('cloth faces', len(cloth), 'flattened', flat)
seat = bpy.data.objects.new('seat', None); seat.location = to_old(SEAT); bpy.context.collection.objects.link(seat)
print('tris', sum(len(p.vertices) - 2 for p in me.polygons), 'seat', [round(x, 3) for x in seat.location], 'scale', round(S, 3))
bpy.ops.wm.save_as_mainfile(filepath=chk + '.blend')
for o in bpy.context.selected_objects: o.select_set(False)
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', export_animations=False, export_image_format='JPEG', export_jpeg_quality=85, export_skins=True)
print('WROTE', out)
