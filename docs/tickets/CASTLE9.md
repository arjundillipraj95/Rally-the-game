# CASTLE9 Computer champions and the new castles

Model: O · Written 16 Nov 2026 (map-build note AI1/AI2 kept working) · Arjun's go 16 Nov
Status: built on launch26 (not shipped)

## What to build (`core/sim/ai26.js`, numbers `CASTLE26.ai`)
1. A computer champion standing in a castle of his side fortifies it first, when he can pay (before other upgrades).
2. He makes the trip to fortify a castle of his within 45 m that isn't at level III and isn't under attack, when he
   has its cost and 20 more.
3. An attack alert (last 10 s) makes a castle worth defending, as a filling circle or a fight in it already did.
4. He goes for an open enemy nexus within 90 m, with at least 3 soldiers; he doesn't go at a fortified enemy castle
   without 3 soldiers to soak its arrows. Already in place: going for the banner's circle (CASTLE4); his men hit gates,
   breakables and the nexus when next to them; the jungle (AI2) and guard duty (AI1) unchanged.

## Done when
`store/r_CASTLE9.mjs`: a bot in his castle with gold fortifies it; one near a low castle of his with gold plans the
trip; an alert makes his castle his plan; with soldiers and an open enemy nexus near: the nexus; without soldiers, not
it and not a fortified enemy castle; a 5-minute bot battle: castles fortified and taken. Regression set.
