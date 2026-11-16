# MAP The new mountain (relaunch step 2)

Model: O · Written by the builder 2026-11-16 from design rev 115 (Map section)
Status: MAP0, MAP1 built

Arjun's go (16 Nov, 01:04): build all MAP cards overnight, merge each into `launch26`. His open questions
were not answered; the builder took these defaults (change any of them and the card says where):
1. New map behind `?map26=1` until MAP6 makes it the default.
2. Map size: one size for every battle (CROWN26.R = 205 m), no party scaling: the design is always 12 champions and
   the walk times only hold at one size. (Changed from the first reply's default once the numbers were measured.)
3. "Rivers bound it": the river ring toward the centre plus a river along each country border, bridged.
4. Buff camps and the nexus are placed and tagged only; their rules come with castles / army and gold.
5. Bushes are part of MAP (MAP5).

## Cards
| Card | What | Status |
|---|---|---|
| MAP0 | Split `core/world.js` (782 lines) into `core/world/` by job; `world.js` passes the same 40 names on | built |
| MAP1 | New layout data behind `?map26=1` | built |
| MAP2 | Draw it (`render/mount26.js`) | |
| MAP3 | The match runs on it (spawns, AI, centre phases) | |
| MAP4 | Screens drop villages and keeps | |
| MAP5 | Jungle bushes (hide) | |
| MAP6 | New map is the default; old mountain layout removed | |

## Design rules (Map, locked 15 Nov)
- Each base sits outside the lane ring, safe, reached by one path through its nexus to its middle castle.
- 3 castles per side on the lane ring (12): left, middle, right. No way round a castle into a base.
- Countries spaced apart: a side's 3 castles in one clump with its nexus. Between two countries a border field
  wide enough for two armies, one road through it, then the neighbour's castle. About 8-10 s on foot from your
  outer castle to the neighbour's. Base-to-Crown walk about 25-30 s (widen the ring rather than deepen it).
- Middle castle owns the King's Road (straight, clear road to the Crown); left and right a jungle half each.
- Each side's jungle lies inside the ring, split by its King's Road. Rivers bound it; bridges to the
  neighbouring jungles and to the centre.
- Jungle is open ground with bushes: inside a bush you and your army are hidden until you attack or an enemy
  enters the same bush.
- Each jungle half: a buff camp (left war drum, right swift) and 2 gold camps.
- Keeps and villages are removed. The centre (the arena) holds the Sceptre and the Crown.

## MAP0 (built)
`core/world/`: util, size, features, ground, build, mount, terrain, layout (max 262 lines). Code moved, not
rewritten; the only change: `makeLayout` calls `resetRiver()` instead of setting `RV` (now a live export of ground.js).
r_SPLIT identical roles off and on (60 s seeded battle, names, page, draw calls 110); crown2sim and crown2online
pass roles off and on; lag 250 ms: position error mean 0.23 m, response 144 ms.

## MAP1 (built)
`core/world/map26.js` (the layout), `core/world/flag.js` (`?map26=1`), `CROWN26` in config.js. Per side: base on the
rim (walled yard open toward its nexus), nexus (placed only), left/middle/right castles on the lane ring (the middle
one has a small back gate to its nexus), a country wall behind the castles out to the cliff, 6 camps (per half a buff
camp and 2 gold), border field with the lane road. King's Road base to arena gate; outer castles' roads down to the
river ring. Rivers deep (no fords): the ring (12 bridges) and one down each border (bridged), so jungles join the
neighbours'. Ridge broken only at the King's Roads and outer castles' roads. Chasm and arena as before.
Other changes: `mountY` reads `mountK()` (the playing mountain's radii); `bakeRiver` takes extra river lines;
nav grid grows to the map (`W.R + 6`) only on the new mountain. Flag off: r_SPLIT identical.
`r_MAP1.mjs` (Node, 4 seeds): counts; each base cut off with its middle castle's back gate shut, reached with it
open; every castle, camp, base and the arena reached from a base; on foot (6.3 m/s, roads x1.15) outer castle to the
neighbour's 9.4-9.6 s, base to the Crown 27.0-27.3 s.
Risk: online, both phones must have `?map26=1` (the joined phone builds the map itself) until MAP6.
