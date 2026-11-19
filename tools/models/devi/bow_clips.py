# (C4) Devi's clips onto the game's shared skeleton, added to captain_anim.glb (champions) and soldier_anim.glb (her
# archers), next to F17's extra clips, with extra.py's own bake (same frames, hips' travel scaled by leg, 30 fps).
# Sources: the Mixamo longbow and dagger packs (Rally/assets/mixamo on Arjun's Mac), turned to JSON by
# mixamo_export.py. Re-running replaces these clips and leaves every other clip as it is.
#   python3 -I tools/models/devi/bow_clips.py <folder of mixamo_export.py JSON files>
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import extra
# name: (source, [from, to] seconds, loop seam in seconds or 0). What each is for (design doc, Devi card):
BOW = {
    'bowIdle':     ('standing idle 01', [0, 5.1], .5),           # bow held low, at ease
    'bowDraw':     ('standing draw arrow', [0, 1.05], 0),        # an arrow from the quiver, nocked and drawn: a shot's first half
    'bowRecoil':   ('standing aim recoil', [0, .7], 0),          # the loose: a shot's second half; twice quick = the third shot's two arrows
    'bowOverdraw': ('standing aim overdraw', [0, 3.75], 0),      # drawn past the cheek and held: Piercing shot's draw
    'bowWalkF':    ('standing aim walk forward', [0, 1.2], .25), # shooting on the move (the upper body over these legs)
    'bowWalkB':    ('standing aim walk back', [0, 1.47], .25),
    'bowWalkL':    ('standing aim walk left', [0, 1.2], .25),
    'bowWalkR':    ('standing aim walk right', [0, 1.3], .25),
    'bowRun':      ('standing run forward', [0, .87], .2),       # running with the bow, not shooting
    'dodgeF':      ('standing dodge forward', [0, 1.0], 0),      # Evade, by the way she dashes
    'dodgeB':      ('standing dodge backward', [0, 1.65], 0),
    'dodgeL':      ('standing dodge left', [0, .97], 0),
    'dodgeR':      ('standing dodge right', [0, .97], 0),
    'bowEquip':    ('standing equip bow', [0, .9], 0),           # bow back in hand after a duel
    'bowDisarm':   ('standing disarm bow', [0, 1.1], 0),         # bow slung on the back as a duel starts
    'bowBlock':    ('standing block', [0, 2.0], 0),
    'bowHit':      ('standing react small from front', [0, 1.27], 0),
    'bowDeath':    ('standing death backward 01', [0, 3.1], 0),
    'stab1':       ('Stabbing', [0, 2.15], 0),                   # duels: two arrows held like daggers
    'stab2':       ('Stabbing_1', [0, 2.65], 0),
    'stab3':       ('Stabbing_2', [0, 2.38], 0),
    'doubleStab':  ('Double_Dagger_Stab', [0, 3.08], 0),         # the duel's crossed double stab (her heavy)
}
if __name__ == '__main__':
    folder = sys.argv[1]; root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..')
    for f in extra.FILES:
        p = os.path.join(root, f); j, bin_ = extra.read_glb(p)
        lens = {name: extra.make(j, bin_, name, spec, folder) for name, spec in BOW.items()}
        extra.write_glb(p, j, bin_)
        print(f, 'clips', len(j['animations']), ' '.join(f'{k} {v:.2f}s' for k, v in lens.items()))
