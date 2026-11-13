# F1a Batched map: the mountain's still pieces merged (F1, part 1 of 2)

Model: Fable, else O · Written by the owner 12 Nov 2026 from plan P8.1 / P8.9 (tech ticket, no design rev)
Status: built 12 Nov on roles, waiting on Arjun's ship. Low 1,220 -> 269 calls, High 1,226 -> 270, triangles +1%, frames identical. Phone fps: Arjun.

## What to build
F1 (about 1,200 draw calls down to about 150, no visual change, no gameplay change) is split in two (Arjun, 12 Nov):
F1a the map, F1b the men near the camera (`docs/tickets/F1b.md`).

Baseline, 12 Nov on roles at 3df5b61 (Crown start, seed 12345, frame 360, 844x390):

| | Low | High |
|---|---|---|
| Draw calls | 1,215 | 1,224 |
| Triangles | 547,482 | 647,145 |
| Map meshes, one each | ~1,270: 716 boxes, 265 cylinders, 100 cones, 96 torch sprites, 38 planes... | same |
| Rigged men near the camera | 148 meshes (F1b) | 153 |

1. At build time, merge the map's still pieces that share a material into one mesh per material per grid cell
   (cells sized so off-screen ones are still culled; the builder picks the size from the triangle numbers).
2. Pieces that move, change or get hidden stay separate: gates, the lake, the flood, the chest, banners and
   anything an `update*` function touches.
3. The 96 torch sprites: today they are drawn even while invisible (opacity 0 until 7:30). Hide them while
   invisible, and draw them as one instanced batch of camera-facing quads that keeps each torch's flicker.
4. Keep `?f1=0` (the old, unmerged map) for one release, for comparison.
5. (Built) The live pieces left ~230 draws, so their builders batch them too, by the same show/move rules: each
   castle's fort pieces per level (one mesh per tier), the holds' cloths (instanced, ripple in the shader) and rings
   (one mesh, colour/opacity per hold), garrison banners and camp fires (instanced), the glacier's crown (one mesh).
   Materials that differ only in colour share a batch (colour moved into the vertices).

## Done when
`game/store/r_F1a.mjs`, headless, same seed and frames as the baseline, Low and High:
- (a) draw calls before (`?f1=0`) and after, printed; the map's share down from ~1,050 to under 100.
- (b) triangles before and after; up by no more than 5% (the cost of drawing a cell partly off screen).
- (c) frame compare at the Crown start, mid-battle, at night (torches lit) and with castles at level III, camps out
  and holds taken: under 0.5% of pixels differ by more than 8/255. `?f1=ab` (dev) keeps the old pieces hidden beside
  the batches so both are drawn from the very same frame (two runs never match to the pixel). Shots: `SHOTS=dir`.
  Map pieces: under 100, and under 130 with every castle at level III (~3 more pieces each).
- (d) the moving parts still work: gates, the 5:00 and 8:00 drains, the flood, the chest (`r_F7-water.mjs` passes).
- (e) no file in `core/` changes; crown2sim and crown2online pass roles off and on.
- Phone fps: Arjun's check.

## Design rules it relies on
None (tech ticket). Plan P8.9: under 150 draw calls on mid phones.

## Where to start in the code
- The map group is one scene child (~173 children, ~1,270 meshes); probably built from `render/world.js`
  (builder confirms). Builders: `render/mountain.js` `buildMount()` (~153), `render/features.js`,
  `render/holds.js`, `render/castlefort.js`, `render/palisade.js`, `render/forum.js`.
- Moving parts: `render/mountain.js` `updateMount()` (~271) and the F7-water code.
- Torches: `render/mountain.js` ~222-233 (made), ~291 (flicker).
- Counts: `window.__fb.info.gfx` (`calls`, `tris`); `store/r_F6perf.mjs` measures the same way.

## Out of scope
Soldiers and captains (F1b), gameplay, `core/`, other maps beyond what shares the same builders, F14.

## Open questions
None (Arjun, 12 Nov: thresholds and the torches are the owner's call; chosen above).
