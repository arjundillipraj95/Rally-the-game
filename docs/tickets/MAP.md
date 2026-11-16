# MAP The new mountain (relaunch step 2)

Model: O · Written by the builder 2026-11-16 from design rev 115 (Map section)
Status: MAP0-MAP12 built on `launch26`, not shipped; MAP8-MAP10 next (Arjun approved the map 16 Nov 07:38)

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
| MAP2 | Draw it (`render/mount26.js`) | built |
| MAP3 | The match runs on it (spawns, AI, centre phases) | built |
| MAP4 | Screens drop villages and keeps | built |
| MAP5 | Jungle bushes (hide) | built |
| MAP6 | New map is the default; old mountain layout removed | built |

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

## MAP2 (built)
`render/mount26.js`: country walls (stone and cap per wall stone, merged) and the nexus (stone plinth, pole, the side's
banner: a stand-in until castles). `render/mountain.js` reads `mountK()` for the ground's tiers and the chasm
bridges, and on the new mountain merges all torch posts into one draw. `render/world.js` draws the border rivers
in the river's one mesh (muddy banks, no grass in them). Border rivers end at the ridge's foot. Flag off: r_SPLIT identical.
`r_MAP2.mjs`: battle starts with no errors Low and High; one river mesh with the 4 border rivers; 4 nexus banners;
824 wall stones. Start view, old mountain -> new: Low 150 -> 176 draw calls, 585k -> 796k triangles; High 160 -> 189,
683k -> 891k. Measured apart: the map itself is level (+6 to +11 draws with every unit hidden; same instanced
geometry but for rocks and posts). The rest is the neutral men: 24 bandit camps x 5 men + 12 castles' guards = 180
men vs 100 on the old mountain. Decision for Arjun: fewer men per camp (e.g. 3) brings it back to level.

## MAP3 (built)
Most of the battle already read the layout (homes, castle walls, camps, chasm, arena), so it ran as it was. Fixed:
computer captains crossed between tiers at the old mountain's gaps (every 45 degrees); on the new mountain they use
its own (`m26Cross` in `core/sim/ai.js`: the ridge's gaps, the river ring's bridges, the chasm's bridges), and
`c2Route` reads `mountK()`. Every computer captain heads for the glacier `CROWN26.allGo` (40) s before the crack,
not 20 (a longer walk). `store/lagtest.mjs` takes `Q=` for another battle.
`r_MAP3.mjs` (roles off and on): captains start in their bases; castles taken on every side; the chest broken
open by an army; computer captains reach the arena at night; the match ends with points; no errors.
crown2sim and crown2online pass with `&map26=1` (both phones agree: 36 posts, 12 holds).
Lag 250 ms, old -> new mountain, 3 runs each: response 141/195/234 -> 397/111/122 ms, position error 0.21-0.26 ->
0.05-0.08 m, jumps 54-106 -> 43-158 (more men on the field). No worse within the noise.
Not in MAP: computer captains never farm camps on purpose (only on the way past): lanes and jungling come with the
match loop. Found, not fixed (STATE known bugs): now and then a computer captain stands at the glacier without
striking (about 1 run in 6; r_MAP3 reports it as a note).

## MAP4 (built)
On the new mountain only: Points panel lists "Castles" (12), no villages block; "Army full" says take castles; the
herald's castle line has no keep; the report's fridge-magnet line says castles; the lobby's lane note says Left and
Right build the outer castles, Jungle the middle castle and both jungle halves; the minimap adds the border rivers,
the King's Roads and each nexus. Left as is (not the map's): the season challenge "Take 4 villages or mines".
`r_MAP4.mjs`: Points panel, battle screens through a whole battle, end screen and report: no village or keep; no errors.

## MAP5 (built)
40 bushes (`CROWN26.bush`: 5 per jungle half, r 3.6-5.2 m, mirrored and turned like the trees; walkable; trees keep
out of them). `core/sim/bush.js`: every frame who stands in which bush; a man in a bush is hidden from another side
unless one of theirs is in the same bush, or he struck in the last 1.5 s (`u.atkT`, set by a swing, a shot, a
throw); the Crown's carrier never. Hidden = not drawn on their phones (`render/fog.js`: on the new mountain only
bushes hide; a joined phone works out the bushes itself) and not picked as a foe (`nearestFoe`), so computer
captains and every army's men don't see him. Drawn: leafy clumps, one instanced draw.
`r_MAP5.mjs`: 40 bushes in the jungle, walkable; an enemy captain in a bush is hidden (not drawn, not picked);
seen with one of yours in the same bush, after he strikes, and outside; one draw; a minute of battle with no errors;
the old mountain has no bush rules. Flag off r_SPLIT identical; crown2sim/online pass both ways; lag 250 ms on the
new mountain: response 139 ms, position error 0.07 m (same as MAP3).
Limits: on a joined phone the "seen after he strikes" moment follows the swing animation only (the strike time
isn't sent). No cue yet for your own men that they are hidden (battle screen step).

## MAP6 (built)
The relaunch's mountain is the mountain: `?map26` and `core/world/flag.js` are gone, `mountPlaces` (keeps, villages,
8 lane castles), its names and `CROWN2.R/scale/r/castleA/fieldA/campA` removed; `mountK()` is `CROWN26.r`; the AI's
old 45-degree crossings removed. Village code stays for the other maps (Grass Valley). r_SPLIT baseline re-saved
on the new mountain (the battle changed on purpose; names, page and errors the same; draw calls 110 -> 108).
`r_SPLIT.mjs` now settles 2.5 s after the battle starts (`WAIT=`): on the bigger mountain a model could land
mid-battle and draw on Math.random, so 1 run in 3 drifted; 8 of 8 identical since. r_MAP1-5 pass (no flag);
crown2sim/online pass roles off and on; lag 250 ms: response 109 ms, position error 0.05 m.

