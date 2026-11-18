# Renders the rigged Titus in a few of the captain's clips, to check the skin follows the skeleton.
import bpy, sys, math
from mathutils import Vector
blend, out = sys.argv[-2], sys.argv[-1]
bpy.ops.wm.open_mainfile(filepath=blend)
arm = bpy.data.objects['Armature']; T = bpy.data.objects['titus']
sc = bpy.context.scene
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs[0].default_value = (.6, .62, .66, 1)
bpy.ops.object.light_add(type='SUN', location=(0, 0, 5)); L = bpy.context.object; L.data.energy = 3; L.rotation_euler = (math.radians(40), 0, math.radians(-30))
sc.render.engine = 'CYCLES'; sc.cycles.samples = 12; sc.render.resolution_x = 420; sc.render.resolution_y = 560
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam; cam.data.lens = 45
shots = [('rest', None, 0), ('idle', 'idle', .3), ('walk', 'walk', .25), ('run', 'run', .5), ('slash1', 'slash1', .45), ('shieldBash', 'shieldBash', .5), ('block', 'block', .6), ('leapSmash', 'leapSmash', .4)]
if arm.animation_data is None: arm.animation_data_create()
for name, act, f in shots:
    if act:
        a = bpy.data.actions[act]; arm.animation_data.action = a
        try: arm.animation_data.action_slot = a.slots[0]
        except Exception: pass
        f0, f1 = a.frame_range; sc.frame_set(int(f0 + (f1 - f0) * f))
    else:
        arm.animation_data.action = None
        for pb in arm.pose.bones: pb.matrix_basis.identity()
        sc.frame_set(0)
    bpy.context.view_layer.update()
    c = Vector((0, 0, -.1)); pos = c + Vector((2.2, -4.2, .6))
    cam.location = pos; cam.rotation_euler = (c - pos).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = f'{out}_{name}.png'; bpy.ops.render.render(write_still=True); print('R', name)
