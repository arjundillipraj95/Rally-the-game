import bpy, sys, math
from mathutils import Vector
bpy.ops.wm.open_mainfile(filepath=sys.argv[-2]); out=sys.argv[-1]
arm=bpy.data.objects['Armature']
if arm.animation_data: arm.animation_data.action=None
for pb in arm.pose.bones: pb.matrix_basis.identity()
sc=bpy.context.scene; w=bpy.data.worlds.new('w'); sc.world=w; w.use_nodes=True; w.node_tree.nodes['Background'].inputs[0].default_value=(.7,.7,.72,1)
sc.render.engine='CYCLES'; sc.cycles.samples=8; sc.render.resolution_x=500; sc.render.resolution_y=500
cam=bpy.data.objects.new('cam',bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera=cam; cam.data.type='ORTHO'; cam.data.ortho_scale=2.2
for n,pos in [('front',(0,-5,0)),('side',(5,0,0))]:
    c=Vector((0,0,0)); cam.location=pos; cam.rotation_euler=(c-Vector(pos)).to_track_quat('-Z','Y').to_euler()
    sc.render.filepath=f'{out}_{n}.png'; bpy.ops.render.render(write_still=True)
