# Titus onto the game's shared (Mixamo) skeleton. Inputs: the captain file (skeleton + clips) and the Hunyuan
# A-pose Titus. Steps: slim the mesh; put him in the captain's space (hips on the captain's hips, feet on the floor);
# swing his arms from the A-pose up to the skeleton's T-pose; move the skeleton's joints into his body (bone
# directions kept, so every clip still fits); bind with automatic weights; the cloak rides the spine and hips.
# Writes a .blend for checking; export is a separate step.  Usage: <captain.glb> <body.glb> <out.blend> [soldier]
# (soldier: the Roman spearman's joints and no cloak; his blue is his tunic, which keeps its own weights)
import bpy, bmesh, sys, math
from mathutils import Vector, Matrix
SOLD = sys.argv[-1] in ('soldier', 'archer')
args = sys.argv[-4:-1] if SOLD else sys.argv[-3:]
cap_path, tit_path, out = args
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
bpy.ops.import_scene.gltf(filepath=cap_path)
arm = bpy.data.objects['Armature']
for o in list(bpy.data.objects):
    if o.type == 'MESH': bpy.data.objects.remove(o)
before = set(bpy.data.objects)
bpy.ops.import_scene.gltf(filepath=tit_path)
T = [o for o in bpy.data.objects if o not in before and o.type == 'MESH'][0]
T.name = 'titus'
# his joints, read off the front and side views of the model (model units: x his left, -y forward, z up, feet at 0)
# legs measured from the mesh (legprof.py: slices of the leg): the knee is the bare band between the kilt and the greave
# (narrowest at .30-.34), the ankle the narrowest point above the sandal (.11-.16), the hip a stylised-body .50
J = {'Hips': (0, 0, .50), 'Spine': (0, 0, .56), 'Spine1': (0, 0, .63), 'Spine2': (0, 0, .70), 'Neck': (0, -.01, .83), 'Head': (0, -.03, .88),
     'LeftShoulder': (.04, 0, .79), 'LeftArm': (.17, 0, .745), 'LeftForeArm': (.265, -.01, .635), 'LeftHand': (.345, -.03, .545), 'LeftHandEnd': (.385, -.04, .49),
     'LeftUpLeg': (.085, 0, .49), 'LeftLeg': (.09, -.015, .32), 'LeftFoot': (.125, .012, .11), 'LeftToeBase': (.14, -.07, .02)}
# the spearman (legprof.py on his mesh): greaves .12-.29, the knee in the bare band .30-.40, ankle .12, hip .52
JS = {'Hips': (0, 0, .52), 'Spine': (0, 0, .58), 'Spine1': (0, 0, .65), 'Spine2': (0, 0, .74), 'Neck': (0, -.01, .90), 'Head': (0, -.02, .95),
      'LeftShoulder': (.05, 0, .86), 'LeftArm': (.19, 0, .82), 'LeftForeArm': (.29, -.01, .69), 'LeftHand': (.37, -.02, .58), 'LeftHandEnd': (.40, -.03, .52),
      'LeftUpLeg': (.085, 0, .51), 'LeftLeg': (.09, -.01, .35), 'LeftFoot': (.13, .03, .12), 'LeftToeBase': (.145, -.07, .02)}
# the archer (legprof.py, armprof): leg wraps .08-.30, the knee in the bare band .30-.40, ankle .13; arms hang lower
JA = {'Hips': (0, 0, .52), 'Spine': (0, 0, .58), 'Spine1': (0, 0, .65), 'Spine2': (0, 0, .74), 'Neck': (0, -.01, .90), 'Head': (0, -.02, .95),
      'LeftShoulder': (.05, 0, .83), 'LeftArm': (.18, 0, .77), 'LeftForeArm': (.28, -.01, .625), 'LeftHand': (.33, -.04, .555), 'LeftHandEnd': (.38, -.06, .49),
      'LeftUpLeg': (.085, 0, .51), 'LeftLeg': (.10, -.005, .34), 'LeftFoot': (.135, .025, .12), 'LeftToeBase': (.15, -.07, .02)}
SOLDIER = SOLD
ARCH = sys.argv[-1] == 'archer'
if SOLDIER: J = JA if ARCH else JS
for k in list(J):
    if k.startswith('Left'): x, y, z = J[k]; J['Right' + k[4:]] = (-x, y, z)
CAP = {b.name: (b.head_local.copy(), b.tail_local.copy()) for b in arm.data.bones}
FLOOR = -.998
TOP = 1.85                                      # his helmet's top (model .99) stands where the old captain's head reached
HEADTOP = 1.11 if SOLDIER else .99                # his helmet's top in the model
s = TOP / HEADTOP
HIPK = (J['Hips'][2] * s) / (CAP['Hips'][0].z - FLOOR)   # his hips above the floor against the captain's: the game scales the clips' hip track by this
off = Vector((CAP['Hips'][0].x, CAP['Hips'][0].y, FLOOR))
W = lambda p: Vector((p[0] * s, p[1] * s, p[2] * s)) + off   # his model space -> the captain's space
print('scale', round(s, 3), 'HIPK', round(HIPK, 4))

