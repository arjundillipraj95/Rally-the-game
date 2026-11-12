# F7e Duel ring: a shove, not a jump

Model: H (built by Opus) · Written 2026-11-12 from F7 moment 4 (Arjun agreed 12 Nov)
Status: built (not shipped)

## What to build
When a duel starts, anyone inside the ring (other than the two) is shoved to its edge over 0.3 s, eased out, instead
of being set there in one frame. Owner's call (Arjun handed it over): real positions move (host rules), so every
phone sees the same shove. After 0.3 s the edge holds people as before.

## Done when
`game/store/r_F7e.mjs`: a man 2.7 m inside the edge reaches it in about 0.27 s, no frame moving him more than a third
of the way (before: all 2.7 m in one frame).

## Where to start in the code
`core/sim.js` startDuel() (`d.t0`), duelBounds(); `config.js` DUEL.shoveT.

## Out of scope
The duellists' own clamp inside the ring; who may break a ring.

## Open questions
None.
