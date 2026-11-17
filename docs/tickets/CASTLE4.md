# CASTLE4 The capture circle

Model: O · Written 16 Nov 2026 from the design doc (Map: Castles, capture circle) · Arjun's go 16 Nov
Status: built on launch26 (not shipped)

## What to build
Replaces "most men in the castle" for castles (`core/sim/capture.js`):
1. A circle round the courtyard banner opens on a neutral castle once its guards are dead, on a held castle once it
   is open: level 0, or any gate broken (CASTLE1). Not while its banner is rising (45 s after a capture).
2. One side's champions standing in it fill the bar in 6 / 4 / 3 s with 1 / 2 / 3 champions; each soldier of theirs
   in it adds 10%, up to +50%. At least one champion must be in it (soldiers alone don't take castles, as the Crown).
3. Anyone of another side in it (the owner's men, a third side) pauses it; an empty circle drains (`drain` s for a full bar).
4. Inside an open circle your camera pulls back about 15%. The circle shows on the ground (overlay): its edge, the
   bar's fill round it in the taker's colour; on every phone (open/closed, progress and taker come from the snapshot).
5. Computer captains go for the banner, not the castle's middle.
Numbers in `CASTLE26.circle`.

## Done when
`store/r_CASTLE4.mjs`: closed on a level I castle with whole gates, open once one breaks; fill times 6 / 4 / 3 s with
1 / 2 / 3 champions (±0.2); 5 soldiers make one champion's 6 s about 4 s; soldiers alone: nothing; an enemy soldier
inside pauses; empty drains; banner shield blocks; neutral castle opens when its guards are dead; camera pulls back
inside. crown2sim (castles still change hands), crown2online roles off and on, r_CASTLE1/2/3, r_PERF1c pass.

## Out of scope
The capture moment (CASTLE5). Computer champions' full castle play (CASTLE9).

## Open questions
none (soldiers-alone rule: Claude's call, told to Arjun)
