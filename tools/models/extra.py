# F17 step 2: puts the extra clips (EXTRA below, made by cosindra_export.py) on the game's shared 22-bone
# skeleton and adds them to captain_anim.glb and soldier_anim.glb, leaving everything else in the files as it is.
# Run after prep.mjs (which rewrites those files without them):
#   python3 -I tools/models/extra.py <folder of cosindra_export.py JSON files>
# How: each JSON frame holds every body part's turn from the T-pose in world space. That turn is applied to the
# part's own T-pose here (both skeletons stand in a T-pose facing the same way), so bone names, lengths and
# rolls don't have to match. The hips' travel is scaled by leg length. 30 fps, linear, like prep.mjs's clips.
import json, struct, sys, math, os
import numpy as np

# name: (source JSON, [from, to] seconds, loop seam in seconds or 0). Hit times live in game/src/config.js (ANIM.swing).
EXTRA = {
    'spin':        ('sword_spin_attack_take1', [.25, 2.4], 0),     # Raider's spin: one full turn, the cut as it ends
    'leapSmash':   ('badminton_smash_take1', [0, 2.0], 0),         # jump attack: up, and down with an overhead cut
    'slashWide':   ('sword_slash_take1', [.6, 1.9], 0),            # wide flat cut (also the spear sweep)
    'slashBack':   ('sword_slash_backhand_take2', [1.0, 2.2], 0),  # backhand cut
    'overhead':    ('sword_overhead_take1', [.1, 1.3], 0),         # two-handed overhead blow (the held heavy blow)
    'spearThrust': ('sword_thrust_take1', [.6, 2.4], 0),           # one-handed lunge and thrust
    'spearIdle':   ('spear_guard_one_hand_take1', [0, 5.0], .6),   # spear held forward from the hip (loops)
    'javThrow':    ('throw_overhand_take1', [.8, 2.9], 0),         # javelin, thrown overhand
    'shieldBash':  ('shield_bash_take1', [.65, 2.3], 0),           # shield up, then driven forward
    'knockdown':   ('knockdown_getup_take1', [.25, 5.1], 0),       # knocked onto his back, and up again
    'getUp':       ('get_up_from_back_take1', [1.6, 4.1], 0),      # up from lying on his back
}
FLAT = {'leapSmash'}  # the game lifts these itself (the leap's jump): the clip keeps the legs' tuck, not the hips' rise
FILES = ['game/public/models/captain_anim.glb', 'game/public/models/soldier_anim.glb']
FPS = 30
BONES = ['Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Head', 'LeftShoulder', 'LeftArm', 'LeftForeArm', 'LeftHand',
         'RightShoulder', 'RightArm', 'RightForeArm', 'RightHand', 'LeftUpLeg', 'LeftLeg', 'LeftFoot', 'LeftToeBase',
         'RightUpLeg', 'RightLeg', 'RightFoot', 'RightToeBase']

# quaternions as (x, y, z, w), glTF order
def qmul(a, b):
    ax, ay, az, aw = a; bx, by, bz, bw = b
    return np.array([aw*bx + ax*bw + ay*bz - az*by, aw*by - ax*bz + ay*bw + az*bx, aw*bz + ax*by - ay*bx + az*bw, aw*bw - ax*bx - ay*by - az*bz])
def qinv(q): return np.array([-q[0], -q[1], -q[2], q[3]]) / np.dot(q, q)
def qrot(q, v): return qmul(qmul(q, np.array([*v, 0.])), qinv(q))[:3]
def slerp(a, b, t):
    d = np.dot(a, b)
    if d < 0: b, d = -b, -d
    if d > .9995: r = a + t * (b - a); return r / np.linalg.norm(r)
    th = math.acos(d); return (math.sin((1 - t) * th) * a + math.sin(t * th) * b) / math.sin(th)
# Blender's world (Z up) -> glTF's (Y up): (x, y, z) -> (x, z, -y)
def b2g_v(v): return np.array([v[0], v[2], -v[1]])
def b2g_q(wxyz): w, x, y, z = wxyz; return np.array([x, z, -y, w])

def read_glb(f):
    b = open(f, 'rb').read(); n = struct.unpack('<I', b[12:16])[0]
    j = json.loads(b[20:20 + n]); o = 20 + n; m = struct.unpack('<I', b[o:o + 4])[0]
    return j, bytearray(b[o + 8:o + 8 + m])
def write_glb(f, j, bin_):
    while len(bin_) % 4: bin_ += b'\0'
    j['buffers'][0]['byteLength'] = len(bin_)
    js = json.dumps(j, separators=(',', ':')).encode()
    while len(js) % 4: js += b' '
    out = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(bin_)) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(bin_), 0x004E4942) + bytes(bin_)
    open(f, 'wb').write(out)

