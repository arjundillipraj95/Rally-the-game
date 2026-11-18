# The horse's legs posed as the game's gait will: hips swung forward/back and knees folded, from the side.
import bpy, sys, math
from mathutils import Matrix, Vector
bpy.ops.wm.open_mainfile(filepath=sys.argv[-2]); out = sys.argv[-1]
arm = bpy.data.objects['rig']; sc = bpy.context.scene
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs[0].default_value = (.62, .64, .68, 1)
bpy.ops.object.light_add(type='SUN'); L = bpy.context.object; L.data.energy = 3; L.rotation_euler = (math.radians(-50), 0, math.radians(30))
sc.render.engine = 'CYCLES'; sc.cycles.samples = 10; sc.render.resolution_x = 520; sc.render.resolution_y = 420
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam; cam.data.type = 'ORTHO'; cam.data.ortho_scale = 4.6
cam.location = (-8, -1.5, -.1); cam.rotation_euler = Matrix(((0, 0, -1), (0, -1, 0), (-1, 0, 0))).to_euler()   # (looking along +x, up is -y)
def pose(sw):
    for pb in arm.pose.bones: pb.matrix_basis.identity()
    bpy.context.view_layer.update()
    for name, (hip, knee) in sw.items():
        for bn, ang in (('leg_' + name, hip), ('knee_' + name, knee)):
            pb = arm.pose.bones[bn]; bpy.context.view_layer.update(); M = pb.matrix.copy(); loc = M.to_translation()
            pb.matrix = Matrix.Translation(loc) @ Matrix.Rotation(ang, 4, 'X') @ Matrix.Translation(-loc) @ M
    bpy.context.view_layer.update()
frames = {'stand': {}, 'walk': {'frontL': (-.3, 0), 'frontR': (.3, .6), 'backL': (.3, 0), 'backR': (-.3, -.5)},
          'gallop': {'frontL': (-.72, 0), 'frontR': (-.5, .9), 'backL': (.72, 0), 'backR': (.5, -.7)}, 'tuck': {'frontL': (.4, 1.25), 'frontR': (.2, 1.0), 'backL': (-.3, -.8), 'backR': (-.5, -.9)}}
for n, sw in frames.items():
    pose(sw); sc.render.filepath = f'{out}_{n}.png'; bpy.ops.render.render(write_still=True)
