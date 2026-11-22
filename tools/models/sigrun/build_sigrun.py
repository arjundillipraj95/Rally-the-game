# Sigrun (C5) onto the game's shared (Mixamo) skeleton, following devi/build_devi.py. Her Hunyuan model came in the
# T-pose with the axe and shield fused on (cut off first by cut.py: the shield's side filled with cloak). Her braid rides
# the head and upper back, the cloak behind her the spine and hips. Usage: <captain_anim.glb> <sigrun_clean.glb> <out.blend>
import bpy, bmesh, sys
from mathutils import Vector, Matrix
ARCH = False
cap_path, src_path, out = sys.argv[-4:-1] if ARCH else sys.argv[-3:]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
bpy.ops.import_scene.gltf(filepath=cap_path)
arm = bpy.data.objects['Armature']
for o in list(bpy.data.objects):
    if o.type == 'MESH': bpy.data.objects.remove(o)
before = set(bpy.data.objects)
bpy.ops.import_scene.gltf(filepath=src_path)
T = [o for o in bpy.data.objects if o not in before and o.type == 'MESH'][0]
T.name = 'titus'   # (the export and far-figure scripts look for this name)
# her joints (model units: x her left, -y forward, z up, feet at 0), read off the front and side views and slices
# (armprof.py, legprof.py): ankle the narrowest above the sandal (.09), knee just above the greave (.30), wrist where
# the arm guard ends, the shoulder under the brass plate
# her joints (model units: x her left, -y forward, z up, feet at 0), from slices of the mesh: ankle the narrowest above
# the boot (.10), knee at the knee pads (.33), the arms straight out (T-pose already), hands end at .41
J = {'Hips': (0, 0, .565), 'Spine': (0, 0, .63), 'Spine1': (0, 0, .71), 'Spine2': (0, 0, .79), 'Neck': (0, -.01, .955), 'Head': (0, -.02, .995),
     'LeftShoulder': (.045, 0, .89), 'LeftArm': (.14, .02, .875), 'LeftForeArm': (.255, .01, .86), 'LeftHand': (.355, 0, .848), 'LeftHandEnd': (.41, -.005, .84),
     'LeftUpLeg': (.085, 0, .555), 'LeftLeg': (.10, -.01, .33), 'LeftFoot': (.125, .01, .10), 'LeftToeBase': (.14, -.07, .02)}
JA = J
if ARCH: J = JA
for k in list(J):
    if k.startswith('Left'): x, y, z = J[k]; J['Right' + k[4:]] = (-x, y, z)
CAP = {b.name: (b.head_local.copy(), b.tail_local.copy()) for b in arm.data.bones}
FLOOR = -.998
TOP = 1.80      # her hair's top a little below Titus's helmet top; a soldier as every soldier (the game scales soldiers)
HEADTOP = 1.14  # the top of the cap / her hair in the model
s = TOP / HEADTOP
HIPK = (J['Hips'][2] * s) / (CAP['Hips'][0].z - FLOOR)   # her hips above the floor against the captain's: the game scales the clips' hip track by this
off = Vector((CAP['Hips'][0].x, CAP['Hips'][0].y, FLOOR))
W = lambda p: Vector((p[0] * s, p[1] * s, p[2] * s)) + off
print('scale', round(s, 3), 'HIPK', round(HIPK, 4))

# 1. slim and place the mesh (about 10,000 triangles, as Titus)
bpy.context.view_layer.objects.active = T; T.select_set(True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
me = T.data
bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5); bm.to_mesh(me); bm.free()
dec = T.modifiers.new('dec', 'DECIMATE'); dec.ratio = .12 if ARCH else .2; dec.use_collapse_triangulate = True
bpy.ops.object.modifier_apply(modifier='dec')
me.transform(Matrix.Translation(off) @ Matrix.Scale(s, 4)); me.update()
print('tris', sum(len(p.vertices) - 2 for p in me.polygons))

def set_bones(a, pos, arm_dirs):
    bpy.context.view_layer.objects.active = a; bpy.ops.object.mode_set(mode='EDIT')
    eb = a.data.edit_bones
    for b in eb: b.use_connect = False
    for b in eb:
        h0, t0 = CAP[b.name]; h = pos[b.name]
        roll = b.roll; b.head = h; b.tail = arm_dirs.get(b.name, h + (t0 - h0)); b.roll = roll
    bpy.ops.object.mode_set(mode='OBJECT')

