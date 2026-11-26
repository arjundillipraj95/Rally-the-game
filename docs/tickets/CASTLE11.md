# CASTLE11 A broken gate silences its ballista and archers; Repair at level III

Model: O · Written 26 Nov from Arjun's design (his "go", 26 Nov)
Status: built (not shipped), 26 Nov

## What to build
- Any gate of a castle broken: its ballista stops, and the wall archers on the two towers beside that gate (within
  `CASTLE26.repair.nearR` 10 m) stop. The other towers keep shooting; the ditch and watchtower are unchanged.
- At level III, Fortify becomes Repair: 120 gold a tap puts one bar (plate) back on the most damaged gate; a broken
  gate shuts again and its ballista and archers shoot again. The bars still off stay counted, so knocking it off again
  pays the attackers again. Nothing damaged: no Repair. Below III, Fortify as before.
- On every phone: a crack, splinters and "BALLISTA DOWN!" near you when it breaks; a red cross and smoke over the keep,
  a cross over each silent tower, while it stays broken. Messages and feed: "a gate repaired".
- Computers repair where they stand (botFortify) and make the trip to a broken level III castle within 45 m.

## Done when
`game/store/r_CASTLE11.mjs`: whole 1 bolt + 4 arrows; a gate broken 0 bolts + 2 arrows; Repair 120 gold, one bar, shut,
back to 1 + 4; nothing to repair: no cost; a computer goes to repair. Look: `store/shot_CASTLE11.mjs` (851x393).

## Where it is
`core/sim/forts.js` (gatesOf, gateBroken, towerSilent, needsRepair, repairGate; towers skip), `core/sim/castle3.js`
(ballista), `core/sim/army.js` (cost, buy), `core/sim/ai26.js` (trip), `render/siegefx.js` (new), `render/overlay.js`,
`ui/battlehud.js` (Repair gate · 120), `ui/messages.js`, `ui/feed.js`, `config.js` CASTLE26.repair.

## Known
r_CASTLE2's ballista check needs an enemy footman; computers pick champions at random (BOT1), so it fails now and then
when no enemy army has spearmen (before CASTLE11 too).
