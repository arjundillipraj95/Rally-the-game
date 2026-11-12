# F7-water The river on the summit (F7b river and path, F7a flood-out, F7c summit gate)

Model: F7b O · F7a O · F7c S · Written by the owner 2026-11-12 from Arjun's spec (12 Nov), design rev 40, plan rev 19
Status: built (not shipped), 12 Nov. One commit for F7b, F7a and F7c (they share `c2Water` in `core/sim.js`)

## What to build
Story: a river rings the glacier in the middle, with the war chest beside the glacier. No gate to enter
the chest area: the river is the barrier. The glacier is what captains hit, the river is the barrier,
the rock causeway is the path. Build order F7b, F7a, F7c; one commit each.

**F7b River and path (O).** The river fills the centre from the start. At 5:00 it drops and a rock
causeway opens. The war chest is taken when its health is fully down; the last hit takes it. At about
8:00 the river drops again for the Crown fight on the summit. The Crown returns to the top if dropped.
Soldiers cannot cross the river while it is up.

**F7a Flood-out (O).** After the chest phase (about 7:00, or when the chest is taken) a 10 s countdown
runs with a horn and a glowing, rising water edge. Then the water rushes out from the centre and
carries everyone, captains and soldiers, to the nearest gate. Nobody dies of it; no kill points. It
must feel like a push, not a teleport. It replaces old F7 moments 1 (everyone moved across the chasm),
2 (night move-out of soldiers) and 7 (glacier push-out).

**F7c Summit gate (S).** From the Crown phase (about 8:00) the summit entrance stays a gate. No water
curtain (Arjun, 12 Nov). Soldiers cannot pass the gate; a captain can. Army behaviour when a captain
passes stays exactly as today. No guard needed during the chest phase.

Numbers (times, speeds, countdown, widths) go in `game/src/config.js` (`CROWN2` / `FEEL`), not in logic.

## How it works today (checked 12 Nov, code and a headless run)
- **Summit = the arena**: stone ring wall at r 17.3 m (`CROWN2.r.arena` .165) with 4 gates, one facing
  each keep. Around it the **chasm** (r 19.9, 2.9 wide, -9 m deep) with 4 bridges in line with the keeps.
  Glacier at the centre (0,0), r 2.6. The existing **meltwater river** is a separate, far outer ring
  (r .443, wadeable, 8 bridges).
- **Phases** (`c2Tick`, `c2Phase`): shut until 5:00; `open` (all 4 gates down, everyone in) from 5:00
  until the chest is taken or 7:00 (`chestShut` 420); `shut` again; `night` from 8:00 (gates open).
- **Chest**: lands at 5:00 at arena r × 0.5 (≈ 8.7 m from the glacier). 250 hp, every blow (soldier or
  captain) takes 1; the blow that brings it to 0 gives it to that side (+4 pts, gold, full horns). Not
  broken by 7:00: the side with the most men inside the arena gets it; a tie, nobody.
- **The Crown today is not a carried object**: from 8:00 captains hack the glacier (80 captain blows);
  the last blow takes the Crown (+7) and **ends the battle at once** (`c2End('crown')`). Nothing can be dropped.
- **Summit gate at night**: the gate is not a gate. All 4 are open (0 of 19 gate pieces solid). Soldiers
  follow their captain through; every frame any soldier inside the wall is **teleported** to the far rim of
  the chasm (`c2Tick` L1647-1653). Run: captain walks from the gate to the glacier with 5 men behind him;
  in 12 s the men made **55 jumps over 2 m, up to 8 m each**, a blink loop at the wall (they never get in).
  Arrows and javelins can't cross the wall line at night (`arrowsTick` L2744).
- **Glacier push-out** (moment 7): the glacier is solid; anyone inside its radius is pushed to its face
  every frame (L1666-1669). Always on, not a phase thing.

## Done when
`game/store/r_F7-water.mjs` (host) and `game/store/r_F7-water-join.mjs` (joined phone):
- F7b: before 5:00 no soldier or captain gets from the outside to the chest area; 5:00 causeway open,
  men walk in; the last blow on the chest gives it to that side; soldiers stopped by the river while up.
- F7a: countdown 10 s with horn and edge; then every unit inside ends at the nearest gate, no position jump
  over 2 m between frames, nobody dead, no kill points, same on the joined phone.
