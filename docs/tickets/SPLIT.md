# SPLIT Split core/sim.js and main.js by job

Model: O · Written by the builder 2026-11-15 from the code (graphify not installed this session; mapped with grep)
Status: built (not shipped), on branch `t/SPLIT`

## What to build
First step of the relaunch (then: map, castles, champions Titus/Devi/Sigrun, army and gold, match loop,
battle screen). Split `game/src/core/sim.js` (2,941 lines) and `game/src/main.js` (1,053) into files by job.
Every file under 500 lines, aiming for ~300. Behaviour unchanged. Code is moved, not rewritten: function
bodies stay as they are (exceptions: the `pathBudget` setter and main.js's shared values, below).

### core/sim/ (sim.js stays as a facade re-exporting exactly today's names)
| File | Job | Lines (approx) |
|---|---|---|
| util.js | say, fx, spark, sound, lvl, allianceOf, CC | 40 |
| match.js | newTeams, mkUnit, march, homes, adoptBattle, startMatch | 170 |
| army.js | orders, morale, rally, recruit, upgrades, speed, horses | 200 |
| melee.js | spatial grid, stamina, swings, clash, hit | 290 |
| duel.js | duels, executions | 245 |
| guard.js | ride-by strikes, parry, block, heavy, brace | 205 |
| missiles.js | shoot, javelins, arrows, volleys | 135 |
| score.js | die, castles, scores, end, control points | 155 |
| forts.js | forts, gates, plaza wall, towers | 125 |
| holds.js | holds, chest, flag | 130 |
| crown2.js | Crown holds/points/phases, lake and flood | 190 |
| neutral.js | garrisons and camps | 120 |
| captain.js | captain moves | 260 |
| move.js | nav, moveToward, go, integrate, fallStep | 100 |
| ai.js | computer captains | 185 |
| soldier.js | formations, thinkSoldier, aiPick | 140 |
| step.js | update, driveCaptain, regenJavs, endStep | 300 |

### app/ (from main.js)
| File | Job | Lines (approx) |
|---|---|---|
| main.js (stays at src/) | imports, boot, loop, watchdog, __fb | 170 |
| app/state.js | shared values (paused, hitstop, hitstopN, slowmo, soloAl, playFmt, lastStart) | 30 |
| app/fxbus.js | bus listeners for effects | 140 |
| app/endscreen.js | results, report, moments, rank, crests, tabs | 215 |
| app/home.js | home demo, camera, pedestals, party, intro, beginMatch | 165 |
| app/friends.js | toast, friends, search | 85 |
| app/menus.js | settings, solo setup, warm-up, missions, shop, pause | 230 |

## How the risks are handled
1. `pathBudget`: lives in move.js with nav; update sets it via `setPathBudget(n)`.
2. Import cycles: new files run no imported function at load time (top level only declares).
   A guard script imports each new file alone in Node and fails on any TDZ error.
3. main.js shared values move to `app/state.js` as one object `S`; every use becomes `S.x`;
   grep afterwards for stragglers. `__fb.hitstop()` / `__fb.slowmo()` read `S`.
4. Start-up order: main.js imports fxbus, endscreen, home, friends, menus in today's section order;
   each keeps its statements in order. Record bus listener order and menu build order before and after: must match.
5. Public surface: before any change, save sim.js's sorted export names and `__fb`'s keys; r_SPLIT compares.

Safety net: a seeded headless battle (60 s game time, roles off and on), fingerprint of every unit's
position, hp and state each second. After must equal before exactly. If the sim can't be seeded,
stub `Math.random` in the test only.

Work in steps: sim.js one file at a time (fingerprint + 1-minute smoke after each), then main.js,
then the full runs. One commit at the end.

## As built (16 Nov)
- core/sim/: 17 files (biggest step.js 319, melee.js 298); sim.js is the 19-line facade (same 115 names).
  Only the names other files use are exported. `setPathBudget` is the one new function.
- main.js 160 lines + app/: state 45, watchdog 42, fxbus 153, endscreen 252, home 201, friends 113, menus 202,
  load 59 (bare imports of every module main.js loaded before, in the old order, so their listeners still come first).
  Shared values that several files change live in `S` (state.js): paused, hitstop, hitstopN, slowmo, soloAl,
  soloMap, soloPick, noIntro, clientIntro, playFmt.
- Start-up order: app files import only earlier files (state, watchdog, fxbus, endscreen, home, friends, menus, main);
  a few small pure functions moved to the first file that needs them (teamCss, devNoIntro, veil, nickFor, resetSolo,
  soloStart, showFmtRank, warm-up, renderMissSub, watchdog, onResize). Checked: the 111 statements that run at load
  run in the same order as before. (A first try imported later files through main.js: Vite's dev server then loads
  main.js twice. Not done.)
- Text moved by a script (acorn), not by hand; eslint: no new undefined or unused names.

## Results
- r_SPLIT ALL PASS, roles off and on: same 115 sim.js names, same 42 __fb keys, page HTML identical, seeded
  60 s battle identical, draw calls 110 = 110, no errors. Proved it catches a change (path budget 2 -> 9: differs at 7 s).
- crown2sim and crown2online pass roles off and on (no errors, host and joined phone agree). `npm run build` ok.
- Lag (5 runs each, alternating): position error 0.23 = 0.23 m, p90 1.13 -> 1.06 m, response 180 -> 158 ms; jumps
  over 0.5 m noisy both ways (before 18-86, after 21-76). Battle step time the same (1.15-1.38 s vs 0.99-1.47 s).

## Done when
- `store/r_SPLIT.mjs`: every file under 500 lines; export list and `__fb` keys same as before;
  game loads with no console errors; seeded fingerprint identical, roles off and on.
- crown2sim and crown2online pass before and after, roles off and on.
- `LAG=250 LOSS=0.05 DUR=60 node store/lagtest.mjs` and draw calls no worse than before.

## Design rules it relies on
None (pure tech ticket).

## Where to start in the code
`core/sim.js` (function index via `grep -nE '^(export |function |const |let )'`), `main.js` the same.
Importers of sim.js: ui/dueltag, ui/holdaim, ui/timeline, ui/hud, ui/messages, render/soldiers,
render/mountain, net/netgame, main.js; tests r_F9, r_F25, r_F26 import `/src/core/sim.js` directly.

## Out of scope
Any behaviour change, renames, rewriting `update`'s body, other files. CLAUDE.md's "sim.js is 2.7k" line
gets fixed with STATE.md at the end.

## Open questions
None.
