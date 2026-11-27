# FEEL6 Sigrun's feel

Model: O · Written 26 Nov from the fight-feel talk (Arjun agreed and said go, 26 Nov)
Status: shipped 26 Nov

## What to build
- Basic: the third blow a two-handed overhead chop (clip `overhead`) that staggers him back a step (stun 0.35, kb 1.1).
- Pounce: a sure hit. Once a target is picked (same pick: tap the nearest, drag near him) she follows him wherever he
  runs and lands on him; Devi's Evade doesn't dodge it (`sure`). While aiming, a line from her to the one it picks and
  a red ring on him (like Glaceon's). A kill: ready again in 0.5 s. Damage 2x her blow (BAL1).
- Spin: each tick pushes enemies out a little; on foot she spins through soldiers (not champions).
- The Hunt: a red mark (claws in a ring) over every champion under 20% while an enemy Sigrun with her ult is on the
  field, on every phone; healed above 20% when she strikes: 5x her blow, not the finish.
- Svinfylkingar: the wedge's point strikes too (a man dead between the front riders); everyone struck is knocked
  aside out of its path.

## Done when
`game/store/r_FEEL6.mjs`; r_C5c and r_C5d updated to BAL1's numbers. Look: `store/shot_FEEL6.mjs` (851x393).

## Where it is
`core/sim/sigrun.js`, `core/sim/svin.js`, `core/sim/melee.js` (sure), `core/sim/step.js` (separation),
`champions/sigrun.js` (look.swings), `ui/abilaim.js` (Pounce aim), `render/huntmark.js` (new), `render/overlay.js`.
