# CASTLE1 Castle levels, layered gates, plates, banner shield

Model: O · Written 16 Nov 2026 from the design doc (Map: Castles) plus Arjun's answers in chat (16 Nov)
Status: built on launch26 (not shipped)

Part of the castle set (tracker S1-5 to S1-7), cards in order: CASTLE1 levels and gates · CASTLE2 level III
(ballista, watchtower, ditch) · CASTLE3 League turret rules · CASTLE4 capture circle · then Arjun plays it on the
preview site · CASTLE5 capture moment, Held!, under-attack alert · CASTLE6 holding (shards, healing, 5/3 points)
· CASTLE7 respawn at a castle, respawn time grows with the clock · CASTLE8 nexus, Crown no longer ends the match ·
CASTLE9 computer champions · CASTLE10 joined phones pass, hit-point numbers.

## What to build
Agreed with Arjun 16 Nov (replaces "a captured castle passes one level lower" and the gate mending):
1. Levels 0-3. Level 0: gates stand open, nothing shoots. Level 1: a timber gate in each gateway, wall archers.
   Level 2: a stone layer, more archers. Level 3: iron layer (its ballista, watchtower and ditch are CASTLE2).
2. Damage never heals. No mending over time, no repair. Fortify adds one layer to every gate of the castle (a broken
   gate gets one fresh layer and shuts again); it never refills what was knocked off. Allowed under attack.
3. Every layer is 3 plates. Each plate knocked off pays gold to every army of the side that broke it; the bar
   shows the plates.
4. A captured castle drops to level 0 (gates open, no archers) and raises its banner: for 45 s nobody can capture
   it (its label counts down).
5. Neutral castles start at level 0 (their guards are the defence).
6. Numbers in `CASTLE26` (config.js). Starting points; CASTLE10 sets them from bot fights.

## Done when
`store/r_CASTLE1.mjs`: level 0 gates open, level 1 shut; fortifying a half-broken gate keeps the damage (hp +
one layer, max + one layer); a broken gate gets one layer back on fortify; no mending after 60 s with men inside;
each plate pays the breaking side once; capture sets level 0 and a 45 s shield in which enemies standing in it make
no progress; a joined phone sees the same plates, level and shield. crown2sim and crown2online pass roles off and
on; r_PERF1c passes.

## Where to start in the code
`core/sim/forts.js` freshGates, gateHp, gatePct, hitCastleGate, castleGatesTick, castleTowersTick;
`core/sim/army.js` upgradeCost / buy 'fort'; `core/sim/crown2.js` c2Hold, c2Take, c2Begin; `net/netgame.js` holds
section (field 9); `render/overlay.js` drawGateBars, drawHoldLabels; `render/holds.js` updateCastleWalls;
`ui/hud.js` Fortify button text; `core/sim/match.js` host hand-over rebuild.

## Out of scope
Turret targeting (CASTLE3), capture circle (CASTLE4), the capture moment (CASTLE5). The old maps' palisade
(`G.forts`) is untouched.

## Open questions
none
