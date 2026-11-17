# Titus's scutum for Rally: builds the shield, exports a GLB and renders previews.
# Run inside Blender's Scripting tab (set FACE to the texture path), or: python make_scutum.py <face.png> <out dir>
# Spec (design doc, 17 Nov): 1.05 m tall, 0.65 m wide, curved round its upright axis (radius 0.6 m), 2 cm thick,
# worn bronze rim, wood back, a grip behind the centre; origin at the grip; front faces -Z in three.js (Blender +Y).
import bpy, bmesh, math, sys, os

FACE = sys.argv[1] if len(sys.argv) > 1 else '//scutum_face.png'
OUT = sys.argv[2] if len(sys.argv) > 2 else bpy.path.abspath('//')
W, H, R, T = 0.65, 1.05, 0.60, 0.02   # width along the curve, height, curve radius, thickness
RIM = 0.022                             # bronze border showing round the face
SEG = 12                                # segments across the curve (keeps it under ~200 triangles)
GRIP_Y = -0.075                         # the grip sits behind the face; it becomes the origin

bpy.ops.wm.read_factory_settings(use_empty=True)

def mat(name, color, metal, rough, image=None):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1); b.inputs['Metallic'].default_value = metal
    b.inputs['Roughness'].default_value = rough
    if image:
        tex = m.node_tree.nodes.new('ShaderNodeTexImage'); tex.image = bpy.data.images.load(image)
        m.node_tree.links.new(tex.outputs['Color'], b.inputs['Base Color'])
    return m

bronze = mat('bronze_worn', (0.42, 0.28, 0.14), 0.8, 0.55)
wood = mat('wood_back', (0.22, 0.13, 0.07), 0.0, 0.9)
face = mat('scutum_face', (1, 1, 1), 0.0, 0.7, FACE)

def arc_panel(name, width, height, radius, uv=False):
    """A panel bent round the upright axis: centre at the front, edges curving back towards the holder."""
    me = bpy.data.meshes.new(name); ob = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(ob)
    bm = bmesh.new(); A = width / radius; cols = []
    for i in range(SEG + 1):
        a = -A / 2 + A * i / SEG
        x, y = radius * math.sin(a), radius * math.cos(a) - R
        cols.append((bm.verts.new((x, y, -height / 2)), bm.verts.new((x, y, height / 2))))
    uvl = bm.loops.layers.uv.new('UVMap')
    for i in range(SEG):
        (a0, a1), (b0, b1) = cols[i], cols[i + 1]
        f = bm.faces.new((a0, b0, b1, a1))
        for loop, (u, v) in zip(f.loops, ((i / SEG, 0), ((i + 1) / SEG, 0), ((i + 1) / SEG, 1), (i / SEG, 1))):
            loop[uvl].uv = (u, v)
    bm.normal_update()
    for f in bm.faces:   # face the front (+Y)
        if f.normal.y < 0: f.normal_flip()
    bm.to_mesh(me); bm.free()
    return ob

# body: full size, bronze front and edges, wood back (solidify pushes the back shell towards the holder)
body = arc_panel('scutum_body', W, H, R)
body.data.materials.append(bronze); body.data.materials.append(wood)
s = body.modifiers.new('thick', 'SOLIDIFY'); s.thickness = T; s.offset = -1
s.material_offset = 1; s.material_offset_rim = 0

# face: the painted leather, inset by the rim, 2 mm proud of the bronze
fc = arc_panel('scutum_face', W - 2 * RIM, H - 2 * RIM, R + 0.002, uv=True)
fc.data.materials.append(face)

# grip: a bar across the back of the centre, on two short posts
def box(name, size, loc, m):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.name = name
    o.scale = size; o.data.materials.append(m); return o
grip = box('grip', (0.14, 0.022, 0.022), (0, GRIP_Y, 0), wood)
posts = [box(f'post{i}', (0.02, abs(GRIP_Y) - T, 0.02), (sx, (GRIP_Y - T) / 2, 0), bronze) for i, sx in enumerate((-0.06, 0.06))]

# one object, origin at the grip
for o in bpy.context.scene.objects: o.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.object.convert(target='MESH')
bpy.ops.object.join()
sh = bpy.context.object; sh.name = 'scutum_titus'
bpy.context.scene.cursor.location = (0, GRIP_Y, 0)
bpy.ops.object.origin_set(type='ORIGIN_CURSOR'); sh.location = (0, 0, 0)
bpy.ops.object.shade_smooth()

tris = sum(len(p.vertices) - 2 for p in sh.data.polygons)
print('triangles', tris, 'materials by face', sorted({p.material_index for p in sh.data.polygons}), [m.name for m in sh.data.materials])
print('back faces', sum(1 for p in sh.data.polygons if sh.data.materials[p.material_index].name=='wood_back'))

bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'scutum_titus.glb'), export_format='GLB', use_selection=True, export_yup=True, export_image_format='JPEG')

# previews (only when run from the command line)
if len(sys.argv) > 2:
    sc = bpy.context.scene; sc.render.engine = 'CYCLES'; sc.cycles.samples = 48; sc.cycles.device = 'CPU'
    sc.render.resolution_x = sc.render.resolution_y = 640; sc.render.film_transparent = False
    w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.32, 0.33, 0.38, 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.8
    bpy.ops.object.light_add(type='SUN', rotation=(math.radians(50), 0, math.radians(30))); bpy.context.object.data.energy = 3.5
    bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam
    for tag, pos in (('front', (0.9, 2.2, 0.35)), ('back', (-1.1, -2.0, 0.4))):
        cam.location = pos
        d = -cam.location.normalized() if False else None
        direction = (-pos[0], -pos[1] + GRIP_Y * 0, -pos[2] + 0.0)
        import mathutils
        cam.rotation_euler = mathutils.Vector(direction).to_track_quat('-Z', 'Y').to_euler()
        cam.data.lens = 50
        sc.render.filepath = os.path.join(OUT, f'preview_{tag}.png'); bpy.ops.render.render(write_still=True)
