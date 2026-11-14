# Rally: project state

Current work: **friends' playtest fixes (F tickets) and lag (Phase 0)**, then Roles & Combat (design and plan in
Claude Docs, links in CLAUDE.md). Every builder updates this file as the last step of its ticket. Owner: Opus owner chat.
Last updated: 2026-11-13 (F7 built on `roles`; F15, F12, F13, F16 shipped to main at 1018462; voice diagnostics on `roles`). Older detail: `docs/history/2026-11-log.md`.

## Live on main
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

- F6+F5 Hit feel and the death sequence (card: `docs/tickets/F6.md`, with the decisions made and the sounds needed).
  Blades meet (two captains swinging at each other: neither blow lands, both pushed back), a blow on a shield, a
  captain cutting a soldier down: each with flash, sound, hit-stop, camera kick, vibration, same on joined phones.
  Death: camera stays on your body, grey screen, card with who and what with, countdown, fade to black, back at home.
  New Vibration setting. `r_F6.mjs` 49/49 on host and joined phone; Low draw calls 1218 -> 1191, triangles -1%;
  crown2sim and crown2online pass roles off and on; lag no worse (jumps 167 -> 55, error 1.15 -> 0.90 m).
  Only seen headless: Arjun judges the feel, the vibration and the four placeholder sounds on his phone.
  Found, not fixed: the host's own hit-stop slows the rules for everyone for 30-100 ms (was so before F6).

- F8 Real animation for the captain (Mixamo clips on one shared skeleton, blended; upper body attacks while the legs
  run). Card: `docs/tickets/F8.md`. r_F8 passes; crown2 tests pass roles off and on; Low draw calls level (1214 vs 1216).
  No spin clip: the combo's spin plays slash3. Heavy blow, bash, war cry, spear stay on the code pose. Soldier clips
  prepared, used by F1. Same commit: helmets cut to three Roman ones (Arjun, 12 Nov). Arjun judges the feel.

