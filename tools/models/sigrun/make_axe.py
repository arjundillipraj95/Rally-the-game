# Sigrun's bearded axe (and her swordsmen's): an ash haft with leather wraps, an iron head with a long lower beard and a
# bright edge. Metres; origin at the middle of the grip; the head along three.js +z (Blender -y), the edge facing +x, the
# flat facing z (as titus/make_gladius.py, so it sits in the sword's hand and swings the same). ~250 triangles. <out.glb>
import bpy, bmesh, math, sys
from mathutils import Vector, Matrix
out = sys.argv[-1]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
def mat(name, rgb, metal, rough):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Metallic'].default_value = metal; b.inputs['Roughness'].default_value = rough; return m
IRON, EDGE, WOOD, LEATHER = mat('axe_iron', (.32, .33, .35), .85, .45), mat('axe_edge', (.75, .77, .8), .95, .25), mat('axe_haft', (.42, .28, .15), 0, .8), mat('axe_wrap', (.22, .12, .06), 0, .9)
def obj(name, bm, m, smooth=False):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = smooth
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); me.materials.append(m); return o
def cyl(name, y0, y1, r0, r1, m, seg=8):
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r0, radius2=r1, depth=abs(y1 - y0))
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(-math.pi / 2, 3, 'X'))
    for v in bm.verts: v.co.y += (y0 + y1) / 2
    return obj(name, bm, m, True)
cyl('haft', .09, -.53, .016, .014, WOOD)                      # (grip end at +.09, the head end at -.50)
cyl('wrap', .07, -.08, .019, .019, LEATHER)
cyl('knob', .11, .085, .021, .021, IRON)
# the head: a flat plate (thick .012) in the x-y plane: eye round the haft, a narrow neck, the blade flaring out with a
# long beard hanging down toward the hand; the edge a brighter strip
T = .007
outline = [(-.02, -.44), (.02, -.44), (.045, -.43), (.08, -.40), (.115, -.365), (.135, -.37), (.148, -.43), (.152, -.49),
           (.15, -.54), (.06, -.525), (.02, -.52), (-.02, -.52), (-.03, -.48)]   # (the beard hangs toward the hand)
bm = bmesh.new()
top = [bm.verts.new((x, y, T)) for x, y in outline]; bot = [bm.verts.new((x, y, -T)) for x, y in outline]
bm.faces.new(top); bm.faces.new(bot[::-1])
n = len(outline)
for i in range(n): bm.faces.new((top[i], top[(i + 1) % n], bot[(i + 1) % n], bot[i]))
bmesh.ops.triangulate(bm, faces=bm.faces[:]); obj('head', bm, IRON)
# the edge: a thin bright strip along the blade's front (x .13-.155)
edge = [(.135, -.37), (.148, -.43), (.152, -.49), (.15, -.54)]
bm = bmesh.new(); vs = []
for x, y in edge:
    vs.append((bm.verts.new((x - .012, y, T * 1.05)), bm.verts.new((x + .006, y, 0)), bm.verts.new((x - .012, y, -T * 1.05))))
for a, b in zip(vs, vs[1:]):
    bm.faces.new((a[0], b[0], b[1], a[1])); bm.faces.new((a[1], b[1], b[2], a[2]))
obj('edge', bm, EDGE)
print('TRIS', sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in bpy.data.objects if o.type == 'MESH'))
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB'); print('WROTE', out)
