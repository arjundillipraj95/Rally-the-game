# F1b Batched men: each near soldier and captain in a few meshes (F1, part 2 of 2)

Model: Fable, else O · Written by the owner 12 Nov 2026 from plan P8.1 / P8.9 (tech ticket, no design rev)
Status: built 12 Nov on roles, waiting on Arjun's ship. Men 147 -> 29 draws; total with F1a 1,220 -> 151 on Low; frames identical.

## What to build
The men near the camera are drawn piece by piece: a captain is about 22 meshes, a soldier about 12
(baseline on Low: 4 captains, 3 foot, 2 archers = 148 meshes). Far soldiers are already batched (`drawFar`).

1. At `make()`, fold each rig's separate meshes (body, armour pieces, helmet, shield, weapon, cape, archer
   gear) into one skinned mesh per material, on the same bones. Soldiers and captains both (owner's call: the
   captains are ~90 of the ~150).
2. Today's soldier body and code poses stay. The Mixamo soldier body and clips stay out of battle (a visual
   change; later, P8.4) (Arjun, 12 Nov).
3. The captain keeps his F8 clips, closet look (helmet, armour finish, shield, cape) and everything that
   hides, swaps or tints a piece (hit flash, helmet popping off, weapon change, death).
4. `?f1=0` keeps the old rigs for one release, for comparison.

Built as: the plain gear (no texture: helmet, shield, weapon, cape, hood, quiver) folded per man into one skinned
mesh per kind (front-faced, two-sided), each piece riding what moves it (a bone, the shield's mount, the cape's hinge);
colour, roughness, metalness and glow per vertex (`render/rig/fold.js`). Body and armour (textured) stay: 2 draws.
The originals stay on layer 31 (unseen) and drive the fold. The horse is untouched (P8.5). No code hides single gear
pieces today (no helmet pop-off exists); the hit flash is on the body, untouched.

## Done when
`game/store/r_F1b.mjs`, headless, same seed and frames as F1a's numbers, Low and High:
- (a) draw calls before (`?f1=0`) and after; the men's share from ~150 to about 30; the total about 150 or less.
- (b) triangles not up by more than 5%.
- (c) frame compare: Crown start, a close fight, a captain in each closet look: under 0.5% of pixels differ by
  more than 8/255; the shots saved for Arjun.
- (d) the captain still plays his clips (`r_F8.mjs` passes); helmets pop off; hit flash shows; mounted men ride.
- (e) no file in `core/` changes; crown2sim and crown2online pass roles off and on.

## Design rules it relies on
None (tech ticket). Plan P8.9: under 150 draw calls on mid phones.

## Where to start in the code
`render/heroes.js` `make()` (~99), `drawHero()` (~409), `archerGear()` (~123), `drawFallen()` (~237);
rigs in `render/rig/captainrig.js`, `render/rig/cliprig.js` (`rigClip`, `addClipArmour`), `render/rig/weapons.js`.

## Out of scope
The map (F1a), far soldiers, horses (P8.5), the Mixamo soldier in battle (P8.4), gameplay, `core/`.

## Open questions
None.