# 2. the A-pose skeleton: her joints, arms down her arms; bind, then lift the arms to the T-pose
if arm.animation_data: arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis.identity()
armA = arm.copy(); armA.data = arm.data.copy(); armA.animation_data_clear(); bpy.context.collection.objects.link(armA)
for pb in armA.pose.bones: pb.matrix_basis.identity()
posA = {n: W(J[n]) for n in CAP}
chain = {'Arm': 'ForeArm', 'ForeArm': 'Hand', 'Hand': 'HandEnd'}
tailsA = {side + a_: W(J[side + b_]) for side in ('Left', 'Right') for a_, b_ in chain.items()}
set_bones(armA, posA, tailsA)
def bind(a):
    for o in bpy.context.selected_objects: o.select_set(False)
    T.select_set(True); a.select_set(True); bpy.context.view_layer.objects.active = a
    bpy.ops.object.parent_set(type='ARMATURE_AUTO')
    print('unweighted verts', sum(1 for v in T.data.vertices if len(v.groups) == 0), 'of', len(T.data.vertices))
bind(armA)
bpy.context.view_layer.objects.active = armA; bpy.ops.object.mode_set(mode='POSE')
for side in ('Left', 'Right'):
    for name in (side + 'Arm', side + 'ForeArm', side + 'Hand'):
        pb = armA.pose.bones[name]; bpy.context.view_layer.update()
        cur = (pb.tail - pb.head).normalized(); h0, t0 = CAP[name]; want = (t0 - h0).normalized()
        R = cur.rotation_difference(want).to_matrix().to_4x4(); M = pb.matrix.copy(); loc = M.to_translation()
        pb.matrix = Matrix.Translation(loc) @ R @ Matrix.Translation(-loc) @ M; bpy.context.view_layer.update()
bpy.ops.object.mode_set(mode='OBJECT')
bpy.context.view_layer.objects.active = T
mod = [m for m in T.modifiers if m.type == 'ARMATURE'][0]; bpy.ops.object.modifier_apply(modifier=mod.name)
T.parent = None; T.vertex_groups.clear(); bpy.data.objects.remove(armA)

# 3. the game skeleton: joints moved into her (T-pose arms), directions as the captain's
pos = dict(posA)
for side in ('Left', 'Right'):
    p = pos[side + 'Arm']
    for a_, b_ in (('Arm', 'ForeArm'), ('ForeArm', 'Hand')):
        L = (W(J[side + b_]) - W(J[side + a_])).length; h0, t0 = CAP[side + a_]
        p = p + (t0 - h0).normalized() * L; pos[side + b_] = p
set_bones(arm, pos, {})
bind(arm)

# her model-space coordinates of a (placed) vertex
mx = lambda v: (v.co.x - off.x) / s
my = lambda v: (v.co.y - off.y) / s
mz = lambda v: (v.co.z - FLOOR) / s
G = {g.name: g for g in T.vertex_groups}
def setw(vi, pairs):
    v = T.data.vertices[vi]
    for g in list(v.groups): T.vertex_groups[g.group].remove([vi])
    for name, wt in pairs: G[name].add([vi], wt, 'REPLACE')

# 4. the sash (blue silk): read off the texture
img = None
for m in T.data.materials:
    if m and m.use_nodes:
        for n in m.node_tree.nodes:
            if n.type == 'TEX_IMAGE' and 'normal' not in n.image.name and 'metal' not in n.image.name: img = n.image
px = list(img.pixels); IW, IH = img.size
uv = T.data.uv_layers.active.data
blue = set()
for p in T.data.polygons:
    u = sum(uv[i].uv.x for i in p.loop_indices) / p.loop_total; v = sum(uv[i].uv.y for i in p.loop_indices) / p.loop_total
    x = min(IW - 1, max(0, int(u % 1 * IW))); y = min(IH - 1, max(0, int(v % 1 * IH))); k = (y * IW + x) * 4
    r, g, b = px[k], px[k + 1], px[k + 2]
    pass
