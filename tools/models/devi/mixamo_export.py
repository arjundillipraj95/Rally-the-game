# (C4) Mixamo FBX clips (the longbow and dagger packs, kept on Arjun's Mac in Rally/assets/mixamo) -> the JSON that
# tools/models/extra.py puts on the game's 22-bone skeleton: each body part's turn from the T-pose in world space,
# frame by frame at 30 fps, and the hips' travel. Mixamo's skeleton is the game's own (bones 'mixamorig:<name>'), its
# rest pose the T-pose. Run with Blender's Python:  python3 tools/models/devi/mixamo_export.py -- <out folder> <clip.fbx>...
import bpy, sys, json, os
args = sys.argv[sys.argv.index('--') + 1:]
outdir, files = args[0], args[1:]
BONES = ['Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Head', 'LeftShoulder', 'LeftArm', 'LeftForeArm', 'LeftHand',
         'RightShoulder', 'RightArm', 'RightForeArm', 'RightHand', 'LeftUpLeg', 'LeftLeg', 'LeftFoot', 'LeftToeBase',
         'RightUpLeg', 'RightLeg', 'RightFoot', 'RightToeBase']
FPS = 30
os.makedirs(outdir, exist_ok=True)
for src in files:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.fbx(filepath=src)
    S = [o for o in bpy.data.objects if o.type == 'ARMATURE'][0]
    pre = 'mixamorig:' if ('mixamorig:Hips' in S.pose.bones) else ''
    act = S.animation_data.action if S.animation_data else None
    if act is None: print('no clip in', src); continue
    sc, vl = bpy.context.scene, bpy.context.view_layer
    def wq(b): return (S.matrix_world @ S.pose.bones[pre + b].matrix).to_quaternion()
    def wp(b): return S.matrix_world @ S.pose.bones[pre + b].head
    S.animation_data.action = None
    for pb in S.pose.bones: pb.matrix_basis.identity()
    vl.update()
    rest = {b: wq(b) for b in BONES}; p0 = wp('Hips'); leg = (p0 - wp('LeftFoot')).length
    S.animation_data.action = act
    f0, f1 = act.frame_range; sfps = sc.render.fps / sc.render.fps_base
    n = int(round((f1 - f0) / sfps * FPS)) + 1
    frames = []
    for i in range(n):
        f = f0 + i / FPS * sfps; sc.frame_set(int(f), subframe=f - int(f)); vl.update()
        frames.append({'D': {b: list((wq(b) @ rest[b].inverted()).normalized()) for b in BONES}, 'hip': list(wp('Hips') - p0)})
    name = os.path.splitext(os.path.basename(src))[0]
    json.dump({'src': os.path.basename(src), 'fps': FPS, 'leg': leg, 'frames': frames}, open(os.path.join(outdir, name + '.json'), 'w'))
    print('wrote', name, n, 'frames', round(n / FPS, 2), 's')