- Closet fixes (12 Nov, Arjun's list: C2, C3, C1, C4, C5), one commit each:
  - C2 "Leather & fur" is now "Burnished iron": it was matte leather, so its look became dark brown worked iron
    (captain and far soldiers; fur mantle gone). Same list place. `r_C2.mjs` checks the name and shoots each armour.
  - C3 Weapon tab hidden from the closet (looks only; the slot and saved choices are kept). `r_C3.mjs`.
  - C1 Three Roman helmets free (season locks off); their metal takes the armour finish's colour. `r_C1.mjs`.
  - C4 Capes: the new captain body had none (F8). Now a team-coloured cape on the chest, lifting as he runs: Long, Short,
    No cape (the default). Mantle and ermine hidden. `r_C4.mjs`.
  - C5 Checked: faces do nothing on the F8 body (the Face tab saves a choice nothing draws). Report in `docs/tickets/C5.md`;
    faces become a package later. Arjun decides whether to hide the Face tab meanwhile.
- F7e/f/g/h (12 Nov): superseded by F7 below (cards kept, tests folded into `r_F7.mjs`).

- F7-water (lake, flood-out, summit gate) shipped to main 12 Nov (main = roles at 3df5b61).
- F1a + F1b (draw calls ~1,220 -> ~151 at the Crown start, same look) shipped to main 12 Nov (main = roles at 8695d5e).

## Shipped detail (F1)
- F1a the map in batches, card `docs/tickets/F1a.md`: on the mountain the still scenery is folded into ~20 batches
  (one per look per 120 m cell, colours moved into vertices) and the live pieces batched by their builders (castle
  fort tiers, holds' cloths and rings, garrison banners, camp fires, torches, the glacier's crown). Crown start, same
  frame: Low 1,220 -> 269 draw calls, High 1,226 -> 270; triangles +1%; map pieces 1,283 -> 83 (119 with every castle
  at level III); frames identical (0% pixels differ) at start, mid-battle, night and with castles/camps/holds changed.
  `?f1=0` = the old map for one release. `r_F1a.mjs`, r_F7-water, crown2sim and crown2online (roles off and on) pass.
  Other maps unbatched (same code would apply; not tested). Arjun checks phone fps.
- F1b the men near the camera, card `docs/tickets/F1b.md`: each man's plain gear folded into one or two skinned
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
- F13 A day in one battle (card `docs/tickets/F13.md`). `DAY` table in config.js; sun height/direction, tint, brightness, mist, far
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

## F17 More captain clips (13 Nov, Arjun's animation chat; card `docs/tickets/F17.md`)
- 11 free Cosindra MotionSmith clips put on the shared skeleton (`tools/models/cosindra_export.py` in Blender, then
  `tools/models/extra.py`, run after prep.mjs). Sword: spin finisher, leap, held heavy blow, shield bash. Spear: held
  forward (idle), thrust, sweep; it now lies along the forearm on the clip rig. Javelins: the throw. unit.act
  'knockdown'/'getUp' ready for the roles' knockdowns. Soldiers' file has them too (soldiers still code-posed).
- `r_F17.mjs` 16/16; r_F8 passes (now expects 41 clips and the spin); crown2sim and crown2online pass roles off and on.
  Each anim file +~350 KB. Arjun judges the feel. On `roles` only: Arjun held main (13 Nov) until V1c is reviewed.
- Next: horse (Quaternius CC0, Arjun downloads; the app's browser can't) and rider (sitting pose made, lance to make).

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

## Build queue (in order; model = best fit; Fable 5.2 available until 15 Nov)
| # | Ticket | What | Model | Waits on |
|---|---|---|---|---|
| 1 | F7 | No abrupt cuts: built 13 Nov, waiting for Arjun's "ship" | S | Arjun's ship |
| 5 | F14 | Adapts to any phone: picks its quality from the first seconds of frame rate and keeps adjusting; targets iPhone 13+, Galaxy S23+, and plays on any Android | S | F1 shipped |
| 6 | F4 | Neutral garrisons and camps fight as real soldiers and ambush (today one shared health pool, standing still) | O | card |
| 7 | F9 | Horse charges: full stop only on Hold and facing; standing men slow it; moving or flanked men are bowled over | O | card |
| 9 | F2 | One lobby for all 8 or 12 players: lanes (left, right, jungle), ready-up, 10 s versus screen | O | card |
| 11 | P0.11 | Matchmake by region first (India with India, US with US) | S | |
| 12 | P0.7b | Finer positions in snapshots; version check so old and new phones don't mix | S | |
| 13 | P0.4 | Best host | S | |
| 14 | P0.10 | Server-hosting test (Arjun's ping 400s vs Unite's 250); report, Arjun decides | O | |
| 15 | Ads | Ad while the match is set up (CrazyGames SDK); never delays the start | S | CrazyGames' ad rules checked |
| 15b | V1b | Voice for phones on the relay: a TURN relay that works. Free route: Metered.ca free tier (20 GB a month, sign-up, no card), its key kept as a secret in the online service, which hands out short-lived credentials (code slot `TURN_KEY_URL` exists). Helps the game link too | S | Arjun's sign-up and go |
| 16 | V2 | All-talk voice | O | servers |
| 17 | M3 | Ramparts for archers | O | |
| 19 | P0.8 / P0.9 | Fair timing / host hand-over. Cut P0.9 if battles move to servers | O | P0.10 |
| - | P0.5 | Cloudflare TURN relay | S | **Parked** (needs a card) |
| - | Phases 1-9 | Roles & Combat behind `?roles=1` | mixed | the list above, Arjun's approval |

## Arjun's to-dos
1. Say "ship" for F10/F10b and, after review, V1.
2. Mixamo animation files (walk, run, sword attack, block, hit, death; FBX), upload to the chat.
3. Say "ship" for F7 after trying it on his phone.
4. The battle screen with the designer chat (fresh one from the design doc).
5. Sound effects: pick from the owner's recommendations (Kenney, Sonniss GDC bundle, Freesound CC0).
6. A duo battle with a friend to test voice, once V1 is shipped.
7. Playtest with the friend in India after the lag tickets.

## Open decisions
- Battles on servers (P0.10 report first). Cloudflare Durable Objects have a free tier; paid is $5 a month.
- The numbers pass (HP, damage, gold): designer, before Phase 9.
- Skins and the shop: after the game is done.
- Budget: 50 dollars, nothing spent.

## Known bugs
- High only: a black wedge down the left edge at the Crown start (seen in F1a's test shots, before and after F1a).
