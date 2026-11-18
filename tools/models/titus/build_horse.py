# The war horse for the game, from the Hunyuan model: slimmed, turned into the old horse's frame (so the game's
# horse code, gait and rider seat keep working), with a skeleton of one bone per leg part: the leg from the
# shoulder or hip, and the knee (hock behind). Weights by shape: hooves to the belly ride their leg, a soft blend
# where the leg meets the body, the rest (body, neck, head, mane, tail, saddle) the body. The saddle cloth is its
# own material, tinted to the team in the game. A 'seat' marker on the saddle tells the game where the rider sits.
# Usage: <horse.glb> <out.glb> <check prefix>
import bpy, bmesh, sys, math, numpy as np
from mathutils import Vector, Matrix
src, out, chk = sys.argv[-3], sys.argv[-2], sys.argv[-1]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
bpy.ops.import_scene.gltf(filepath=src)
H = [o for o in bpy.data.objects if o.type == 'MESH'][0]; H.name = 'horse'
bpy.context.view_layer.objects.active = H; H.select_set(True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
bm = bmesh.new(); bm.from_mesh(H.data); bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5); bm.to_mesh(H.data); bm.free()
d = H.modifiers.new('d', 'DECIMATE'); d.ratio = .17; d.use_collapse_triangulate = True; bpy.ops.object.modifier_apply(modifier='d')
me = H.data
nat = np.array([v.co[:] for v in me.vertices])          # its own frame: x along it (head at -x), y across (left -y), z up, hooves at 0
# the four legs: where the vertices low down gather
low = nat[(nat[:, 2] > .06) & (nat[:, 2] < .13)]   # (the leg bands: above the hooves, below the tail's tip)
C = {'frontL': (-.21, -.06), 'frontR': (-.21, .06), 'backL': (.24, -.06), 'backR': (.24, .06)}
for _ in range(10):
    lab = np.array([min(C, key=lambda k: (p[0] - C[k][0]) ** 2 + (p[1] - C[k][1]) ** 2) for p in low])
    C = {k: tuple(low[lab == k][:, :2].mean(0)) for k in C}
print('legs', {k: tuple(round(v, 3) for v in c) for k, c in C.items()})
PIV, KNEE, BELLY = .40, .21, .31                        # shoulder or hip, knee or hock, where a leg leaves the body
SEAT = (-.05, 0, .60)                                    # the saddle's seat (read off the side view)
S = 2.1 / SEAT[2]                                        # the seat as high as the old horse's, about
to_old = lambda p: Vector((p[1], -p[2], p[0])) * S       # -> the old horse's frame (x across, -y up, -z forward)
for v, p in zip(me.vertices, nat): v.co = to_old(p)
me.update()
# skeleton
arm_d = bpy.data.armatures.new('rig'); arm = bpy.data.objects.new('rig', arm_d); bpy.context.collection.objects.link(arm)
bpy.context.view_layer.objects.active = arm; bpy.ops.object.mode_set(mode='EDIT')
eb = arm_d.edit_bones; body = eb.new('body'); body.head = to_old((0, 0, .5)); body.tail = to_old((0, 0, .6))
for k, (cx, cy) in C.items():
    a = eb.new('leg_' + k); a.head = to_old((cx, cy, PIV)); a.tail = to_old((cx, cy, KNEE)); a.parent = body
    b = eb.new('knee_' + k); b.head = to_old((cx, cy, KNEE)); b.tail = to_old((cx, cy, .02)); b.parent = a
bpy.ops.object.mode_set(mode='OBJECT')
H.parent = arm; mod = H.modifiers.new('arm', 'ARMATURE'); mod.object = arm
G = {n: H.vertex_groups.new(name=n) for n in ['body'] + [p + k for k in C for p in ('leg_', 'knee_')]}
ss = lambda a, b, x: (lambda t: t * t * (3 - 2 * t))(min(1, max(0, (x - a) / (b - a))))
for i, p in enumerate(nat):
    k = min(C, key=lambda k: (p[0] - C[k][0]) ** 2 + (p[1] - C[k][1]) ** 2); dist = math.hypot(p[0] - C[k][0], p[1] - C[k][1])
    leg = (1 - ss(BELLY, BELLY + .09, p[2])) * (1 - ss(.10, .15, dist))    # (low down and near a leg)
    if p[0] > .40 and abs(p[1]) < .05: leg = 0                              # (the tail's tip hangs low behind the hocks: body)
    kn = 1 - ss(KNEE - .03, KNEE + .03, p[2])
    if leg > 0:
        G['leg_' + k].add([i], leg * (1 - kn), 'REPLACE')
        if kn > 0: G['knee_' + k].add([i], leg * kn, 'REPLACE')
    if leg < 1: G['body'].add([i], 1 - leg, 'REPLACE')
# textures: colour only, 1024; the saddle cloth (blue) its own material over a grey copy for the team tint
img = None
for m in me.materials:
    for n in (m.node_tree.nodes if m and m.use_nodes else []):
        if n.type == 'TEX_IMAGE' and 'normal' not in n.image.name and 'metal' not in n.image.name: img = n.image
img.scale(1024, 1024); px = np.empty(1024 * 1024 * 4, np.float32); img.pixels.foreach_get(px); px = px.reshape(-1, 4)
col = bpy.data.images.new('horse_col', 1024, 1024); col.pixels.foreach_set(px.ravel()); col.file_format = 'JPEG'
lum = px[:, :3] @ np.array([.299, .587, .114], np.float32); r, g, b = px[:, 0], px[:, 1], px[:, 2]
blue = (b > .25) & (b > r * 1.6) & (b > g * 1.3); k = .85 / max(1e-3, float(np.median(lum[blue]))) if blue.any() else 1
gry = np.repeat(np.clip(lum * k, 0, 1)[:, None], 3, 1); gry = np.concatenate([gry, np.ones((len(gry), 1), np.float32)], 1)
team = bpy.data.images.new('horse_team', 1024, 1024); team.pixels.foreach_set(gry.ravel()); team.file_format = 'JPEG'
def material(name, image):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; bsdf = nt.nodes['Principled BSDF']
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = image; nt.links.new(t.outputs['Color'], bsdf.inputs['Base Color'])
    bsdf.inputs['Metallic'].default_value = 0; bsdf.inputs['Roughness'].default_value = .8; return m
uv = me.uv_layers.active.data; me.materials.clear(); me.materials.append(material('horse_body', col)); me.materials.append(material('horse_team_cloth', team))
for p in me.polygons:
    u = sum(uv[i].uv.x for i in p.loop_indices) / p.loop_total; v = sum(uv[i].uv.y for i in p.loop_indices) / p.loop_total
    q = px[min(1023, int(v % 1 * 1024)) * 1024 + min(1023, int(u % 1 * 1024))]
    p.material_index = 1 if (q[2] > .25 and q[2] > q[0] * 1.6 and q[2] > q[1] * 1.3) else 0
seat = bpy.data.objects.new('seat', None); seat.location = to_old(SEAT); bpy.context.collection.objects.link(seat)
print('tris', sum(len(p.vertices) - 2 for p in me.polygons), 'seat', [round(x, 3) for x in seat.location], 'scale', round(S, 3))
bpy.ops.wm.save_as_mainfile(filepath=chk + '.blend')
for o in bpy.context.selected_objects: o.select_set(False)
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', export_animations=False, export_image_format='JPEG', export_jpeg_quality=85, export_skins=True)
print('WROTE', out)
