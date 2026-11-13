# F17 step 1 (Blender): a MotionSmith (Cosindra) GLB clip on the UE5 Manny skeleton -> JSON of each body
# part's turn from the T-pose, frame by frame at 30 fps, in world space. Skeleton-agnostic: extra.py puts it
# on the game's 22-bone skeleton. Run with Blender's Python (bpy), from anywhere:
#   python3 -I tools/models/cosindra_export.py -- <clip.glb> <out.json>
import bpy, sys, json
args = sys.argv[sys.argv.index('--') + 1:]
src, out = args[0], args[1]
# the game's 22 bones <- Manny's bones
MAP = {'Hips': 'pelvis', 'Spine': 'spine_02', 'Spine1': 'spine_03', 'Spine2': 'spine_05', 'Neck': 'neck_01', 'Head': 'head',
       'LeftShoulder': 'clavicle_l', 'LeftArm': 'upperarm_l', 'LeftForeArm': 'lowerarm_l', 'LeftHand': 'hand_l',
       'RightShoulder': 'clavicle_r', 'RightArm': 'upperarm_r', 'RightForeArm': 'lowerarm_r', 'RightHand': 'hand_r',
       'LeftUpLeg': 'thigh_l', 'LeftLeg': 'calf_l', 'LeftFoot': 'foot_l', 'LeftToeBase': 'ball_l',
       'RightUpLeg': 'thigh_r', 'RightLeg': 'calf_r', 'RightFoot': 'foot_r', 'RightToeBase': 'ball_r'}
FPS = 30
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=src)
S = [o for o in bpy.data.objects if o.type == 'ARMATURE'][0]
acts = [a for a in bpy.data.actions if a.name not in ('RestPose', 'TPose')]
if len(acts) != 1 or 'TPose' not in bpy.data.actions: raise SystemExit('expected one clip and a TPose in ' + src)
S.animation_data_create()
sc, vl = bpy.context.scene, bpy.context.view_layer
def wq(b): return (S.matrix_world @ S.pose.bones[b].matrix).to_quaternion()
def wp(b): return S.matrix_world @ S.pose.bones[b].head
S.animation_data.action = bpy.data.actions['TPose']; sc.frame_set(0); vl.update()
rest = {t: wq(s) for t, s in MAP.items()}; p0 = wp('pelvis')
leg = (p0 - wp('foot_l')).length
S.animation_data.action = acts[0]
f0, f1 = acts[0].frame_range; sfps = sc.render.fps / sc.render.fps_base
n = int(round((f1 - f0) / sfps * FPS)) + 1
frames, hand = [], []
for i in range(n):
    f = f0 + i / FPS * sfps; sc.frame_set(int(f), subframe=f - int(f)); vl.update()
    D = {t: list((wq(s) @ rest[t].inverted()).normalized()) for t, s in MAP.items()}  # (w, x, y, z), Blender world (Z up)
    frames.append({'D': D, 'hip': list(wp('pelvis') - p0)})
    hand.append([list(wp('hand_r')), list(wp('hand_l')), list(wp('foot_l')), list(wp('foot_r'))])
json.dump({'src': src.split('/')[-1], 'fps': FPS, 'leg': leg, 'frames': frames, 'track': hand}, open(out, 'w'))
print('wrote', out, n, 'frames')
