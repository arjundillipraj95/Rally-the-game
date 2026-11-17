# CASTLE10 Castle numbers from staged sieges; joined phones see the castles the same

Model: O · Written 16-17 Nov 2026 · Arjun: "calculate how many hit points is required to take castle - we don't want
the users to think it's very difficult, we want users to achieve satisfaction of taking a castle"
Status: built on launch26 (not shipped)

## How it was measured (`store/r_CASTLE10.mjs`; MEN=12 for a bigger push)
A computer champion and his footmen against an enemy castle nobody defends, from 32 m out, levels 1-3 (level 3: two pushes).

## Found and fixed on the way
- Footmen hung back in formation while their champion hacked a gate alone: nothing soaked the arrows. Now his footmen on
  Follow join him at a gate or a nexus he is hitting (`soldier.js`, `G.teams[ti].siegeAt`).
- The turret kept shooting a champion who walked in first, though his soldiers were in range: it now sticks only to a
  soldier; a champion only while no soldier is in range (the design's rule).
- Joined phones never ran the castle moments (announcements there skip the event the effects listened to): now they do.

## Numbers set (`CASTLE26`)
- Gate plates: 450 (lane gate, middle castle's back gate), 300 (other gates); level 1 = 3 plates, levels 2 and 3 add 2
  each (lane gate 1,350 / 2,250 / 3,150: 1x, 1.67x, 2.33x).
- Wall archers 2 / 3 / 4, all every 1.8 s (level 3 was 1.2 s); spike ditch 2 a second (was 4).

## Results (seconds of fighting)
| Siege | Gate down | Castle taken | Men left |
|---|---|---|---|
| Lone laner + 6 men, level 1 | 24-32 | 31-39 | 0-1 of 6 |
| Lone laner + 6 men, level 2 | 60-90, often a 2nd push | 67-83 when taken | 0 |
| Lone laner + 6 men, level 3 | no (1 plate a push) | needs a team | 0 |
| 12 men (a laner and a jungler's armies), level 1 | 14-19 | 20-26 | 6-10 of 12 |
| 12 men, level 2 | 22-76 | 28-83 | 0-7 |
| 12 men, level 3 | 3-4 plates the 1st push | on the 2nd push (46 s in all) | 2 |
The variance is the computer champion's own fighting (he backs off when hurt). Arjun judges the feel in a playtest.

## Done when
`store/r_CASTLE10.mjs` (level 1 taken alone in 20-45 s; level 2 slower; level 3 not alone), `store/r_CASTLE10-join.mjs`
(nexus health, castle taken with its shard and shield, shards, a filling circle, points and the capture moment the same
on a joined phone), every castle test and the regression set.