def bake(j, src):
    """the clip on this file's skeleton: per bone, a (frames, 4) rotation track; hips (frames, 3) translation"""
    nodes = j['nodes']; idx = {nd['name']: i for i, nd in enumerate(nodes) if 'name' in nd}
    parent = {c: i for i, nd in enumerate(nodes) for c in nd.get('children', [])}
    R = {i: np.array(nd.get('rotation', [0, 0, 0, 1]), float) for i, nd in enumerate(nodes)}
    Tn = {i: np.array(nd.get('translation', [0, 0, 0]), float) for i, nd in enumerate(nodes)}
    for nd in nodes:
        if nd.get('scale', [1, 1, 1]) != [1, 1, 1] or 'matrix' in nd: raise SystemExit('a scaled or matrix node: not handled')
    def world(i):  # rest world rotation and position
        if i not in parent: return R[i], Tn[i]
        pq, pp = world(parent[i]); return qmul(pq, R[i]), pp + qrot(pq, Tn[i])
    W0 = {b: world(idx[b]) for b in BONES}
    leg = np.linalg.norm(W0['Hips'][1] - W0['LeftFoot'][1]); k = leg / src['leg']
    frames = src['frames']; rot = {b: [] for b in BONES}; hip = []
    for fr in frames:
        cur = {}
        for b in BONES:  # (BONES lists parents before children)
            wq = qmul(b2g_q(fr['D'][b]), W0[b][0]); cur[b] = wq
            p = parent.get(idx[b]); pn = nodes[p]['name'] if p is not None else None
            lq = qmul(qinv(cur[pn]), wq) if pn in cur else (qmul(qinv(world(p)[0]), wq) if p is not None else wq)
            rot[b].append(lq / np.linalg.norm(lq))
        hp = parent.get(idx['Hips']); d = b2g_v(fr['hip']) * k
        if hp is not None: d = qrot(qinv(world(hp)[0]), d)
        hip.append(Tn[idx['Hips']] + d)
    return {b: np.array(v) for b, v in rot.items()}, np.array(hip), idx

def make(j, bin_, name, spec, folder):
    srcname, (t0, t1), seam = spec
    src = json.load(open(os.path.join(folder, srcname + '.json')))
    rot, hip, idx = bake(j, src)
    a, b = round(t0 * FPS), min(round(t1 * FPS), len(hip) - 1) + 1
    rot = {k: v[a:b].copy() for k, v in rot.items()}; hip = hip[a:b].copy()
    n = len(hip)
    for k in rot:  # keep each track on one side of the double cover, so linear blending takes the short way
        for i in range(1, n):
            if np.dot(rot[k][i], rot[k][i - 1]) < 0: rot[k][i] *= -1
    if seam:  # a loop: the last `seam` seconds ease into the first frame, so the end meets the start
        m = round(seam * FPS)
        for i in range(n - m, n):
            t = (i - (n - m)) / (m - 1); t = t * t * (3 - 2 * t)
            for k in rot: rot[k][i] = slerp(rot[k][i], rot[k][0], t)
            hip[i] = hip[i] * (1 - t) + hip[0] * t
    hip[:, [0, 2]] = hip[0, [0, 2]]
    if name in FLAT: hip[:, 1] = np.minimum(hip[:, 1], hip[0, 1])  # (in place: the clips were exported in place; drop any drift over the ground)
    times = np.arange(n, dtype=np.float32) / FPS
    def acc(arr, typ):
        arr = np.ascontiguousarray(arr, dtype=np.float32); off = len(bin_)
        while off % 4: bin_.append(0); off += 1
        bin_.extend(arr.tobytes())
        j['bufferViews'].append({'buffer': 0, 'byteOffset': off, 'byteLength': arr.nbytes})
        a_ = {'bufferView': len(j['bufferViews']) - 1, 'componentType': 5126, 'count': len(arr), 'type': typ}
        if typ == 'SCALAR': a_['min'], a_['max'] = [float(arr.min())], [float(arr.max())]
        j['accessors'].append(a_); return len(j['accessors']) - 1
    tin = acc(times, 'SCALAR'); samplers, channels = [], []
    for k in BONES:
        samplers.append({'input': tin, 'output': acc(rot[k], 'VEC4'), 'interpolation': 'LINEAR'})
        channels.append({'sampler': len(samplers) - 1, 'target': {'node': idx[k], 'path': 'rotation'}})
    samplers.append({'input': tin, 'output': acc(hip, 'VEC3'), 'interpolation': 'LINEAR'})
    channels.append({'sampler': len(samplers) - 1, 'target': {'node': idx['Hips'], 'path': 'translation'}})
    j['animations'] = [x for x in j['animations'] if x['name'] != name] + [{'name': name, 'samplers': samplers, 'channels': channels}]
    return n / FPS

if __name__ == '__main__':
    folder = sys.argv[1]; root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
    for f in FILES:
        p = os.path.join(root, f); j, bin_ = read_glb(p)
        if any(x['name'] in EXTRA for x in j['animations']): raise SystemExit(f + ' already has the extra clips: run prep.mjs first')
        lens = {name: make(j, bin_, name, spec, folder) for name, spec in EXTRA.items()}
        write_glb(p, j, bin_)
        print(f, 'clips', len(j['animations']), ' '.join(f'{k} {v:.2f}s' for k, v in lens.items()))
