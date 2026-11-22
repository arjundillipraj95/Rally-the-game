# The Viking round shield (Sigrun's and her swordsmen's): planks, an iron boss and a leather-bound rim; the face painted
# in quarters, two of them the team colour (material 'roundshield_team', tinted by the game) and two bare wood. Domed a
# little. Metres: .62 across; origin at the grip behind the boss; the front faces three.js -Z (Blender +Y), as the
# scutum (titus/make_scutum.py). ~300 triangles. Usage: <out.glb>
import bpy, bmesh, math, sys
from mathutils import Vector
out = sys.argv[-1]
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
def mat(name, rgb, metal, rough):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Metallic'].default_value = metal; b.inputs['Roughness'].default_value = rough; return m
TEAM, WOOD, IRON, RIM = mat('roundshield_team', (.85, .85, .85), 0, .75), mat('roundshield_wood', (.62, .5, .36), 0, .85), mat('roundshield_iron', (.35, .36, .38), .85, .4), mat('roundshield_rim', (.25, .15, .08), 0, .8)
R, SEG, RINGS, DOME, GRIP = .31, 24, 4, .035, .05
def obj(name, bm, mats, smooth=False):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = smooth
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    for m in mats: me.materials.append(m)
    return o
# the face: rings of quads from the boss out to the rim, its y (forward) falling off from the dome's top
bm = bmesh.new(); rings = []
for k in range(RINGS + 1):
    r = .07 + (R - .07) * k / RINGS; y = GRIP + DOME * (1 - (r / R) ** 2)
    rings.append([bm.verts.new((r * math.cos(2 * math.pi * i / SEG), y, r * math.sin(2 * math.pi * i / SEG))) for i in range(SEG)])
for a, b in zip(rings, rings[1:]):
    for i in range(SEG):
        f = bm.faces.new((a[i], a[(i + 1) % SEG], b[(i + 1) % SEG], b[i])); f.material_index = 0 if (i * 4 // SEG) % 2 == 0 else 1
back = [bm.verts.new((v.co.x, GRIP - .015, v.co.z)) for v in rings[-1]]
for i in range(SEG): f = bm.faces.new((rings[-1][(i + 1) % SEG], rings[-1][i], back[i], back[(i + 1) % SEG])); f.material_index = 1
bm.faces.new(back[::-1]).material_index = 1
bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:]); obj('face', bm, [TEAM, WOOD])
# the rim: a leather band round the edge; the boss: an iron dome
bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=False, segments=SEG, radius1=R + .008, radius2=R + .008, depth=.03)
bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=__import__('mathutils').Matrix.Rotation(math.pi / 2, 3, 'X'))
for v in bm.verts: v.co.y += GRIP - .002
obj('rim', bm, [RIM], True)
bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=12, v_segments=6, radius=.075)
for v in list(bm.verts):
    if v.co.z < -1e-4: bm.verts.remove(v)
for v in bm.verts: v.co = Vector((v.co.x, GRIP + DOME + v.co.z * .8, v.co.y))
obj('boss', bm, [IRON], True)
print('TRIS', sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in bpy.data.objects if o.type == 'MESH'))
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB'); print('WROTE', out)
