# Bend test: the left knee bent 30/60/90 degrees (thigh raised with it), then walk, run and crouch frames, from the side.
# Usage: <rig.blend> <hipk> <out prefix>
import bpy, sys, math
from mathutils import Vector, Matrix
blend, hipk, out = sys.argv[-3], float(sys.argv[-2]), sys.argv[-1]
bpy.ops.wm.open_mainfile(filepath=blend)
arm = bpy.data.objects['Armature']; sc = bpy.context.scene
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs[0].default_value = (.62, .64, .68, 1)
bpy.ops.object.light_add(type='SUN'); L = bpy.context.object; L.data.energy = 3.2; L.rotation_euler = (math.radians(50), 0, math.radians(60))
sc.render.engine = 'CYCLES'; sc.cycles.samples = 10; sc.render.resolution_x = 380; sc.render.resolution_y = 460
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam; cam.data.type = 'ORTHO'; cam.data.ortho_scale = 2.0
if arm.animation_data is None: arm.animation_data_create()
# the clips' hip height, scaled to his hips (as the game will)
for a in bpy.data.actions:
    for l in a.layers:
        for st in l.strips:
            for cb in st.channelbags:
                for fc in cb.fcurves:
                    if fc.data_path.endswith('location'):
                        for k in fc.keyframe_points: k.co.y *= hipk; k.handle_left.y *= hipk; k.handle_right.y *= hipk
def shoot(name, zc):
    bpy.context.view_layer.update(); c = Vector((0, 0, zc)); pos = c + Vector((4, 0, 0))
    pos = c + Vector((3.2, -2.6, .4)); cam.location = pos; cam.rotation_euler = (c - pos).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = f'{out}_{name}.png'; bpy.ops.render.render(write_still=True)
def rot(pb, ang):
    bpy.context.view_layer.update(); M = pb.matrix.copy(); loc = M.to_translation()
    pb.matrix = Matrix.Translation(loc) @ Matrix.Rotation(math.radians(ang), 4, 'X') @ Matrix.Translation(-loc) @ M
arm.animation_data.action = None
for k in (30, 60, 90):
    for pb in arm.pose.bones: pb.matrix_basis.identity()
    rot(arm.pose.bones['LeftUpLeg'], -k * .7); rot(arm.pose.bones['LeftLeg'], k)
    shoot(f'knee{k}', -.55)
for pb in arm.pose.bones: pb.matrix_basis.identity()
for act, f in (('walk', .25), ('run', .5), ('crouch', .9)):
    a = bpy.data.actions[act]; arm.animation_data.action = a
    try: arm.animation_data.action_slot = a.slots[0]
    except Exception: pass
    f0, f1 = a.frame_range; sc.frame_set(int(f0 + (f1 - f0) * f)); shoot(act, -.4)
