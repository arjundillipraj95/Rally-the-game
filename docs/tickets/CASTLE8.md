# CASTLE8 The nexus; the Crown no longer ends the match

Model: O · Written 16 Nov 2026 from the design doc (Map: Nexus; Scoring) and Arjun (Crown: 8 points and buffs, end at 10:00)
Status: built on launch26 (not shipped)

## What to build (`core/sim/nexus.js`, numbers `CASTLE26.nexus`)
1. Each side's nexus is a breakable (`G.c2.breaks`, kind 'nexus', health `hp`), hit by champions and soldiers of other
   sides only once its side's middle castle isn't theirs, and never while its side holds the Crown.
2. Broken: the breaking side scores `pts` (in points, the results' breakdown and the snapshot); its owners' armies lose
   `morale` at once and can't climb over `low` for `lowT` s. It stays broken (crystal gone, a burst). Banner and feed line.
3. The Crown: 8 points; taking it no longer ends the battle (10:00 does). Its side's morale never drops under 50 (its
   armies can't rout) and its nexus can't be broken. Computer captains stop going to the glacier once the Crown is taken.
4. A health bar over a nexus for 6 s after a blow.

## Done when
`store/r_CASTLE8.mjs`: closed while the middle castle is theirs, open to another side once it isn't, never to its own
side, closed while its side holds the Crown; broken: +5 points, owners' morale down and capped, no second score; the
Crown taken: battle goes on, 8 points, its side's morale floor. Regression set.
