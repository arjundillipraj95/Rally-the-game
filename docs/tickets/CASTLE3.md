# CASTLE3 Castles shoot like League turrets

Model: O · Written 16 Nov 2026 from the design doc (Map: Castles, targeting) · Arjun's go 16 Nov
Status: built on launch26 (not shipped)

## What to build
Every castle shooter (wall archers from level I, the ballista at III) is one turret with one target (`core/sim/turret.js`):
1. An enemy champion who hits a champion of the castle's side inside its range: switch to him at once (aggro, `turret.aggro` s).
2. Else keep shooting whoever it is shooting while he stays in range (it sticks).
3. Else the nearest enemy soldier; champions only when no soldiers are in range.
4. On the same champion each volley ramps (+`rampStep`, up to +`rampMax`); a soldier takes `soldier` an arrow.
5. Turret shots are flat damage: no shield block, no head roll. Neutral men and men hidden in a bush are not shot.
6. Near an enemy castle that shoots, its range shows on the ground; red with a line to you while it is shooting you.
   Joined phones get each castle's target in the snapshot.
Agreed targets (16 Nov): a champion without soldiers dies in about 8 s at level I; a soldier in about 2 volleys.

## Done when
`store/r_CASTLE3.mjs`: soldier picked before a nearer champion; an enemy champion hitting my champion takes the turret;
it sticks; only a champion in range: him; the ramp goes 1, 1.4, 1.8, 2.2, 2.2; shots go through a shield; no shots
at neutral or bush-hidden men; a lone champion at level I dies in 6-12 s; a joined phone gets the target id and draws
the ring red. r_CASTLE1, r_CASTLE2, crown2sim and crown2online roles off and on, r_PERF1c pass.

## Where to start in the code
`core/sim/turret.js` (new); `core/sim/forts.js` castleTowersTick; `core/sim/castle3.js` ballista; `core/sim/missiles.js`
arrowHit; `core/sim/melee.js` hit (champHit); `net/netgame.js` holds field 11; `render/turretring.js` (new).

## Out of scope
Numbers (CASTLE10). Computer champions playing around turrets (CASTLE9).

## Open questions
none
