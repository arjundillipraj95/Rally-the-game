# (C5 fix) Re-place the wolf's lower-leg joints: build_wolf.py put them (knee .13 / hock .17) almost at the paw, so any
# fold flicked the paw about. Raised to the wrist/hock a real wolf has (front .21, back .24, in its own frame, hooves at 0)
# and the skin blend widened so the leg bends smoothly, no crease. Works on the finished glb (the raw source isn't kept).
# Usage: <wolf.glb in> <wolf.glb out>
import bpy, sys, math, numpy as np
from mathutils import Vector
src, out = sys.argv[-2], sys.argv[-1]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
bpy.ops.import_scene.gltf(filepath=src)
W = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name == 'wolf'); arm = next(o for o in bpy.data.objects if o.type == 'ARMATURE')
S = 2.1 / .53; KNEES = {'front': .21, 'back': .24}; HALF = .07             # (its own frame -> the old horse's frame is y = -z * S)
ss = lambda a, b, x: (lambda t: t * t * (3 - 2 * t))(min(1, max(0, (x - a) / (b - a))))
bpy.context.view_layer.objects.active = arm; bpy.ops.object.mode_set(mode='EDIT')
for k in ('frontL', 'frontR', 'backL', 'backR'):
    z = KNEES[k[:-1]] * S
    lg, kn = arm.data.edit_bones['leg_' + k], arm.data.edit_bones['knee_' + k]
    lg.tail = Vector((lg.tail.x, -z, lg.tail.z)); kn.head = Vector((kn.head.x, -z, kn.head.z))
bpy.ops.object.mode_set(mode='OBJECT')
G = W.vertex_groups
for k in ('frontL', 'frontR', 'backL', 'backR'):
    gl, gk = G['leg_' + k], G['knee_' + k]; K = KNEES[k[:-1]]; n = 0
    for v in W.data.vertices:
        wl = wk = 0
        for g in v.groups:
            if g.group == gl.index: wl = g.weight
            elif g.group == gk.index: wk = g.weight
        tot = wl + wk
        if tot <= 0: continue
        f = 1 - ss(K - HALF, K + HALF, -v.co.y / S)                          # (1 low down, below the joint)
        gl.add([v.index], tot * (1 - f), 'REPLACE'); gk.add([v.index], tot * f, 'REPLACE'); n += 1
    print(k, 'reweighted', n)
for o in bpy.context.selected_objects: o.select_set(False)
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', export_animations=False, export_image_format='JPEG', export_jpeg_quality=85, export_skins=True)
print('WROTE', out)
