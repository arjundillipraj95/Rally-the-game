# CASTLE6 Holding a castle: points, healing, Crown shards

Model: O · Written 16 Nov 2026 from the design doc (Map: Castles, holding; Scoring) · Arjun's go 16 Nov
Status: built on launch26 (not shipped)

## What to build (`core/sim/holding.js`, numbers `CASTLE26.hold`)
1. Points at the end: the middle castle 5, an outer castle 3 (points, results breakdown).
2. Healing: every 3 s, +8 health for each of the side's men in the castle's yard, none while an enemy is in it.
3. Crown shards: the first side to take a castle keeps its shard all match (`h.shardBy`, `G.c2.shards`); a shard adds
   25 to each of the side's armies' horn (the army ult meter, until the champions' army ults are built). Breaking a
   nexus takes up to 2 of its side's shards. An unclaimed shard shows as a diamond after the castle's name. Snapshot:
   shards (mountain field 10), each castle's shard (holds field 12).

## Done when
`store/r_CASTLE6.mjs`: middle +5, outer +3; healing +8 per 3 s, none with an enemy in the yard; the first taker gets
the shard (+25 horn), a later taker doesn't; a nexus broken moves 2 shards. Regression set.
