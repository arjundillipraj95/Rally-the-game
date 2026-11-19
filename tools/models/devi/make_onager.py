# (C2) The stone thrower for the game, from the Hunyuan onager: slimmed to about 4,000 triangles, colour texture at 1024,
# scaled to the map (about 2.6 m long, wheels 0.7 m), and cut in two: the base (frame, wheels, axle and its rope) and
# the throwing arm (beam and cup), which is its own node with its origin on the axle, so the game swings it round x.
# The model's front (the tiger) faces -y in Blender (+z in three.js); the arm lies back and up.
# Usage: <onager.glb> <out.glb> <check prefix>
import bpy, bmesh, sys, math, numpy as np
from mathutils import Vector
src, out, chk = sys.argv[-3], sys.argv[-2], sys.argv[-1]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
bpy.ops.import_scene.gltf(filepath=src)
O = [o for o in bpy.data.objects if o.type == 'MESH'][0]; O.name = 'onager_base'
bpy.context.view_layer.objects.active = O; O.select_set(True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
bm = bmesh.new(); bm.from_mesh(O.data); bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5); bm.to_mesh(O.data); bm.free()
d = O.modifiers.new('d', 'DECIMATE'); d.ratio = .08; d.use_collapse_triangulate = True; bpy.ops.object.modifier_apply(modifier='d')
AXLE = Vector((0, -.167, .344))   # the arm's axle (the bolt between the uprights, read off the side view)
S = 4.2                           # model units -> metres
# the arm: the beam (narrower than the bundle it comes out of, rising from z .31-.38 at the bundle to the cup) and the cup
me = O.data
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT'); bpy.ops.object.mode_set(mode='OBJECT')
n = 0
for v in me.vertices:
    c = v.co; t = (c.y + .17) / .57; beam_z = .34 + .11 * t       # (the beam's centre line: the bundle's axis to the cup's root)
    beam = abs(c.x) < .05 and -.125 < c.y < .45 and abs(c.z - beam_z) < .06
    cup = abs(c.x) < .11 and c.y > .42 and c.z > .40
    v.select = beam or cup; n += v.select
print('arm verts', n, 'of', len(me.vertices))
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.separate(type='SELECTED'); bpy.ops.object.mode_set(mode='OBJECT')
A = [o for o in bpy.data.objects if o.type == 'MESH' and o is not O][0]; A.name = 'onager_arm'
# both into metres, base on the floor, centred; the arm's origin on the axle
P = np.array([v.co[:] for v in O.data.vertices]); cx, cy = (P[:, 0].min() + P[:, 0].max()) / 2, (P[:, 1].min() + P[:, 1].max()) / 2
shift = Vector((-cx, -cy, 0))
for ob in (O, A):
    for v in ob.data.vertices: v.co = (v.co + shift) * S
    ob.data.update()
pivot = (AXLE + shift) * S
for v in A.data.vertices: v.co -= pivot
A.data.update(); A.location = pivot
# textures: colour only, 1024, one material shared
img = None
for m in O.data.materials:
    for nd in (m.node_tree.nodes if m and m.use_nodes else []):
        if nd.type == 'TEX_IMAGE' and 'normal' not in nd.image.name and 'metal' not in nd.image.name: img = nd.image
img.scale(1024, 1024)
mat = bpy.data.materials.new('onager'); mat.use_nodes = True; nt = mat.node_tree; bsdf = nt.nodes['Principled BSDF']
t = nt.nodes.new('ShaderNodeTexImage'); t.image = img; nt.links.new(t.outputs['Color'], bsdf.inputs['Base Color'])
bsdf.inputs['Metallic'].default_value = 0; bsdf.inputs['Roughness'].default_value = .8
for ob in (O, A): ob.data.materials.clear(); ob.data.materials.append(mat)
P = np.array([v.co[:] for v in O.data.vertices])
print('tris', sum(len(p.vertices) - 2 for ob in (O, A) for p in ob.data.polygons), 'size', [round(float(x), 2) for x in np.ptp(P, 0)], 'axle', [round(x, 3) for x in pivot])
for o in list(bpy.data.objects):
    if o not in (O, A): bpy.data.objects.remove(o)
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', export_image_format='JPEG', export_jpeg_quality=85, export_yup=True)
print('WROTE', out)
# check: at rest and fired (the arm swung 70 degrees up and over, +x in Blender)
sc = bpy.context.scene; w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs[0].default_value = (.62, .64, .68, 1)
bpy.ops.object.light_add(type='SUN'); L = bpy.context.object; L.data.energy = 3; L.rotation_euler = (math.radians(40), 0, math.radians(-30))
sc.render.engine = 'CYCLES'; sc.cycles.samples = 10; sc.render.resolution_x = 520; sc.render.resolution_y = 420
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
c = Vector((0, 0, 1.0)); p = Vector((-6, -5, 3)); cam.location = p; cam.rotation_euler = (c - p).to_track_quat('-Z', 'Y').to_euler()
for name, ang in (('rest', 0), ('fired', 70)):
    A.rotation_mode = 'XYZ'; A.rotation_euler = (math.radians(ang), 0, 0); sc.render.filepath = f'{chk}_{name}.png'; bpy.ops.render.render(write_still=True)
