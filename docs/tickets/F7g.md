# F7g Falling into the chasm

Model: H (built by Opus) · Written 2026-11-12 from F7 moment 6 (Arjun agreed 12 Nov)
Status: superseded by F7 (13 Nov, Arjun's picks); its test folded into `store/r_F7.mjs`

## What to build
Over the chasm's edge: a short fall (FEEL.chasm.fall, 0.6 s) from the rim he went over, with a scream (the existing
placeholder 'scream' sound), then dead, by 'chasm' (same death, card and tally as before). Owner's calls (Arjun handed
them over): while falling he can't be hit or steer; he dies when the fall ends; kill credit as today (none).

## Done when
`game/store/r_F7g.mjs`: alive and untouchable a few frames in, dead after about 0.6 s, height drops smoothly (no frame
over 1.2 m), 'chasm' counted; a man on the bridge is fine. `c2bits.mjs` updated to wait out the fall.

## Where to start in the code
`core/sim.js` c2Tick() (the chasm block, `u.chasmT`), update()'s unit loop (the fall); `config.js` FEEL.chasm.

## Known limit
A joined phone's own captain is moved by that phone; the host decides the fall and the death, so on that phone the fall
may show only from the host's snapshots. Arjun judges on two phones.

## Open questions
None.
