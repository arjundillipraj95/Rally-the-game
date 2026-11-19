# (C4) Devi's Chola bow: a tall recurve of horn and bamboo with brass tips, a leather grip between two brass bands and
# the Chola tiger as a brass plate on the grip's face (design doc, Devi's looks, 18 Nov). Strung: the limbs bend back
# toward the archer and the tips flip forward again (the recurve). Metres; 1.35 m tip to tip; origin at the middle of
# the grip; the limbs along Blender z (three.js +y), the bow's face (the tiger) toward Blender -y (three.js +z, the
# way she aims), the string on the +y side. About 700 triangles. Also writes an arrow (0.75 m, point along three.js
# +z). Usage: <bow.glb> <arrow.glb>
import bpy, bmesh, math, sys
from mathutils import Vector, Matrix
out, out_arrow = sys.argv[-2], sys.argv[-1]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
def mat(name, rgb, metal, rough):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Metallic'].default_value = metal; b.inputs['Roughness'].default_value = rough; return m
HORN, BAMBOO, BRASS = mat('bow_horn', (.17, .10, .06), 0, .5), mat('bow_bamboo', (.55, .40, .20), 0, .7), mat('bow_brass', (.62, .45, .18), .9, .4)
LEATHER, STRING, FLETCH = mat('bow_leather', (.30, .17, .09), 0, .85), mat('bow_string', (.85, .80, .68), 0, .8), mat('arrow_fletch', (.12, .10, .09), 0, .9)
def obj(name, bm, m, smooth=True):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = smooth
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); me.materials.append(m); return o
L = .675   # one limb, grip to tip
def back(t):   # how far toward the archer (+y) the limb's middle line sits, t = 0 at the grip, 1 at the tip
    return .17 * min(t, .85) ** 2 / .85 ** 2 - (.06 * ((t - .85) / .15) ** 1.5 if t > .85 else 0)
def limb(sign, m, t0, t1, n):
    """the limb from t0 to t1 (sign 1 up, -1 down): a flat lens section, widest at the grip"""
    bm = bmesh.new(); rings = []
    for i in range(n + 1):
        t = t0 + (t1 - t0) * i / n; z = sign * (.07 + (L - .07) * t); y = back(t)
        w, th = .019 - .009 * t, .013 - .006 * t
        rings.append([bm.verts.new((w, y, z)), bm.verts.new((0, y - th, z)), bm.verts.new((-w, y, z)), bm.verts.new((0, y + th * .6, z))])
    for a, b in zip(rings, rings[1:]):
        for k in range(4):
            f = (a[k], a[(k + 1) % 4], b[(k + 1) % 4], b[k]); bm.faces.new(f if sign > 0 else f[::-1])
    bm.faces.new(rings[0][::-1] if sign > 0 else rings[0]); bm.faces.new(rings[-1] if sign > 0 else rings[-1][::-1])
    return obj('limb', bm, m)
for sign in (1, -1):
    limb(sign, HORN, 0, .55, 10); limb(sign, BAMBOO, .55, .93, 7); limb(sign, HORN, .93, 1, 2)   # (horn belly by the grip, bamboo, horn ears)
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=8, radius1=.011, radius2=.004, depth=.05)   # the brass tip
    if sign < 0: bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi, 3, 'X'))
    for v in bm.verts: v.co += Vector((0, back(1), sign * (L + .015)))
    obj('tip', bm, BRASS)
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=10, radius1=.024, radius2=.024, depth=.014)   # a brass band at each end of the grip
    for v in bm.verts: v.co.z += sign * .075
    obj('band', bm, BRASS)
# the grip: leather over the riser
bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=10, radius1=.021, radius2=.021, depth=.14)
for v in bm.verts: v.co.y *= 1.25
obj('grip', bm, LEATHER)
# the tiger: a brass plate on the grip's face
bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=12, radius1=.024, radius2=.02, depth=.008)
bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi / 2, 3, 'X'))
for v in bm.verts: v.co += Vector((0, -.03, .0))
obj('tiger', bm, BRASS)
# the string: tip to tip on the archer's side
top, bot = Vector((0, back(1) + .006, L)), Vector((0, back(1) + .006, -L))
bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=False, segments=4, radius1=.0025, radius2=.0025, depth=(top - bot).length)
obj('string', bm, STRING, False).location = Vector((0, back(1) + .006, 0))
tris = sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in bpy.data.objects if o.type == 'MESH')
print('TRIS', tris, 'tip back', round(back(1), 3), 'deepest', round(max(back(i / 100) for i in range(101)), 3))
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB'); print('WROTE', out)
# the arrow: dark shaft, steel head, dark fletching; point along Blender -y (three.js +z); origin at the nock
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
STEEL = mat('arrow_head', (.55, .56, .58), .9, .35)
bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=6, radius1=.0045, radius2=.0045, depth=.70)
bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi / 2, 3, 'X'))
for v in bm.verts: v.co.y -= .35
obj('shaft', bm, HORN)
bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=4, radius1=.011, radius2=0, depth=.05)
bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(-math.pi / 2, 3, 'X'))
for v in bm.verts: v.co.y -= .725
obj('head', bm, STEEL, False)
for k in range(3):
    bm = bmesh.new(); a = k * 2 * math.pi / 3
    vs = [bm.verts.new(Vector((math.cos(a) * r, y, math.sin(a) * r))) for y, r in ((-.02, .004), (-.12, .004), (-.10, .02), (-.03, .022))]
    bm.faces.new(vs); obj('fletch', bm, FLETCH, False)
bpy.ops.export_scene.gltf(filepath=out_arrow, export_format='GLB'); print('WROTE', out_arrow)