# 1. slim and place the mesh
bpy.context.view_layer.objects.active = T; T.select_set(True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
me = T.data
bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5); bm.to_mesh(me); bm.free()
dec = T.modifiers.new('dec', 'DECIMATE'); dec.ratio = .12 if SOLDIER else 0.21;   # (a soldier: about 6,000 triangles; only the nearest few are drawn this way, the rest as the light far figure) dec.use_collapse_triangulate = True
bpy.ops.object.modifier_apply(modifier='dec')
me.transform(Matrix.Translation(off) @ Matrix.Scale(s, 4)); me.update()
print('tris', sum(len(p.vertices) - 2 for p in me.polygons))

def set_bones(a, pos, arm_dirs):
    """edit bones: heads at pos[name]; tails keep the captain's direction and length, except arm_dirs (name -> tail)"""
    bpy.context.view_layer.objects.active = a; bpy.ops.object.mode_set(mode='EDIT')
    eb = a.data.edit_bones
    for b in eb: b.use_connect = False
    for b in eb:
        h0, t0 = CAP[b.name]; h = pos[b.name]
        roll = b.roll; b.head = h; b.tail = arm_dirs.get(b.name, h + (t0 - h0)); b.roll = roll
    bpy.ops.object.mode_set(mode='OBJECT')

# 2. the A-pose skeleton: his joints, arms pointing down his arms; bind, then lift the arms to the T-pose
# (the importer leaves the captain's file pose on the bones: clear it, so only the arms we lift move the mesh)
if arm.animation_data: arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis.identity()
armA = arm.copy(); armA.data = arm.data.copy(); armA.animation_data_clear(); bpy.context.collection.objects.link(armA)
for pb in armA.pose.bones: pb.matrix_basis.identity()
posA = {n: W(J[n]) for n in CAP}
chain = {'Arm': 'ForeArm', 'ForeArm': 'Hand', 'Hand': 'HandEnd'}
tailsA = {}
for side in ('Left', 'Right'):
    for a_, b_ in chain.items(): tailsA[side + a_] = W(J[side + b_])
set_bones(armA, posA, tailsA)
def bind(a):
    for o in bpy.context.selected_objects: o.select_set(False)
    T.select_set(True); a.select_set(True); bpy.context.view_layer.objects.active = a
    bpy.ops.object.parent_set(type='ARMATURE_AUTO')
    n = sum(1 for v in T.data.vertices if len(v.groups) == 0)
    print('unweighted verts', n, 'of', len(T.data.vertices))
bind(armA)
bpy.context.view_layer.objects.active = armA; bpy.ops.object.mode_set(mode='POSE')
for side in ('Left', 'Right'):
    for name in (side + 'Arm', side + 'ForeArm', side + 'Hand'):
        pb = armA.pose.bones[name]; bpy.context.view_layer.update()
        cur = (pb.tail - pb.head).normalized()                       # armature space, as posed so far
        h0, t0 = CAP[name]; want = (t0 - h0).normalized()
        R = cur.rotation_difference(want).to_matrix().to_4x4()
        M = pb.matrix.copy(); loc = M.to_translation()
        pb.matrix = Matrix.Translation(loc) @ R @ Matrix.Translation(-loc) @ M
        bpy.context.view_layer.update()
bpy.ops.object.mode_set(mode='OBJECT')
bpy.context.view_layer.objects.active = T
mod = [m for m in T.modifiers if m.type == 'ARMATURE'][0]; bpy.ops.object.modifier_apply(modifier=mod.name)
T.parent = None; T.vertex_groups.clear(); bpy.data.objects.remove(armA)

# 3. the game skeleton: joints moved into him (his T-pose arms), directions as the captain's
pos = dict(posA)
for side in ('Left', 'Right'):
    p = pos[side + 'Arm']
    for a_, b_ in (('Arm', 'ForeArm'), ('ForeArm', 'Hand')):
        L = (W(J[side + b_]) - W(J[side + a_])).length; h0, t0 = CAP[side + a_]
        p = p + (t0 - h0).normalized() * L; pos[side + b_] = p
set_bones(arm, pos, {})
bind(arm)

# 4. the cloak (blue cloth below the shoulders) rides the spine and hips, not the legs and arms (Titus; a soldier's blue is his tunic)
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
    if b > .25 and b > r * 1.6 and b > g * 1.3: blue.update(p.vertices)
# the cloak's inside is not blue: anything well behind his legs and back is cloak too
for v in T.data.vertices:
    mzv = (v.co.z - FLOOR) / s; my = (v.co.y - off.y) / s; mx_ = (v.co.x - off.x) / s
    if not SOLDIER and abs(mx_) < .3 and ((mzv < .34 and my > .085) or (mzv < .75 and my > .125)): blue.add(v.index)
