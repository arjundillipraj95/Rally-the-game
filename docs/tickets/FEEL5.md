# FEEL5 Devi's feel

Model: O · Written 26 Nov from the fight-feel talk (Arjun agreed 26 Nov, "start all")
Status: shipped 26 Nov

## What to build
- Joined phone: her own arrows drawn at once at her pace (the double third shot too); where they land the target
  takes it at once (FEEL4's predhit); the host's copies of hers that follow aren't drawn again.
- Her double (third) shot and her boosted arrow push the target back a step with a thud.
- SA2: her first arrow after an Evade is boosted: double damage, a flare in her army's colour.
- SA1 Piercing shot: a black smoky tail (like Decidueye's), her army's colour at its heart, a dark smear, no gold.
- Ult Tiger's volley: 32 arrows over 4 s (was 20 over 2.5 s); 5x her blow in all (BAL1).
- Army ult Arrow storm: everyone inside is hit each beat (one of her archers' arrows, landing with the rain); the
  archers' arrows are for the eye.

## Done when
`game/store/r_FEEL5.mjs` (volley, storm even on all 5, boost double once, pushes) and `r_FEEL5-join.mjs` (250 ms:
own arrows at once, the host's not drawn twice, the hit felt ~210 ms after the press). Look: `store/shot_FEEL5.mjs`.

## Where it is
`core/sim/ranged.js` (rangedPaceLocal, localArrow, boost, third tag), `core/sim/missiles.js` (push, show/local),
`core/sim/deviShots.js` (storm, Evade flag), `net/netgame.js` (skip), `render/arrowfx.js`, `render/devifx.js`,
`champions/devi.js`.
