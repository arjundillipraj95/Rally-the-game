# The far figure from an exported body (<name>_anim.glb: 1024 colour and the team cloth already split), as
# titus/make_lod.py does from the .blend: arms lowered to the sides, skin applied, slimmed to ~800 triangles, no
# skeleton. Usage: <body_anim.glb> <out_lod.glb> [tris]
import bpy, sys, math
from mathutils import Matrix
src, out = sys.argv[-2], sys.argv[-1]
tris = 800
if sys.argv[-1].isdigit(): src, out, tris = sys.argv[-3], sys.argv[-2], int(sys.argv[-1])
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
bpy.ops.import_scene.gltf(filepath=src)
arm = [o for o in bpy.data.objects if o.type == 'ARMATURE'][0]; T = max((o for o in bpy.data.objects if o.type == 'MESH'), key=lambda o: len(o.data.vertices))
bpy.context.view_layer.update()
for side in ('Left', 'Right'):
    pb = arm.pose.bones[side + 'Arm']; M0 = pb.matrix.copy(); loc = M0.to_translation(); best = None
    for ax in ('X', 'Y', 'Z'):
        for ang in (70, -70):
            pb.matrix = Matrix.Translation(loc) @ Matrix.Rotation(math.radians(ang), 4, ax) @ Matrix.Translation(-loc) @ M0; bpy.context.view_layer.update()
            z = (arm.matrix_world @ arm.pose.bones[side + 'Hand'].head).z
            if best is None or z < best[0]: best = (z, ang, ax)
    pb.matrix = Matrix.Translation(loc) @ Matrix.Rotation(math.radians(best[1]), 4, best[2]) @ Matrix.Translation(-loc) @ M0; bpy.context.view_layer.update()
bpy.context.view_layer.objects.active = T; T.select_set(True)
mw = T.matrix_world.copy()
m = [x for x in T.modifiers if x.type == 'ARMATURE'][0]; bpy.ops.object.modifier_apply(modifier=m.name)
T.parent = None; T.matrix_world = mw; T.vertex_groups.clear()
d = T.modifiers.new('d', 'DECIMATE'); d.ratio = tris / max(1, len(T.data.polygons)); bpy.ops.object.modifier_apply(modifier='d')
print('tris', sum(len(p.vertices) - 2 for p in T.data.polygons))
for o in list(bpy.data.objects):
    if o is not T: bpy.data.objects.remove(o)
for im in bpy.data.images:
    if im.size[0] > 512: im.scale(512, 512)
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', export_image_format='JPEG', export_jpeg_quality=80)
print('WROTE', out)