G = {g.name: g for g in T.vertex_groups}
shoulder_z = W(J['Spine2'])[2]; hip_z = W(J['Hips'])[2]
fixed = 0
for vi in (blue if not SOLDIER else []):
    v = T.data.vertices[vi]; z = v.co.z
    if z > shoulder_z or (abs(v.co.x - pos['Hips'].x) < W((.12, 0, 0)).x - off.x and v.co.y < pos['Hips'].y): continue   # (the drape on the shoulders, and anything in front of the body, keep their own)
    for g in list(v.groups): T.vertex_groups[g.group].remove([vi])
    t = max(0, min(1, (z - hip_z) / (shoulder_z - hip_z)))
    G['Spine1'].add([vi], .3 + .4 * t, 'REPLACE'); G['Hips'].add([vi], .7 - .4 * t, 'REPLACE'); fixed += 1
print('cloak verts tied to the back', fixed, 'blue verts', len(blue))
# 5. armour moves as armour: greaves rigid on the shin, sandals on the foot, the kilt strips mostly on the hips
mz = lambda v: (v.co.z - FLOOR) / s
def setw(vi, pairs):
    v = T.data.vertices[vi]
    for g in list(v.groups): T.vertex_groups[g.group].remove([vi])
    for name, wt in pairs: G[name].add([vi], wt, 'REPLACE')
# the fused mesh joins the kilt strips to the thighs: hard edges between bones would tear it, so smooth the weights
# over the legs and hips (the cloak, tied to the back above, is left out)
bpy.ops.object.select_all(action='DESELECT'); T.select_set(True); bpy.context.view_layer.objects.active = T
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT'); bpy.ops.object.mode_set(mode='OBJECT')
for v in T.data.vertices:
    z = mz(v); v.select = (SOLDIER or v.index not in blue) and J['LeftLeg'][2] - .05 < z < (.62 if not SOLDIER else .66)   # (the knee and the kilt; the shin and foot are set rigid after)
bpy.ops.object.mode_set(mode='WEIGHT_PAINT'); T.data.use_paint_mask_vertex = True
bpy.ops.object.vertex_group_smooth(group_select_mode='ALL', factor=.5, repeat=8 if not SOLDIER else 3, expand=0)   # (fewer passes on the coarse soldier: each reaches further)
bpy.ops.object.vertex_group_limit_total(group_select_mode='ALL', limit=4)
bpy.ops.object.vertex_group_normalize_all(group_select_mode='ALL', lock_active=False)
T.data.use_paint_mask_vertex = False; bpy.ops.object.mode_set(mode='OBJECT')
nk = {'shin': 0, 'foot': 0, 'kilt': 0, 'crease': 0}
for v in T.data.vertices:
    if v.index in blue and not SOLDIER: continue
    z = mz(v); x = (v.co.x - off.x) / s; side = 'Left' if x > 0 else 'Right'
    if abs(x) > .21 or z > .62: continue                     # (hands, arms, body above the belt keep their own)
    if z < .10:
        y = (v.co.y - off.y) / s
        setw(v.index, [(side + 'Foot', .55), (side + 'ToeBase', .45)] if y < -.06 else [(side + 'Foot', 1)]); nk['foot'] += 1
    elif .14 < z < J['LeftLeg'][2] - .02 and abs(x) > .04:   # (up to just below the knee joint: all of the shin)                    # the greave: the shin (the knee above keeps a soft blend)
        setw(v.index, [(side + 'Leg', 1)]); nk['shin'] += 1
# a leg never follows the other leg (the decimated mesh can join them low down): drop the far side's leg bones
LEGB = ('UpLeg', 'Leg', 'Foot', 'ToeBase'); gname = {g.index: g.name for g in T.vertex_groups}; cut = 0
for v in T.data.vertices:
    x = (v.co.x - off.x) / s
    if abs(x) < .03: continue
    far = 'Right' if x > 0 else 'Left'
    gs = [(g.group, g.weight) for g in v.groups]
    bad = [gi for gi, w in gs if gname[gi].startswith(far) and gname[gi][len(far):] in LEGB]
    if not bad: continue
    keep = [(gi, w) for gi, w in gs if gi not in bad]; tot = sum(w for _, w in keep)
    for gi in bad: T.vertex_groups[gi].remove([v.index])
    if tot > 1e-4:
        for gi, w in keep: T.vertex_groups[gi].add([v.index], w / tot, 'REPLACE')
    else: T.vertex_groups[gname and [n for n in gname.values() if n == 'Hips'][0]].add([v.index], 1, 'REPLACE')
    cut += 1
print('cross-leg weights removed', cut)
print('reweighted', nk)
# the archer's quiver and arrows ride his upper back, not his arm or head
if ARCH:
    nq = 0
    for v in T.data.vertices:
        z = mz(v); x = (v.co.x - off.x) / s; y = (v.co.y - off.y) / s
        if (y > .09 and z > .55 and abs(x) < .25) or (z > .9 and x < -.1): setw(v.index, [('Spine2', 1)]); nq += 1
    print('quiver verts', nq)
bpy.ops.wm.save_as_mainfile(filepath=out)
print('SAVED', out)