BELT = .64
nsash = 0
for vi in blue:
    v = T.data.vertices[vi]; z = mz(v); x = mx(v)
    if z > BELT or abs(x) > .2: continue                       # (the sash over the chest and shoulder keeps its own)
    t = max(0, min(1, (BELT - z) / (BELT - .25)))              # (lower down, a little more of the near thigh)
    if abs(x) < .045: setw(vi, [('Hips', 1)])                  # (the front panel between the legs: on the hips)
    else: setw(vi, [('Hips', 1 - .35 * t), (('Left' if x > 0 else 'Right') + 'UpLeg', .35 * t)])
    nsash += 1


# 5. the braid rides the head and upper back; the cloak behind her back the spine and hips, never an arm or a leg
nb = nc = 0
for v in T.data.vertices:
    z = mz(v); x = mx(v); y = my(v)
    if z > .70 and y > .06 and abs(x) < .09:
        setw(v.index, [('Head', .6), ('Neck', .4)] if z > .96 else [('Neck', .5), ('Spine2', .5)] if z > .88 else [('Spine2', 1)]); nb += 1
    elif .40 < z < .86 and y > .085 and abs(x) < .2:
        t = max(0, min(1, (z - .565) / (.79 - .565))); setw(v.index, [('Spine1', .3 + .4 * t), ('Hips', .7 - .4 * t)]); nc += 1
print('braid', nb, 'cloak', nc)


# 6. legs: smooth the knee and thigh weights (the baggy trousers), then the greave rigid on the shin, sandal on the foot
bpy.ops.object.select_all(action='DESELECT'); T.select_set(True); bpy.context.view_layer.objects.active = T
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT'); bpy.ops.object.mode_set(mode='OBJECT')
for v in T.data.vertices:
    z = mz(v); v.select = v.index not in blue and J['LeftLeg'][2] - .05 < z < .62
bpy.ops.object.mode_set(mode='WEIGHT_PAINT'); T.data.use_paint_mask_vertex = True
bpy.ops.object.vertex_group_smooth(group_select_mode='ALL', factor=.5, repeat=6, expand=0)
bpy.ops.object.vertex_group_limit_total(group_select_mode='ALL', limit=4)
bpy.ops.object.vertex_group_normalize_all(group_select_mode='ALL', lock_active=False)
T.data.use_paint_mask_vertex = False; bpy.ops.object.mode_set(mode='OBJECT')
nk = {'shin': 0, 'foot': 0}
for v in T.data.vertices:
    if v.index in blue: continue
    z = mz(v); x = mx(v); side = 'Left' if x > 0 else 'Right'
    if abs(x) > .22 or z > .6: continue
    if z < .075:
        setw(v.index, [(side + 'Foot', .55), (side + 'ToeBase', .45)] if my(v) < -.05 else [(side + 'Foot', 1)]); nk['foot'] += 1
    elif .11 < z < J['LeftLeg'][2] - .03 and abs(x) > .05:
        setw(v.index, [(side + 'Leg', 1)]); nk['shin'] += 1
# a leg never follows the other leg
LEGB = ('UpLeg', 'Leg', 'Foot', 'ToeBase'); gname = {g.index: g.name for g in T.vertex_groups}; cut = 0
for v in T.data.vertices:
    x = mx(v)
    if abs(x) < .03: continue
    far = 'Right' if x > 0 else 'Left'
    gs = [(g.group, g.weight) for g in v.groups]
    bad = [gi for gi, w in gs if gname[gi].startswith(far) and gname[gi][len(far):] in LEGB]
    if not bad: continue
    keep = [(gi, w) for gi, w in gs if gi not in bad]; tot = sum(w for _, w in keep)
    for gi in bad: T.vertex_groups[gi].remove([v.index])
    if tot > 1e-4:
        for gi, w in keep: T.vertex_groups[gi].add([v.index], w / tot, 'REPLACE')
    else: G['Hips'].add([v.index], 1, 'REPLACE')
    cut += 1
print('cross-leg weights removed', cut, 'reweighted', nk)
bpy.ops.wm.save_as_mainfile(filepath=out)
print('SAVED', out)
