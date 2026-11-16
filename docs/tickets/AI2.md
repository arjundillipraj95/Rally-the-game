# AI2: computer captains clear the jungle
Status: done (launch26)

Arjun (07:22): "the computer should start clearing jungles".
- By day on the new mountain, a computer captain marches for his own side's camps: the buff camps first, then gold, the nearest of each. Night is the glacier's.
- A side of 2+ captains: its last computer captain is the jungler, full time.
- A lone captain (offline, one a side): only his buff camps, about a third of his plans (`CROWN26.jungle.solo`), when none of his castles is under threat (70 m); off a march only for a camp within 50 m and nearer than the castle; never off a siege.
- Cost: castles fall a little later (offline: 5/12 held at 150 s, was ~10; 10-12 by 300 s either way).
- Code: `jungleCamp` in core/sim/holds.js. Test: store/r_AI2.mjs (200 s offline: camps marched for, cleared, buffs).
