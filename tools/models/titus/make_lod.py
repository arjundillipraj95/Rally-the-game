# The far figure for a body: posed in the captain's 'idle' (hips at his own height), baked, slimmed to ~800
# triangles, two materials (body, team cloth), no skeleton. Usage: <rig.blend> <hipk> <out.glb>
import bpy, sys
blend, hipk, out = sys.argv[-3], float(sys.argv[-2]), sys.argv[-1]
bpy.ops.wm.open_mainfile(filepath=blend)
arm = bpy.data.objects['Armature']; T = bpy.data.objects['titus']; sc = bpy.context.scene
# standing easy: the T-pose with the arms lowered to his sides (whichever way about his forward axis takes the hand down)
import math
from mathutils import Matrix
if arm.animation_data: arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis.identity()
bpy.context.view_layer.update()
for side in ('Left', 'Right'):
    pb = arm.pose.bones[side + 'Arm']; M0 = pb.matrix.copy(); loc = M0.to_translation(); best = None
    for ang in (70, -70):
        pb.matrix = Matrix.Translation(loc) @ Matrix.Rotation(math.radians(ang), 4, 'Y') @ Matrix.Translation(-loc) @ M0; bpy.context.view_layer.update()
        z = arm.pose.bones[side + 'Hand'].head.z
        if best is None or z < best[0]: best = (z, ang)
    pb.matrix = Matrix.Translation(loc) @ Matrix.Rotation(math.radians(best[1]), 4, 'Y') @ Matrix.Translation(-loc) @ M0; bpy.context.view_layer.update()
bpy.context.view_layer.objects.active = T; T.select_set(True)
m = [x for x in T.modifiers if x.type == 'ARMATURE'][0]; bpy.ops.object.modifier_apply(modifier=m.name)
T.parent = None; T.vertex_groups.clear()
d = T.modifiers.new('d', 'DECIMATE'); d.ratio = 800 / max(1, len(T.data.polygons)); bpy.ops.object.modifier_apply(modifier='d')
print('tris', sum(len(p.vertices) - 2 for p in T.data.polygons))
for o in list(bpy.data.objects):
    if o is not T: bpy.data.objects.remove(o)
# (the materials and textures are the export's: run export_titus.py's material step first, so reuse its result)
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', export_image_format='JPEG', export_jpeg_quality=80)
print('WROTE', out)