- F7c: from 8:00 a soldier is held at the gate, a captain passes; his men wait at the gate (answer 9).
- `crown2sim.mjs` and `crown2online.mjs` pass, roles off and on. Lag no worse (`lagtest.mjs`).

## Design rules it relies on
None in the design doc; Arjun's spec of 12 Nov (above) is the rule.

## Where to start in the code
- War chest health and when it's taken: `CROWN2.chest/chestHp/chestShut` (`config.js` L51);
  lands in `c2Tick` (`core/sim.js` L1638); blows `c2Hit` (L1613, 1 per blow, L1615); taken `c2ChestTo` (L1624);
  7:00 fallback L1639-1641; who may hit `c2CanHit` (L1602); AI goes for it L1473-1475.
  (The old `chestTick`/`chestTaken`, L1411-1425, are the other modes' chest, not the mountain's.)
- Summit layout: `world.js` mountain builder, chasm L354-362, arena wall and gates L363-371, outer
  meltwater river L349-353 (`L.river`, `riverCode`/`deepWater` L120-135, baked by `bakeRiver`).
  Ground height `mountY` (L271-290). Drawing: `render/mountain.js` (`buildMount` L153, bridges L176,
  glacier L186-202, chest L300, `updateMount` L259).
- Walking: `core/nav.js` L48 blocks deep river cells **once, when the grid is built**: a river that rises and
  drops needs live blocking. AI routing across the tiers: `c2Route` (`sim.js` L2118).
- Summit gate: `c2Phase` (L1630) opens/shuts all 4 gates via `G.plazaWall.broken` and `applyPlazaWall` (L1358);
  gate pieces in `L.plazaWall.obs` (`plazaGate`); `wallInReach` skips them on the mountain (L1383).
  Sync to joined phones: `net/netgame.js` L75 (sent) and L268 (applied).
- Move-outs to replace: `c2Tick` L1645-1654 (everyone at shut, soldiers at night).
- Glacier collision: L1666-1669. Glacier hit and Crown: `c2Hit` L1622, `c2End` L1715.
- How a captain's army follows him: `orderOf` (L282); soldier tick L2312-2377, the 'follow' slot at
  L2372-2376 (`slotPos`, `go`).
- Horn sound exists: `sound('horn')` (L185). Messages: `ui/messages.js` L100-104 (`c2chestSoon`, `c2night`, `c2crack`).
- Earlier F7 smooth moves to copy the feel from: F7e duel shove, F7g chasm fall (`FEEL` in `config.js` L356).

## Out of scope
Death and respawn (F5), duels and executions (F7e/F7f), the outer meltwater river, the battle's other phases.

## Arjun's answers (12 Nov)
1. A **lake**, not a ring: water fills the summit inside the arena wall; only the glacier shows in the
   middle. At the checkpoints (5:00, about 8:00) the water goes down and the area opens for the action.
2. Owner's call: the arena's stone wall and its 4 gates stay; the chasm and its 4 bridges stay as today.
   Before 5:00 and after the flood the gates stand open onto water: the lake is the barrier.
3. 4 causeways, one for each gate.
4. Nobody crosses, captains included, until the water goes down.
5. At 8:00 the water goes down again (as in 1); from then the gates are the gates of F7c.
6. Chest not broken by 7:00: most men inside get it; a tie, nobody.
7. The flood leaves people just outside the nearest gate.
8. Pushed men can't act or be hurt, about 2.5 s; a duel or execution running then is called off.
9. From 8:00 soldiers stop and wait at the gate; they catch up when their captain comes out.
10. The lake coming back pushes the armies out within the 10 s: water touches a unit, he can't do
    anything, he's flushed out the nearest gate, and the game resumes for him.
11. No carried Crown. The last blow on the glacier takes the 7 points and ends the battle, as today on main.
12. Yes: a big countdown message too. 13. Yes: arrows blocked across the gate line only from 8:00.

A. When the water goes down (5:00, 8:00) the whole summit floor dries: a clean arena to fight in, like
   today. The 4 rock causeways (one per gate) are the first ground to show as it drains.
B. The glacier stays solid (glacier push-out kept as today).

## Open questions
None. Waiting for Arjun's go.
