# PERF1 Performance check of the new mountain (tracker S1-1)

Model: O · Written by the builder 2026-11-16 from the code on `launch26` (f4154d1)
Status: PERF1a and PERF1b built (16 Nov); PERF1c waits for Arjun's pick

## What to build
Measure the new mountain against the old one on a low-end Android profile, at the start and in a mid-battle crowd
(about 160 soldiers plus 3 champions on each of the 4 sides), report frame rate, draw calls and triangles, recommend
one fix (soldier cap, lighter far soldiers, or trimming the camps). Arjun decides; the fix gets its own card.
Plus a short checklist for Arjun's weak-phone test on the preview site.

## Cards
| Card | What |
|---|---|
| PERF1a | `store/r_PERF1.mjs`: the measuring tool (below), run on the new mountain and the old one |
| PERF1b | The report and one recommendation, in STATE.md and this card; the phone checklist |
| PERF1c | The fix Arjun picks (its own card, written after his pick) |

## How it measures (PERF1a)
- Old mountain = `t/SPLIT` (same code, before MAP1), served from a worktree on :8767; new = `launch26` on :8766.
- Low-end Android: Chromium with CPU throttled 4x (Lighthouse's mobile setting), 844x390 at pixel ratio 2, Low graphics.
- Two scenes on each mountain: the start view; a staged crowd 60 s in at a border field (new) / a lane castle's field
  (old): 4 sides x 40 soldiers (28 foot, 12 archers) plus 3 champions each, two sides fighting, two marching in,
  my champion in the middle, camps and guards left as the battle has them.
- Draw calls and triangles on a fixed frame (the fake clock, so they don't wobble); frame rate over 10 s on the real
  clock; and where the time goes: rules (sim step) ms and drawing ms per frame, so we know which fix pays.

## Done when
`r_PERF1.mjs` prints both mountains side by side (start and crowd: fps median and slowest 5%, sim ms, draw ms,
draw calls, triangles, men drawn) and fails on any page error.

## Gaps and risks found in the code
1. The Crown today starts 1 captain and 5 men per side (`core/sim/match.js`); `?stress=1` doesn't reach the Crown.
   The 12-champion, 160-soldier crowd has to be staged by the test with `__fb.mkUnit`. Extra captains aren't side
   leaders: the test holds them with orders so they stay in the fight.
2. **Unit cap:** `render/soldiers.js` draws at most 320 men (`MAX_UNITS`) in list order, not by distance. Neutrals
   alone are about 156 (12 castles x 5 guards, 16 gold camps x 3, 8 buff camps x 6); add 160 + 12 and it's ~328: men
   can silently vanish, maybe near you. The test counts it. Likely its own fix whatever Arjun picks.
3. Headless Chromium draws with SwiftShader (software), so absolute fps is lower than a phone's GPU; the old-vs-new
   ratio and the sim/draw split are what to read. Arjun's phone test gives the real number.
4. The host runs the rules for everyone; a joined phone only draws. Measured on the host (the worst case).
5. r_F8's 0.5% triangle check is noise-flaky; this test reads fixed frames instead.

## Results (PERF1a, 16 Nov; `r_PERF1.mjs`, CPU 4x, Low, 844x390)
| Scene | Map | CPU fps | JS ms (rules + drawing) | Draw calls | Triangles | Men |
|---|---|---|---|---|---|---|
| Start | old | 49 | 20 (1 + 19) | 324 | 655k | 124 |
| Start | new | 43-49 | 21-23 (1-2 + 19-22) | 368 | 853k | 180 |
| Crowd | old | 13 | 77 (7 + 70) | 615 | 1.64M | 292 |
| Crowd | new | 7.5-8.4 | 119-133 (12-21 + 98-120) | 800-810 | 1.93-1.98M | 348 |

Fix experiments on the new crowd (men taken out of the drawing; battles vary, so +-15 ms):
trim a quarter of camps and guards -> 107 ms, 502 calls; far men off (168) -> 93 ms, 419 calls; nearest 200 only
-> 102 ms; **only the nearest 24 men as full models (the rest as the light far figure) -> 67-87 ms, 321-397 calls**.
Read: the start is level with the old map; the crowd is ~40% slower. The cost is the ~70 men within 14 m drawn as full
models (2+ draws and a skeleton each), and every man is posed every frame, on screen or not. Unit cap: 348 to draw > 320.

## Recommendation (PERF1b)
Lighter soldiers, by count not distance: full models for the nearest ~24 men (Low; more on higher rungs, in `QUALITY`),
everyone else the light far figure, and skip the skeleton work for men drawn light or off screen. Same commit: the
320 cap keeps the nearest men, so nobody near you vanishes. Not a soldier cap (hides armies, saves least) and not
trimming camps (small saving, changes the jungle).

## Arjun's phone checklist (preview site, a cheap Android, Low)
1. Start a Crown battle: smooth from the march out? Note the Settings fps if shown.
2. Run to a border field while two armies fight; watch for stutter as you reach them.
3. Fight in the middle of it for 30 s: does the stick lag behind your thumb?
4. Look for men popping in or out near you.
5. Ride from base to the Crown: any hitch at castles or bridges?
6. Phone warm after 5 minutes? Does it get slower?

## Design rules it relies on
"The 12 castles bound the whole map at about 160 soldiers" (design doc, Army size). Targets: iPhone 13+/S23+,
but every Android must work and adjust itself (F14 Auto ladder).

## Where to start in the code
`render/soldiers.js` drawSoldiers, MAX_UNITS, drawFar/drawHero (near: 14 m on Low); `render/heroes.js` FAR_ON;
`render/quality.js` + `QUALITY` in config.js; `core/sim/neutral.js` and `CROWN26.camps` (camp sizes);
`core/sim/melee.js` grid; `main.js` `__fb` (info.gfx, mkUnit, step).

## Out of scope
Building any fix before Arjun picks; the Auto ladder's rules (F14).

## Open questions
None to start.
