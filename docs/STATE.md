# Rally: project state

Current work: **friends' playtest fixes (F tickets) and lag (Phase 0)**, then Roles & Combat (design and plan in
Claude Docs, links in CLAUDE.md). Every builder updates this file as the last step of its ticket. Owner: Opus owner chat.
Last updated: 2026-11-16 (MAP cards on `launch26`). Before: 2026-11-16 (SPLIT built on `t/SPLIT`). Before: 2026-11-14 (F4 built on `t/F4`; F2 one lobby built on `roles`; M3 dropped by Arjun). Before: 2026-11-13 (F14 rebuilt to Arjun's picks on `roles`; F7 built on `roles`; F15, F12, F13, F16 shipped to main at 1018462; voice diagnostics on `roles`). Older detail: `docs/history/2026-11-log.md`.

## Live on main
- Shipped 14 Nov (Arjun's "ship whatever is ready"; main = roles at 5b30ce7): V1b (private voice relay; Arjun's 3 secret steps still
  needed, public relays meanwhile), V2 party voice, F21 music, F2 one lobby (new online service deployed), F4 real garrisons.
- P0.1 Dead-code cleanup · P0.2 Lag harness · P0.3 Ping readout · M1 Neutral soldiers look like soldiers
- P0.7 Smooth everyone else (joining phones draw others between two host snapshots; 20 snapshots a second)
- F11 Same results and names on every phone (host's battle record sent to all phones at the end)

## Shipped to main 12 Nov (Arjun's "ship"; main = roles at b598dda)
- F10 The mountain's edge, then F10b The summit feeling (cliffs drop into a cloud sea; far peaks, sun, birds, snow).
  Checked 11 Nov, object by object: F10b's scene is slightly lighter than main (593k vs 595k triangles; 60 cliff
  trees removed), plus 4 small objects. `store/r_F10b.mjs` compares rendered frames, which vary with random units
  and camera: don't read its totals as a regression. Arjun judges the feel on his phone.
- V1 Team voice: open mic to your own team in online battles, mute button beside Shout; phones call each other
  directly (no voice for a player on the relay).
  11 Nov tests on real phones (raw.githack, `roles`): first, teammates matched by seat (fixed: by side). Second,
  still silent; Android stuck muted. Fixed: a refused mic can be asked again with a tap (Android's Chrome may refuse
  an ask that isn't from a tap); every step says on screen what happened. Most likely cause of the silence: the two
  phones' game link had fallen back to the relay ('r-' names), which carries game data, not sound; voice waited
  forever. It now says so, and gives up on a call that doesn't link in 12 s.
  `r_V1.mjs` (touch phones; one starts refused, then allows and taps): sound energy arrives both ways, is played,
  mute silences it, unmute brings it back. `NOLINK=1 r_V1.mjs`: no road between the phones, the phone says so.
  Real fix for relayed phones: a TURN relay that works (V1b). Needs an Opus review before shipping.

- F6+F5 Hit feel and the death sequence (card: `docs/history/tickets/F6.md`, with the decisions made and the sounds needed).
  Blades meet (two captains swinging at each other: neither blow lands, both pushed back), a blow on a shield, a
  captain cutting a soldier down: each with flash, sound, hit-stop, camera kick, vibration, same on joined phones.
  Death: camera stays on your body, grey screen, card with who and what with, countdown, fade to black, back at home.
  New Vibration setting. `r_F6.mjs` 49/49 on host and joined phone; Low draw calls 1218 -> 1191, triangles -1%;
  crown2sim and crown2online pass roles off and on; lag no worse (jumps 167 -> 55, error 1.15 -> 0.90 m).
  Only seen headless: Arjun judges the feel, the vibration and the four placeholder sounds on his phone.
  Found, not fixed: the host's own hit-stop slows the rules for everyone for 30-100 ms (was so before F6).

- F8 Real animation for the captain (Mixamo clips on one shared skeleton, blended; upper body attacks while the legs
  run). Card: `docs/history/tickets/F8.md`. r_F8 passes; crown2 tests pass roles off and on; Low draw calls level (1214 vs 1216).
  No spin clip: the combo's spin plays slash3. Heavy blow, bash, war cry, spear stay on the code pose. Soldier clips
  prepared, used by F1. Same commit: helmets cut to three Roman ones (Arjun, 12 Nov). Arjun judges the feel.

- Closet fixes (12 Nov, Arjun's list: C2, C3, C1, C4, C5), one commit each:
  - C2 "Leather & fur" is now "Burnished iron": it was matte leather, so its look became dark brown worked iron
    (captain and far soldiers; fur mantle gone). Same list place. `r_C2.mjs` checks the name and shoots each armour.
  - C3 Weapon tab hidden from the closet (looks only; the slot and saved choices are kept). `r_C3.mjs`.
  - C1 Three Roman helmets free (season locks off); their metal takes the armour finish's colour. `r_C1.mjs`.
  - C4 Capes: the new captain body had none (F8). Now a team-coloured cape on the chest, lifting as he runs: Long, Short,
    No cape (the default). Mantle and ermine hidden. `r_C4.mjs`.
  - C5 Checked: faces do nothing on the F8 body (the Face tab saves a choice nothing draws). Report in `docs/history/tickets/C5.md`;
    faces become a package later. Arjun decides whether to hide the Face tab meanwhile.
- F7e/f/g/h (12 Nov): superseded by F7 below (cards kept, tests folded into `r_F7.mjs`).

- F7-water (lake, flood-out, summit gate) shipped to main 12 Nov (main = roles at 3df5b61).
- F1a + F1b (draw calls ~1,220 -> ~151 at the Crown start, same look) shipped to main 12 Nov (main = roles at 8695d5e).

## Shipped detail (F1)
- F1a the map in batches, card `docs/history/tickets/F1a.md`: on the mountain the still scenery is folded into ~20 batches
  (one per look per 120 m cell, colours moved into vertices) and the live pieces batched by their builders (castle
  fort tiers, holds' cloths and rings, garrison banners, camp fires, torches, the glacier's crown). Crown start, same
  frame: Low 1,220 -> 269 draw calls, High 1,226 -> 270; triangles +1%; map pieces 1,283 -> 83 (119 with every castle
  at level III); frames identical (0% pixels differ) at start, mid-battle, night and with castles/camps/holds changed.
  `?f1=0` = the old map for one release. `r_F1a.mjs`, r_F7-water, crown2sim and crown2online (roles off and on) pass.
  Other maps unbatched (same code would apply; not tested). Arjun checks phone fps.
- F1b the men near the camera, card `docs/history/tickets/F1b.md`: each man's plain gear folded into one or two skinned
  meshes (body and armour stay): men 147 -> 29 draws; with F1a the Crown start is Low 1,220 -> 151 draw calls,
  High 1,225 -> 153; triangles +1%; frames identical (start, a fight, three wardrobe looks). `?f1=0` = old.
  `r_F1b.mjs`, r_F8, crown2sim and crown2online (roles off and on) pass. Next draw-call cuts: the horse (P8.5).

## Built on `roles` 12 Nov, waiting for Arjun's "ship" (his go: F15, F12, F13 in that order)
- F15 Always landscape and full screen (`game/src/ui/orient.js`). Android: any tap takes the game full screen and locks it sideways,
  and the next tap after anything drops full screen (the mic prompt) puts it back. Portrait in a battle: a "Turn your phone sideways"
  screen (the battle keeps running underneath; not shown on the home screen, which has its own hint). iPhone: same screen plus an
  Add to Home Screen hint (websites can't lock or full-screen iPhone). Install button (home and turn screen) once the browser offers it.
  `r_F15.mjs` 13/13 with stubbed full screen/lock. Arjun checks on a real phone. Not done: asking for the mic in the lobby.
- F12 Same +2 captain markers on every phone: the host's snapshot now carries which enemy captains each side has cut down
  (new last field of the mountain section; an older host still works as before). `r_F12.mjs`: host and joined phone agree
  even with the joined phone's own list wiped.
- F13 A day in one battle (card `docs/history/tickets/F13.md`). `DAY` table in config.js; sun height/direction, tint, brightness, mist, far
  clouds and peaks follow the match clock; 7:30 and 8:00 equal today's dusk/night (checked). The Crown is always 10:00 (`matchTime`,
  `rules`) and its length selectors are hidden on home and lobby; sunrise/noon/sunset herald lines. Draw calls unchanged (325/152).
  `r_F13.mjs` ALL PASS, shots in /tmp/f13/. Arjun judges the look on his phone.
- crown2sim and crown2online pass roles off and on.
- F16 Water that moves (`game/src/render/water.js`, Arjun's go 12 Nov): rolling swells and fine ripples bend the surface so the sun glints,
  colour swims deep to shallow, crest sparkles (not on Low), foam fringe on the summit lake's shore that goes faster and whiter in the
  flood. One shader on the existing water meshes (lake, Ford river, Crown river): draw calls unchanged. `store/r_water.mjs` shoots it to
  /tmp/water/ (river checked by eye; the lake's framing in the shots missed it, so Arjun judges the lake on his phone).
- Voice: `r_V1.mjs` passes headless (both ways, mute, refused-then-tap). Arjun's real phones: other person can't hear him and no message
  shows. V2-diag (built 12 Nov, Arjun's go): the mic button glows with your voice level, and a small status box under it says per
  teammate: no teammate phones / on the relay / linking / can't link / linked, silent / hearing them, and whether they hear you
  (bytes leaving). `r_V1.mjs` checks it. Waiting for a real-phone test; its text says where voice stops.
- V1d (14 Nov, built on `roles`, card `docs/tickets/V1d.md`): Arjun's host phone showed "Mate 1: not calling yet" = no call ever
  tried (only the lower id calls; the other phone waited for ever, and a call that beat the seats was dropped silently).
  Now: the waiting phone says "waiting for their call Ns" and calls back after 8 s; a call from a not-yet-known teammate is held 6 s;
  failed calls retry (3x, 10 s apart); the box shows ids, who calls, signal ok/LOST, direct vs via relay, calls turned away,
  call-start errors. `r_V1d.mjs` (lower id never calls) and `r_V1.mjs` pass, crown2sim/online pass roles off+on.
  Still unknown: the real cause on the phones (need the OTHER phone's box, devices, networks). Next: V1b if it says relay/can't link;
  then team voice in the lobby, join/leave, carrying on into the battle; all-players channel later.
- V1b (14 Nov, built on `roles`, card `docs/history/tickets/V1b.md`): worker `GET /turn` hands phones short-lived Metered relay credentials
  (secrets `METERED_APP`, `METERED_SECRET_KEY`); phones use them for game link and voice, public relays stay the fallback.
  `r_V1b.mjs` + crown2 pass. Needs Arjun's 3 steps (card) and a ship (online deploys from main); needs an Opus review before shipping.
- V2 Party voice (14 Nov, Opus, built on `roles`, card `docs/history/tickets/V2.md`): friends in a party hear each other on the main
  screen, searching, lobby and battle, no hang-up between them. Own voice peer (not the battle link); Hub shares each member's
  voice id with the party. First time: "Join voice" chip (bar at the bottom of the main screen), then starts by itself. Mute
  yourself or one friend; a friend's chip glows while they talk. Battle-link voice (V1) removed: non-party teammates not heard.
  `r_V2.mjs` (3 phones) 12/12; `r_V1.mjs`, `r_V1d.mjs` retired. V1b review fix: public relays kept after the private one.
- Voice next: Arjun's phone test (party of 2, read the bar's box on BOTH phones), his Metered sign-up + 2 secrets, ship.
  Then V3: non-party teammates, opt-in with per-person mute (S). All-players channel and a team/all switch: later.

## F17 More captain clips (13 Nov, Arjun's animation chat; card `docs/tickets/F17.md`)
- 11 free Cosindra MotionSmith clips put on the shared skeleton (`tools/models/cosindra_export.py` in Blender, then
  `tools/models/extra.py`, run after prep.mjs). Sword: spin finisher, leap, held heavy blow, shield bash. Spear: held
  forward (idle), thrust, sweep; it now lies along the forearm on the clip rig. Javelins: the throw. unit.act
  'knockdown'/'getUp' ready for the roles' knockdowns. Soldiers' file has them too (soldiers still code-posed).
- `r_F17.mjs` 16/16; r_F8 passes (now expects 41 clips and the spin); crown2sim and crown2online pass roles off and on.
  Each anim file +~350 KB. Arjun judges the feel. On `roles` only: Arjun held main (13 Nov) until V1c is reviewed.
- Next: horse (Quaternius CC0, Arjun downloads; the app's browser can't) and rider (sitting pose made, lance to make).

## CL1b No built copy in the repo (15 Nov). Shipped 15 Nov (merged into roles, main fast-forwarded)
- Removed root index.html, assets/, models/, sfx/, icons, manifest (identical copies live in `game/public/`) and `game/scripts/publish.mjs`; `npm run build` now only writes `game/dist`.
- Root `online.json` stays (deploy-online writes it; pages.yml copies it into dist). Shipping = ff main + push.

## SPLIT sim.js and main.js split by job (16 Nov; card `docs/tickets/SPLIT.md`). On branch `t/SPLIT`, not shipped
- `core/sim/` 17 files (max 319 lines), `core/sim.js` passes the same 115 names on; `main.js` 160 lines + `app/` (max 252).
  Code moved, not rewritten. Shared app values in `S` (`app/state.js`); `setPathBudget` in `core/sim/move.js`.
- `r_SPLIT.mjs` (seeded 60 s battle, page HTML, names, draw calls) identical roles off and on; crown2sim/online pass; lag same within noise.
- Found: `core/world.js` is 782 lines (over 500), not part of SPLIT.

## MAP The new mountain (16 Nov; card `docs/tickets/MAP.md`). Cards merge into `launch26` one by one
- MAP0: `core/world.js` split into `core/world/` (8 files, max 262 lines), same 40 names; r_SPLIT identical.
- MAP1: new mountain layout behind `?map26=1` (`core/world/map26.js`, `CROWN26`): 4 countries of base, nexus and 3 castles; walks 9.5 s border, 27 s base to Crown (r_MAP1).

## CL2 Focus the map (15 Nov; card `docs/tickets/CL2.md`). On branch `t/CL2`, not shipped
- Only the Crown on the Mountain in the menus (home, lobby, Quick); other maps and their modes hidden behind `?maps=all`
  (`ui/maps.js`), code kept. A stale hidden pick falls back to the Crown. Warm-up still in the Colosseum. r_CL2 8/8.
- Older tests that click another mode need `&maps=all` in their address.

## F25 The spear hits where it looks (15 Nov; card `docs/tickets/F25.md`). On branch `t/F25`, not shipped
- Hit area = where the drawn spear reaches when the blow lands (`core/spearhit.js`, `CAPTAIN_COMBAT.spear.area`): was
  4.4 m centre to centre, any angle; now poke 2.4 m / sweep 2.35 m over its crossed arc / thrust 2.7 m, along the line.
  Clips land on the rules' frame (`ANIM.swing.*.hd`). r_F25 17/17. Arjun: feel on the phone (reach is shorter now).

## F26 Spear strikes face the target (15 Nov; card `docs/tickets/F26.md`). On branch `t/F26` (from roles), not shipped
- Body turned, weapon not bent: per-clip yaw `ANIM.strikeFace` (thrust +0.74 rad, sweep +1.5 rad; the sweep's arc is now the
  body turning), turn to his facing within 0.1 s, head (then chest past 60 deg) looks along it (`render/rig/strikeface.js`).
  shaftAim no longer bends the spear in strikes (leap/javelin throw still level it; moved to `render/rig/shaft.js`).
  Spear reach re-measured: poke 2.65, thrust 2.95. r_F26 + r_F25 ok. Open: the clips' chest stays 55 deg (thrust) / 85 deg
  (sweep) off the target: the arm hangs from it, so a chest turned to the target turns the spear off. Arjun: accept or new clips.

## F17d Spear combo hit 2 is a sweep in the rules too (13 Nov; card `docs/tickets/F17d.md`)
- Struck like a sword swing: 1.0x, his own reach, the man in front, light knock (`CC.spear.sweep`). Poke and lunge unchanged.

## F17c The spear (13 Nov; card `docs/tickets/F17c.md`)
- The spear you see never moved: F1b folds gear into one mesh pinned to bones, so F17b aimed a hidden spear. Fixed (the
  fold hangs on the spear's joint). Now: upright when held; 1 poke, 2 sweep, 3 lunge (the rules' thrust, thrust,
  skewer); braced level. (F17d: hit 2 now lands as a sweep too.)
- r_F8's perf check (e) is flaky: its 0.5% triangle margin is inside run-to-run noise (0.7%). Needs a fixed-frame comparison.

## F17b Strikes go where he faces, swoosh on the real blade, water (13 Nov; card `docs/tickets/F17b.md`)
- Spear/javelin aimed each frame at a spot straight ahead (`ANIM.shaftAim`): was ~60 degrees off his facing. The swoosh
  is now a ribbon traced by the clip skeleton's real blade (`bladeTrail`), on foot and mounted. Water: uneven swells,
  sun glints instead of the dot grid, light fresnel. Quaternius horse looked at and left out (another art style).
- Tests: r_F17 16/16 (roles off, on), r_F8 43/43 (5 stale pre-F17 checks fixed), r_water, crown2sim + crown2online off/on.
- Arjun checks the feel on his phone. Horse and rider (lance) work still open.

## F7 No abrupt cuts (13 Nov, Arjun's picks; card `docs/tickets/F7.md`). On `roles`, not shipped
- Homes are courtyards: a stone wall round the cottages, 10 m open front; enemies burn and yours heal only inside (safeR 15 -> 9.6).
- Respawn = start: 0.4 s to black, camera moves, 0.4 s back in as he marches out of the yard (dust, horn, untouchable 1 s; a stick
  push takes over). Start: flyover, black, every captain and his men march out in a column. Recruits step out smaller (no horn).
  Joined phones walk their own captain out. Elsewhere than the mountain: the fade only.
- Duel: the shove (0.3 s, easing) plus a stumble and dust, then the ring rises. Execution: two quick steps into place, 0.15 s slow
  motion on the blow (drawing only, every phone near it; the old hit-stop freeze of the rules is gone).
- Chasm "300": 0.5 s teeter in slow motion (windmilling, scream), then the drop; dead at 1.2 s, no body left; your camera holds at
  the rim looking down. Fixed on the way: a man just out of home had his shield stop the chasm killing him, so he fell twice.
- End: a black screen at the battle's end now fades back in (was a snap). Results hold 1.5 s then fade (F7h, kept).
- `r_F7.mjs` (host) and `r_F7-join.mjs` (joined phone) pass; crown2sim, crown2online, c2bits pass roles off and on. Walls +2 draw calls.
  Only seen headless: Arjun judges the feel; the scream is still the placeholder (comic one with the sounds pick).

## F14 Adapts to any phone (13 Nov; card `docs/tickets/F14.md`). On `roles`, not shipped
- Rebuilt to Arjun's picks (replaces the first F14 rule): Auto is a ladder in `QUALITY` (config.js). First guess
  from chip + screen, 5 s probe, then all battle: down in Arjun's order (resolution, shadows, clouds and far
  scenery, distant soldiers, last-resort resolution), up after 20 s smooth. Mid-fight only resolution moves;
  visible steps wait for 2 s of calm. Joined phones adapt too. Rung kept per phone (chip + screen).
- `r_F14.mjs` 37/37 (rule, guess, memory); `r_F14b.mjs` 9/9 (slow headless battle, live switches); crown2sim and
  crown2online pass roles off and on. Arjun checks feel on his phone and a weak Android.
- Process: two chats built F14 at once. Owner: mark a ticket "in progress, <chat>" here before handing it out.
- Next from the visual polish pass (design doc, Changes for the owner): B combat juice extras, C living world, D art pass.

## F18 + F19 + F20 Visual polish pass B, C, D (13 Nov; cards in docs/tickets). On `roles`, not shipped
- F18: Screen shake setting; Crown carrier gets a gold beam + a pulse ring on hand-off; ability bursts in team colour;
  lower, shorter death throws; tone rewritten (banter, herald, results quips: proud, rare dry line, no gags).
- F19: `render/ambient.js`: drifting motes (dust, night flecks, summit embers) and faint sun shafts; none on Low.
- F20: warmer mountain palette. Toon shading NOT done: needs its own ticket and Arjun's eye on shots.
- `r_F18.mjs` 7/7; look shots via `TAG=x node store/r_look.mjs` (/tmp/look). Arjun judges the look and tone on his phone.

## F23 Remove from party, leave party, and F24 frozen host doesn't split the battle (14 Nov). On `roles`, not shipped
- F23: the leader removes a party member (friends panel, lobby pop-up); anyone leaves the party. `r_F23` 10/10.
- F24: ~12 s before taking over from a silent host; an old host back from a freeze rejoins as a player.
  `r_F24` 9/9 (flaky on this machine), `handover.mjs` passes. crown2sim and crown2online pass roles off and on.

## F22 Players keep their names (14 Nov, card `docs/tickets/F22.md`). On `roles`, not shipped
- Joined phones keep every player's name all battle and follow the host's seats live. `r_F22.mjs` 14/14
  (flaky on this machine: pages freeze for seconds); crown2sim and crown2online pass roles off and on.
- Found: a host silent for 7.5 s split the battle in two: fixed in F24.

## F21 Music that follows you (14 Nov, Arjun's sounds chat; card `docs/history/tickets/F21.md`). On `roles`, not shipped
- The score plays recorded orchestra notes (VSCO 2 CE, CC0, 436 KB in `sfx/mus/`) in place of synth tones:
  calm pad and harp; a hand drum and a quicker tempo on the move; drums, bass and horns in a fight; low health
  muffles the music behind a heartbeat; night darker. Synth stays as the fallback until the notes load.
- `r_F21.mjs` 8/8 headless. Arjun judges the mix on his phone.
- Sound shortlist page (private artifact, Claude's picks for "feel there, subtle humour"): sound effects wait
  for Arjun to download the first picks from Freesound / OpenGameArt (the workspace can't reach them).

## F2 One lobby (14 Nov, Arjun's picks; card `docs/history/tickets/F2.md`). On `roles`, not shipped
- Matchmade lobby is a pop-up over the warm-up: four armies' seats (name or Computer), your lane (Left/Jungle/Right,
  only your army sees it), Done = ready; a bar (clock, Lobby button) reopens it. Tap a computer's seat to move; a party
  member moving to another army is asked "leave the party?". All ready: clock drops to 10 s. Then a 10 s versus screen
  (every army, names, lanes) while the phones link up; then the battle. Late joins skip both.
- Service: seats are fixed slots (a leaver's seat is the computer's at once, in the lobby and in a running battle;
  the next player in takes that exact seat); new messages lane/ready/seat, `start` carries lanes and `vs`.
  An old service (live until shipped: it deploys from main) gives the old search box, no versus.
- `r_F2.mjs` (Arjun+Ravi party, Chen, Dev; max 3 phones open at once: 2 CPUs) ALL PASS roles off and on;
  crown2sim and crown2online pass roles off and on. Headless link-up after the versus took ~21 s (slow box).
- Not done: lanes in the battle (plan only, design 02), role pick in the lobby (P6.3), the private lobby, voice.

## F4 Garrisons and camps are real soldiers (14 Nov; card `docs/history/tickets/F4.md`). On branch `t/F4`, not shipped
- 20 posts (12 castles, 8 camps) x 3 footmen + 2 archers = 100 real grey soldiers (ti 12, everyone's enemy). They hold their
  spots; an army's man within 9 m (or a blow on one) wakes the post; footmen chase inside 14 m, archers shoot to 18 m; 3 s
  with nobody near and they walk back and heal. Castle untakeable while a guard lives; camp's last kill pays 50, back in 90 s.
- Numbers: `CROWN2.guards`/`camp`, `NEUTRAL` in config.js. Sleeping men cost ~0.1-0.2 ms a step and no snapshot bytes; draw calls unchanged.
- `r_F4.mjs` 21/21; crown2sim + crown2online pass roles off and on. Arjun judges the feel on his phone.

## Build queue (in order; model = best fit; Fable 5.2 available until 15 Nov)
| # | Ticket | What | Model | Waits on |
|---|---|---|---|---|
| 0 | F21 | Music that follows you: built 14 Nov, waiting for Arjun's listen and "ship" | O | Arjun's ship |
| 1 | F7 | No abrupt cuts: built 13 Nov, waiting for Arjun's "ship" | S | Arjun's ship |
| 5 | F14 | Adapts to any phone: rebuilt 13 Nov to Arjun's picks, waiting for Arjun's "ship" | S | Arjun's ship |
| 6 | F4 | Neutral garrisons and camps fight as real soldiers and ambush: built 14 Nov on `t/F4`, waiting for Arjun's "ship" | O | Arjun's ship |
| 7 | F9 | Horse charges: live on main (shipped with CL1b on 15 Nov; checked by the owner chat 15 Nov, Arjun's "ship") | O | done |
| 9 | F2 | One lobby: built 14 Nov, waiting for Arjun's "ship" | O | Arjun's ship |
| 11 | P0.11 | Matchmake by region first (India with India, US with US) | S | |
| 12 | P0.7b | Finer positions in snapshots; version check so old and new phones don't mix | S | |
| 13 | P0.4 | Best host | S | |
| 14 | P0.10 | Server-hosting test (Arjun's ping 400s vs Unite's 250); report, Arjun decides | O | |
| 15 | Ads | Ad while the match is set up (CrazyGames SDK); never delays the start | S | CrazyGames' ad rules checked |
| 15b | V1b | Voice for phones on the relay: a TURN relay that works. Free route: Metered.ca free tier (20 GB a month, sign-up, no card), its key kept as a secret in the online service, which hands out short-lived credentials (code slot `TURN_KEY_URL` exists). Helps the game link too | S | Arjun's sign-up and go |
| 16 | V2 | All-talk voice | O | servers |
| 19 | P0.8 / P0.9 | Fair timing / host hand-over. Cut P0.9 if battles move to servers | O | P0.10 |
| 20 | CL1 | Repo cleanup | S | built on t/CL1 |
| 20b | CL1b | Remove built copy from repo | S | shipped 15 Nov |
| 21 | SPLIT | Split core/sim.js and main.js by job: built 16 Nov on `t/SPLIT`, waiting for Arjun's "ship" (next in the relaunch: map, castles, champions Titus/Devi/Sigrun, army and gold, match loop, battle screen) | O | Arjun's ship |
| - | P0.5 | Cloudflare TURN relay | S | **Parked** (needs a card) |
| - | Phases 1-9 | Roles & Combat behind `?roles=1` | mixed | the list above, Arjun's approval |

## Arjun's to-dos
1. Say "ship" for F10/F10b and, after review, V1.
2. Mixamo animation files (walk, run, sword attack, block, hit, death; FBX), upload to the chat.
3. Say "ship" for F7 after trying it on his phone.
4. The battle screen with the designer chat (fresh one from the design doc).
5. Sound effects: Claude picked them (shortlist page). Download the first pick under each sound into one folder; then the wiring ticket. Listen to F21's music on the phone.
6. A duo battle with a friend to test voice, once V1 is shipped.
7. Playtest with the friend in India after the lag tickets.

## Before CrazyGames (must, Arjun 15 Nov)
- Cheat-proof results before any ranks/rewards: every phone reports and the server compares, or server-hosted battles.
- Online service: origin allowlist (GitHub Pages + CrazyGames) instead of CORS `*`; per-connection message rate and size caps.
- Admin page behind Cloudflare Access instead of a key in the URL.
- Profanity filter on names/chat, plus mute and report for voice.
- GitHub secret scanning, Dependabot, branch protection on `main`.

## Open decisions
- Battles on servers (P0.10 report first). Cloudflare Durable Objects have a free tier; paid is $5 a month.
- The numbers pass (HP, damage, gold): designer, before Phase 9.
- Skins and the shop: after the game is done.
- Budget: 50 dollars, nothing spent.

## Known bugs
- High only: a black wedge down the left edge at the Crown start. Not reproduced on 13 Nov (F14): F1a's exact
  seed, 844x390, High, frames 60-420, with and without `?f1=ab`: edges clean. Likely gone with later map work; Arjun says if he sees it.
