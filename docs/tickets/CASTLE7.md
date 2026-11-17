# CASTLE7 Respawn at a held castle; the wait grows with the clock

Model: O · Written 16 Nov 2026 from the design doc (Map: Respawn) and Arjun's call (16 Nov: respawn grows with the clock)
Status: built on launch26 (not shipped)

## What to build (`core/sim/respawn.js`, numbers `CASTLE26.respawn`)
1. On the mountain a fallen champion waits by the match clock: about 6 s at 0:00, 8 at 3:00, 13 at 6:00, 17 at 8:00,
   20 at 10:00 (straight lines between). Warm-up and other maps unchanged.
2. He comes back at the castle his side holds nearest where he fell, unless it is under attack (an enemy in its turret
   range, an attack alert in the last 8 s, or its circle filling against it); none: his base. He marches out through its
   lane gate (the F7 march). If it fell meanwhile, it isn't his side's: base.
Not built: picking the castle by hand (the nearest safe one is chosen); a pick on the death card can come with the battle screen.

## Done when
`store/r_CASTLE7.mjs`: waits 6 / 8 / 10.5 / 20 s at 0:00 / 3:00 / 4:30 / 10:00; back at the nearest held castle when
calm, at the next one when an enemy is at the first, at base when all are attacked; he marches out. Regression set.