## For Arjun
- Camp size: 24 camps x 5 men = 180 neutral men (100 before): +25-30 draw calls, +35% triangles at the start view.
  3 men a camp brings it back to level. Your call.
- Walk times measured at 6.3 m/s (today's human captain): border 9.5 s, base to Crown 27 s. If champions get
  another speed, CROWN26.R and castleA retune them.

## Round 2 (Arjun's notes, 16 Nov 07:22 and 07:32; map approved 07:38)
| Card | What | Status |
|---|---|---|
| MAP7 | Base on a peak over the clouds: base, brick castle road, nexus, King's Road to the middle castle; no fence | built |
| MAP8 | Jungle opens only at the King's Road and in the middle of each border field; border rivers end short of the ridge; no outer-castle roads | built |
| MAP9 | Armies cross rivers only on bridges; archers shoot across | built (proof only) |
| MAP10 | Bushes on the inner ring (between the river and the chasm) | built |

## MAP7 (built)
The mountain's rim is just behind the castles (R 148 m; lane ring 4 m inside it, so every castle's back hangs over
the cliff). Each side's peak stands out past the rim over the clouds: a 14 m wide road from the middle castle's
broad back gate, stone (King's Road) to the nexus plaza, brick (the castle road, 12 m) to the base, the base's yard
paved; cliffs all round; joined to the mountain only through the middle castle. No country walls.
Code: `peakSd()` in `core/world/map26.js` (how far outside a peak a point is); the cliff falls from the land's edge
(`terrainMeshY`), the walking grid and `integrate` let men stand only on the peaks past the rim (they slide along
the edges), the road grid and nav grid reach the peaks (`L.ext`), the ground mesh grows to fit (500 m, 254 cells).
Paving: `buildPeaks` in `render/mount26.js` (2 draws). r_MAP1: base sealed through the cliffs; border 9.5 s; base
to Crown 28.2 s (199 m) at 6.3 m/s. r_MAP3 passes; crown2sim/online pass; r_SPLIT re-baselined.

## MAP8 (built)
The ridge opens only at each King's Road and in the middle of each border field (18 m wide, `CROWN26.border.open`),
with a dirt track from the lane road in through it. Border rivers start at the ring and end 14 m short of the ridge
(`border.short`), narrowing to their end; past it the two neighbouring jungles meet below the opening, so both
sides can come out to flank the lane. No roads from the outer castles into the jungle, no border bridges (12
bridges, all on the river ring). Computer captains cross the ridge at the King's Roads and border fields.
r_MAP1: with every castle gate shut, both jungles are reached from each border field; 12 bridges; 10 roads.

## MAP9 (built: proof only, no code change)
Already so since MAP1: no fords, the rivers are deep but for the bridges. `r_MAP9.mjs`: every river point off a
bridge is deep; over 3 minutes of battle nobody stands in deep water; men walked toward the far bank never wade;
an archer 13 m across the river ring hits a man on the far bank (18 arrows, 65 damage in 20 s). (An archer told
to follow keeps within reach of his captain, as before.) No code changed: r_SPLIT and crown2 runs unchanged.

## MAP10 (built)
Two bushes a side on the inner ring (`CROWN26.bush.inner`: 0.3 rad either side of the King's Road, r 4.5 m, halfway
between the summit's ring road and the river's inner bank): 48 bushes in all. `bushTick` checks men between the
nearest and farthest bush (`L.bushR`) instead of the jungle's ring. r_MAP5 updated (48, the inner 8 placed right).
r_SPLIT: roles off identical before re-save; roles on drifted at 2 s once (+12 draw calls): the model-load race
seen in MAP6 is rarer with the 2.5 s settle but not gone (STATE known bugs).

## MAP11 Polish (built)
Looks only, no rule changed. The King's Road paved in stone from the middle castle's front gate down through the
ridge to the river, and on to the chasm; a low stone parapet with posts along the peak road (at the road's height);
a pair of standing stones at every ridge opening; each buff camp flies its buff's banner (drum red, swift blue);
the nexus is a shining crystal in the side's colour on a stepped plinth with three shards (Arjun, 08:55; breaking
it comes with castles); castle names show within 70 m (or while a castle is fought over), not all 12 at once.
`r_SPLIT.mjs`: three.js draws on Math.random for every new mesh's id; those calls now get their own stream, so
scenery or a model landing mid-battle no longer moves the seeded battle (the drift noted in MAP6/MAP10 is gone:
identical 3 of 3, and identical with the polish taken out). r_MAP2 updated for the peaks. Start view draw calls
Low 181, High 192 (CAMP1: 179, 192).

## Round 3 (Arjun 10:04, go 10:12): MAP12 castles off the edge, MAP13 natural rivers, MAP14 League-style bushes
## MAP12 (built)
The rim moved out to 15 m past the castles' walls (R 170; every place keeps its metres: lane 144, ridge 118, river
82; the peak's nexus 179 and base 208, out past the rim). The middle castle's curtain walls run from its sides along
the peak road's edges out over the cliff, so the peak is still reached only through the castle; no fence elsewhere.
r_MAP1: castles have 15 m of ground behind their walls; base sealed; border 9.4 s; base to Crown 29.3 s (207 m).
r_MAP3, crown2sim/online pass; r_SPLIT re-baselined (one roles-on run drifted at 2 s, 2 reruns identical: some async
load still draws on Math.random now and then).
