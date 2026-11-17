# CASTLE5 Capture moment, Held!, under-attack alert

Model: O · Written 16 Nov 2026 from the design doc (Map: Castles, capture moment) · Arjun's go 16 Nov ("build everything in castle")
Status: built on launch26 (not shipped)

## What to build
1. Taken (every phone, from the announcement): old banner tears, dust at its gates, horn and sting, one of the taker's
   men calls it (new banter `taken`), a beat of camera (back and up, 1.3 s) if your captain is within 45 m; banner and
   feed as before (texts refreshed); map icon recolours (already). Gold: the taker's army as before, every other army
   on the side `CASTLE26.moment.side`.
2. Held!: a siege starts when a plate is knocked off or the circle starts against the owner; once no enemy has been in
   turret range for `heldAfter` s it is held: `held` gold to each of the owner's armies, banner "Held!", feed line,
   cheer, a defender's call (banter `held`).
3. Under attack: a gate hit, the circle started, or the turret on a champion warns the owner side (banner, and an
   arrow at the screen's edge or a "!" over the castle for 6 s), at most once in `alertGap` s a castle.

## Done when
`store/r_CASTLE5.mjs`: a capture announces (castle), sparks at the banner and gates, horn and capture sounds, a
taker's soldier speaks, camera beat when near, other armies of the side +side gold; a plate broken then calm for
heldAfter s: Held with +held gold each owner army; alerts rate-limited. crown2sim/online roles off and on, r_CASTLE1-4, r_PERF1c.

## Open questions
none
