# Titus's gladius: a Pompeii-style short sword. Straight, parallel-edged blade with a short triangular point and a
# raised midrib; brass guard; ribbed wooden grip; ball pommel. Metres; origin at the middle of the grip; the point
# along three.js +z (Blender -y), the edge's flat facing x. About 300 triangles. Usage: <out.glb>
import bpy, bmesh, math, sys
from mathutils import Vector
out = sys.argv[-1]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
def mat(name, rgb, metal, rough):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Metallic'].default_value = metal; b.inputs['Roughness'].default_value = rough; return m
STEEL, BRASS, WOOD = mat('blade_steel', (.62, .64, .66), .9, .3), mat('guard_brass', (.62, .45, .18), .9, .4), mat('grip_wood', (.28, .17, .09), 0, .8)
def obj(name, bm, m, smooth=False):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = smooth
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); me.materials.append(m); return o
# the blade: a lozenge section (midrib), width .05, thick .008; straight from the guard (y=-.07) to .52, then the point
bm = bmesh.new(); W, T = .034, .006   # (a touch broad, so it reads at game distance)
prof = [(-.075, W), (-.47, W * .96), (-.53, W * .55), (-.60, 0)]   # (y, half width) from guard to tip
rings = []
for y, w in prof:
    rings.append([bm.verts.new((w, y, 0)), bm.verts.new((0, y, T)), bm.verts.new((-w, y, 0)), bm.verts.new((0, y, -T))])
for a, b in zip(rings, rings[1:]):
    for i in range(4): bm.faces.new((a[i], a[(i + 1) % 4], b[(i + 1) % 4], b[i]))
bm.faces.new(rings[0][::-1])
bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6); obj('blade', bm, STEEL)
# the guard: a flat brass bar with rounded ends; the grip: ribbed wood; the pommel: a brass ball
bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1)
for v in bm.verts: v.co = Vector((v.co.x * .085, -.065 + v.co.y * .02, v.co.z * .03))
obj('guard', bm, BRASS)
for i, (y0, r) in enumerate([(-.045, .016), (-.015, .018), (.015, .016), (.045, .018)]):
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=10, radius1=r, radius2=r, depth=.03)
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=__import__('mathutils').Matrix.Rotation(math.pi / 2, 3, 'X'))
    for v in bm.verts: v.co.y += y0
    obj('grip_%d' % i, bm, WOOD, True)
bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=12, v_segments=8, radius=.028)
for v in bm.verts: v.co = Vector((v.co.x * 1.15, .078 + v.co.y * .8, v.co.z))
obj('pommel', bm, BRASS, True)
print('TRIS', sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in bpy.data.objects if o.type == 'MESH'))
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB'); print('WROTE', out)
