# CASTLE2 Level III: ballista, watchtower, spike ditch

Model: O · Written 16 Nov 2026 from the design doc (Map: Castles, Fortify level 3) · Arjun's go 16 Nov
Status: built on launch26 (not shipped)

## What to build
A castle at level 3 (its third Fortify) gets, as long as it is held:
1. Ballista on the keep: a heavy bolt every `CASTLE26.ballista.every` s at an enemy in range; shields don't stop it.
   It picks targets the same way as the wall archers; CASTLE3 gives both League turret rules.
2. Watchtower over one corner tower: far vision. On the new mountain only bushes hide anyone, so it lights every bush
   within `CASTLE26.watch` m for the owner's side (as if one of its men stood in it): seen and targetable.
3. Spike ditch: a ring of stakes just outside the wall. The castle's enemies in it move at `ditch.slow` and take
   `ditch.dmg` a second; its own side passes freely.
All three show only at level 3 and go with the castle (a capture drops it to level 0).

## Done when
`store/r_CASTLE2.mjs`: at level 2 none of the three works; at level 3 the ballista hits an enemy in range through his
shield and not one out of range; an enemy in a bush 30 m away is seen by the owner's side and not by a third side; an
enemy in the ditch is slowed and hurt, a man of the owner's side is not; after a capture all three stop. Draw calls
with every castle at level 3 within +28 of level 2 (the older level III pieces already +14; these about +7). crown2sim and crown2online roles off and on; r_PERF1c passes.

## Where to start in the code
New `core/sim/castle3.js` (ballista, ditch); `core/sim/bush.js` bushTick (watchtower); `core/sim/army.js` speedOf
(ditch slow); `core/sim/crown2.js` c2Tick; `core/sim/missiles.js` arrowHit (bolt); `render/castlefort.js` (pieces).

## Out of scope
Turret targeting rules (CASTLE3). Numbers are starting points (CASTLE10).

## Open questions
none
