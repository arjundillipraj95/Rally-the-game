# GOLD1 Gold to the agreed numbers (tracker block 5)
Status: built 25 Nov on launch26, waiting for Arjun's look at the numbers before "ship"

Design (Arjun 15 Nov): base income 2/s (was 6), +1/s per castle held to every army of the side (was 2), 150 for taking
a castle (was 200). CASTLE5's 80 to the side's other armies (agreed 16 Nov) stays. Code: `CROWN2.income`, `.gold.castle`,
`.bonus.castle` in config.js; paid in core/sim/step.js and core/sim/crown2.js (unchanged).

Test: `store/r_GOLD1.mjs` (whole computer match; earned, spent and army size at 2:00, 5:00, 8:00, 10:00; `EXPECT_NEW=1` checks the config).
Medians, one run each (battles vary):
| Time | Earned before | Earned after | Spent after |
|---|---|---|---|
| 2:00 | 1486 | 1070 | 1176 |
| 5:00 | 3886 | 3437 | 3177 |
| 8:00 | 7132 | 5343 | 3849 |
| 10:00 | 9923 | 6712 | 4546 |
Read: about a third less gold by 10:00, not two thirds: camps, kills, captures and the chest still pay as before.
crown2sim and crown2online pass, roles off and on.
