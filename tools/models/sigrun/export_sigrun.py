# (C5) Sigrun's export: titus/export_titus.py with her team cloth picked by place as well as colour (her tunic is
# the same blue-grey as her cloak): the cloak over the shoulders and down her back is team colour, the tunic not.
# Exports the rigged Titus for the game: textures to 1024 (colour only: the game's lighting is flat and cheap),
# the blue cloth (cloak, crest) as its own material over a grey copy of the texture so the game tints it to the
# team, skeleton and skin, no clips (he plays the captain's). Usage: <titus_rig.blend> <out.glb> <full.glb>
import bpy, sys, numpy as np
blend, out, full = sys.argv[-3], sys.argv[-2], sys.argv[-1]
bpy.ops.wm.open_mainfile(filepath=blend)
T = bpy.data.objects['titus']; arm = bpy.data.objects['Armature']
src = None
for m in T.data.materials:
    for n in (m.node_tree.nodes if m and m.use_nodes else []):
        if n.type == 'TEX_IMAGE' and 'normal' not in n.image.name and 'metal' not in n.image.name: src = n.image
src.scale(1024, 1024)
px = np.empty(1024 * 1024 * 4, np.float32); src.pixels.foreach_get(px); px = px.reshape(-1, 4)
col = bpy.data.images.new('sigrun_col', 1024, 1024); col.pixels.foreach_set(px.ravel()); col.file_format = 'JPEG'
lum = (px[:, :3] @ np.array([.299, .587, .114], np.float32))
r, g, b = px[:, 0], px[:, 1], px[:, 2]; isblue = (b > .15) & (b > r * 1.2) & (b > g * 1.08)
k = .85 / max(1e-3, float(np.median(lum[isblue]))) if isblue.any() else 1.0   # (the cloth's middle tone reads as the team's own colour)
gry = np.repeat(np.clip(lum * k, 0, 1)[:, None], 3, 1); gry = np.concatenate([gry, np.ones((len(gry), 1), np.float32)], 1)
team = bpy.data.images.new('sigrun_team', 1024, 1024); team.pixels.foreach_set(gry.ravel()); team.file_format = 'JPEG'

def material(name, image):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; bsdf = nt.nodes['Principled BSDF']
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = image; nt.links.new(t.outputs['Color'], bsdf.inputs['Base Color'])
    bsdf.inputs['Metallic'].default_value = 0; bsdf.inputs['Roughness'].default_value = .8
    return m
body, cloth = material('sigrun_body', col), material('sigrun_team_cloth', team)
uv = T.data.uv_layers.active.data
T.data.materials.clear(); T.data.materials.append(body); T.data.materials.append(cloth)
import statistics
YM = statistics.median(v.co.y for v in T.data.vertices)
n = 0
for p in T.data.polygons:
    u = sum(uv[i].uv.x for i in p.loop_indices) / p.loop_total; v = sum(uv[i].uv.y for i in p.loop_indices) / p.loop_total
    x = min(1023, max(0, int(u % 1 * 1024))); y = min(1023, max(0, int(v % 1 * 1024))); q = px[y * 1024 + x]
    c = p.center; zm = (c.z + .998) / 1.579; back = c.y > YM + .045 * 1.579
    blu = q[2] > .15 and q[2] > q[0] * 1.2 and q[2] > q[1] * 1.08
    blu2 = q[2] > .1 and q[2] > q[0] * 1.05
    p.material_index = 1 if (blu and zm > .80) or (blu2 and back and zm > .33) else 0; n += p.material_index
print('team cloth faces', n, 'of', len(T.data.polygons))
for o in list(bpy.data.objects):
    if o not in (T, arm): bpy.data.objects.remove(o)
if arm.animation_data: arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis.identity()
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', export_animations=False, export_image_format='JPEG', export_jpeg_quality=85,
                          export_skins=True, export_morph=False, export_yup=True)
print('WROTE', out)
