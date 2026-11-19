# Rally: project state

Current work: **friends' playtest fixes (F tickets) and lag (Phase 0)**, then Roles & Combat (design and plan in
Claude Docs, links in CLAUDE.md). Every builder updates this file as the last step of its ticket. Owner: Opus owner chat.
Last updated: 2026-11-17 (C1 and FIX1-5 shipped: main = launch26 at 133eff0, Pages and the online service deployed). Before: 2026-11-17 (castle set CASTLE1-10 + ORD1 shipped: main = launch26 at aa8b0ad). Before: CASTLE1. Before: 2026-11-16 (MAP built on `launch26`). Before: 2026-11-16 (SPLIT built on `t/SPLIT`). Before: 2026-11-14 (F4 built on `t/F4`; F2 one lobby built on `roles`; M3 dropped by Arjun). Before: 2026-11-13 (F14 rebuilt to Arjun's picks on `roles`; F7 built on `roles`; F15, F12, F13, F16 shipped to main at 1018462; voice diagnostics on `roles`). Older detail: `docs/history/2026-11-log.md`.

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

## MAP The new mountain (16 Nov; card `docs/tickets/MAP.md`). Built on `launch26` (MAP0-MAP6), not shipped
- MAP0: `core/world.js` split into `core/world/` (8 files, max 262 lines), same 40 names; r_SPLIT identical.
- MAP1: new mountain layout behind `?map26=1` (`core/world/map26.js`, `CROWN26`): 4 countries of base, nexus and 3 castles; walks 9.5 s border, 27 s base to Crown (r_MAP1).
- MAP2: drawn (country walls, nexus banners, border rivers). Map itself level on draws; +25-30 draws, +35% triangles from 80 more neutral men (24 camps): Arjun to decide camp size.
- MAP3: a whole battle runs on it (AI crosses tiers by the new ramps and bridges); crown2sim/online pass with `&map26=1`; lag no worse (r_MAP3).
- MAP4: screens on the new mountain speak of castles only; minimap shows border rivers, King's Roads, nexus (r_MAP4).
- MAP5: 40 jungle bushes hide men from other sides (not drawn, not picked as a foe) until they strike or a foe steps in (r_MAP5).
- MAP6: the new mountain is the only mountain (flag and old layout removed); r_SPLIT re-baselined on it and settles 2.5 s first.
- CAMP1: camps 3 men (gold) and 5 men + mini captain (buff: drum or swift, 90 s) (card `docs/tickets/CAMP1.md`).
- MAP7: base, nexus and castle road on a peak over the clouds, joined only through the middle castle; no fence.
- MAP8: jungle opens at the King's Road and mid border field only; border rivers end short of the ridge.
- MAP9: proven: rivers crossed only on bridges, archers shoot across (r_MAP9).
- MAP10: 2 bushes a side on the inner ring (48 in all).
- MAP11: polish (paved King's Road, parapets, standing stones at openings, buff banners, crystal nexus, fewer labels).
- PREV1: test site https://rally-preview.arjun-rally.workers.dev (every push to launch26 deploys it; main untouched).
- MAP12: rim 15 m behind the castles' walls; middle castle's curtain walls to the cliff.
- MAP13: natural rivers (ring bends, winding border rivers from spring pools, reeds, stones).
- MAP14: bushes are League-style swaying tall grass.
- MAP15: no walls between the middle castle and the peak (base and nexus reached round it).
- GATE1: gate health bars; the middle castle's back gate now breaks (it had no health: hit forever).
- Watch: start view draw calls rose to Low 194 / High 204 (CAMP1: 179 / 192) with the wider map; trim later.
- AI1 done: a computer captain at the glacier/chest puts javelins away for his sword; if his blows do nothing for 6 s he turns guard for 20 s and hunts the nearest enemy captain (r_AI1; 0 stalls in 11 runs).
- SPD1 done: every captain (yours and the computer's) walks 6.2 m/s, x1.8 mounted (11.2); CAPTAIN_SPD in config; the Ride button shows the speed (r_SPD1). Walk times hold (9.7 s border, 29.8 s base to Crown).
- AI2 done: computer captains clear their own side's jungle by day (buff camps first). A side of 2+ captains keeps its last computer captain on it; a lone captain goes for his buff camps about a third of his plans, off a march only for one within 50 m, never off a siege (CROWN26.jungle). Offline, 200 s: 11 camps cleared, 2 buffs (was 1, 0); castles held at 150 s 5/12 (was ~10), by 300 s 10-12 either way.
- PERF1 (card `docs/tickets/PERF1.md`): `r_PERF1.mjs` measures old vs new mountain, CPU 4x, Low. Start level (~45 fps CPU);
  a 160-soldier crowd 13 -> ~8 fps CPU, 615 -> 800 draws. Cost: ~70 men within 14 m as full models. Recommended: full models
  for the nearest ~24 only, plus the 320-man cap keeping the nearest (348 to draw in a crowd today).
- PERF1c done (Arjun's pick): `render/crowd.js`, `QUALITY.full` 24/32/40; crowd 72 -> 61 ms CPU, 682 -> 590 draws, -24% triangles;
  the cap keeps the nearest (r_PERF1c). Arjun: phone checklist in the card.
- NET1 done: a man in a bush who just struck is seen on joined phones too (host sends bit 30 of the unit flags; r_NET1, online). Lag 250 ms: response 113 vs 107 ms, position error .07 vs .10 m (noise).
- HUD1 done: your side's camp buff shows under the phase (War drum +15% damage / Swift +15% speed, seconds left, in the banner's colour); a buff camp's mini captain stands captain-sized with his buff's name over his bar (r_HUD1).
- CASTLE1 done (card `docs/tickets/CASTLE1.md`, plan CASTLE1-10 there; design doc 'Changes for the owner' 16 Nov): levels 0-3, gates in
  layers of 3 plates (`CASTLE26`); damage never heals, Fortify adds a layer (never refills); each plate pays the breaking side; neutral and
  just-taken castles level 0 (gates open); 45 s banner shield after a capture. r_CASTLE1 15/15, r_CASTLE1-join 4/4, r_GATE1, crown2sim/online
  roles off+on, r_PERF1c pass; lag 250 ms: response 100 ms, error .12 m. Found (before CASTLE1): net/netgame.js 786 lines, config.js 571 (over 500). Next: CASTLE2 (level III pieces), CASTLE3 turrets, CASTLE4 circle; then Arjun plays.
- CASTLE2 done (card `docs/tickets/CASTLE2.md`): level III = ballista on the keep (`core/sim/castle3.js`, a bolt every 4 s, 28 m, through
  shields), watchtower (lights bushes within 45 m for its side, `bush.js`), spike ditch (enemies at 0.6 speed, -4/s). r_CASTLE2 9/9, r_CASTLE1,
  crown2sim/online roles off+on, r_PERF1c pass. Every castle at III: 171 -> 192 draws (older III pieces 14, new ~7).
  Test lesson: after editing render files, restart the vite server (`pkill -f "vite --port 8766"`) or tests that import /src modules get
  a second copy (PERF1c showed 0 drawn); servers.sh can hang, start vite directly if so.
- Shipped 16 Nov (Arjun's "push to main"): main = launch26 at cf16420 (the relaunch so far: SPLIT, MAP, CASTLE1-2).
- CASTLE3 done (card `docs/tickets/CASTLE3.md`): League turret rules in `core/sim/turret.js` for wall archers and ballista (aggro on
  a champion who hits yours, sticks, soldiers first, ramp 1 -> 2.2x, flat shots through shields, no neutral/bush targets); range ring
  on the overlay (`render/turretring.js`), red with a line when it's you; target id in the snapshot (holds field 11). Fixed: castle
  shots hit their own keep and walls (most tower arrows never landed). Lone champion dies in 7.6 s at level I. r_CASTLE3 10/10,
  r_CASTLE3-join, r_CASTLE1/2, crown2sim/online roles off+on, r_PERF1c pass. Next: CASTLE4 capture circle, then Arjun plays.
- NETX fix (16 Nov, Arjun's playtest with Ana on main: her army kept vanishing): the snapshot packed positions -100..+100 m only;
  the new mountain reaches ~210 m, so on joined phones men past -100 were pinned there. Now -300..+300 (same 3 characters).
  r_CASTLE3-join checks a man at (-150, -30); crown2online off+on, r_CASTLE1-join, lag (response 141 ms, error .2 m) pass.
- Shipped 16 Nov (Arjun): main = launch26 with CASTLE3 and NETX.
- CASTLE4 done (card `docs/tickets/CASTLE4.md`): capture circle round the courtyard banner (`core/sim/capture.js`, `CASTLE26.circle`):
  opens when guards are dead / castle open (level 0 or a gate broken) and no banner rising; 6/4/3 s with 1/2/3 champions,
  soldiers +10% each to +50%, soldiers alone take it in 10 s (Arjun 16 Nov), anyone else in it pauses, empty drains; drawn on the
  overlay (`render/captring.js`); camera +15% inside; computer captains go for the banner. r_CASTLE4 10/10, r_CASTLE1-3,
  crown2sim (castles change hands) and crown2online roles off+on, r_PERF1c pass. Next: Arjun plays (C1-C4), then CASTLE5.
- Arjun 16 Nov 21:02: soldiers alone take a castle (10 s); soldier orders to target gates, nexus, war chest; build all castle cards
  in Claude's order overnight (5, 7, 8, 6, orders, 9, 10), launch26 only. Test helpers: /home/claude/bin/t.sh, reg.sh (restart servers).
- CASTLE5 done (card `docs/tickets/CASTLE5.md`): capture moment on every phone (`render/castlefx.js`: torn banner, gate dust, horn and
  sting, a taker's call, camera beat near), +80 gold each other army on the side; sieges and Held! (`core/sim/siege.js`, +60 each
  defending army); under-attack banner and edge arrow, once in 20 s. r_CASTLE5 9/9 + regression pass.
- CASTLE7 done (card `docs/tickets/CASTLE7.md`, `core/sim/respawn.js`): on the mountain the respawn wait follows the clock (6 s at 0:00
  to 20 s at 10:00, `CASTLE26.respawn`); back at the side's castle nearest where he fell unless it's under attack (enemy in turret range,
  alert in 8 s, circle filling), else base; marches out of its lane gate. Pick-by-hand not built. r_CASTLE7 6/6 + regression pass.
  Test lesson: t.sh now restarts vite when game/src changed (stale modules made CASTLE4/5 and PERF1c fail falsely).
- CASTLE8 done (card `docs/tickets/CASTLE8.md`, `core/sim/nexus.js`): nexus breakable (3000) once its side's middle castle isn't
  theirs, never by its own side or while its side holds the Crown; +5 to the breaker (points, results, snapshot field 9), owners'
  morale -30 and capped 50 for 60 s; crystal gone, bar when hit. Crown = 8 points, no longer ends the battle (bot battles end at
  10:00 on points), its side's morale floor 50; bots leave the glacier once taken. r_CASTLE8 8/8 + regression pass.
- CASTLE6 done (card `docs/tickets/CASTLE6.md`, `core/sim/holding.js`, `CASTLE26.hold`): castle points middle 5 / outer 3; +8 health
  per 3 s in the yard (none with an enemy in it); Crown shard to the first side to take a castle (+25 to each army's horn; a diamond
  after the name while unclaimed); a nexus broken moves 2 shards. Snapshot: mountain field 10, holds field 12. r_CASTLE6 6/6.
- ORD1 done (Arjun 16 Nov, card `docs/tickets/ORD1.md`): the attack order dragged onto an enemy gate, a nexus (not yours), the war
  chest or the glacier sends the foot soldiers to strike it (focus id 0, kept while it stands: forts.js structureStands). r_ORD1 4/4.
- CASTLE9 done (card `docs/tickets/CASTLE9.md`, `core/sim/ai26.js`, `CASTLE26.ai`): bots fortify the castle they stand in first, make
  the trip to fortify a low castle within 45 m, defend on an alert, go for an open enemy nexus with 3+ soldiers, keep off fortified
  castles without soldiers. Bot battle 300 s: 16 fortifies, 7 castles taken. r_CASTLE9 8/8 + regression pass.
- CASTLE10 done (card `docs/tickets/CASTLE10.md`, measured with `store/r_CASTLE10.mjs`): footmen on Follow join their champion at a
  gate or nexus he hits; the turret sticks only to soldiers (a champion only with no soldier in range); joined phones now run the
  castle moments (msgIn). Gates: plates 450/300, level 1 = 3 plates, +2 each level; archers 2/3/4 every 1.8 s; ditch 2/s. Lone laner
  takes a level 1 castle in ~31-39 s; level 2 often a 2nd push; level 3 needs a team (12 men: 2nd push). r_CASTLE10, r_CASTLE10-join,
  every castle test and the regression set pass. The castle set (CASTLE1-10, ORD1) is built on launch26, not on main.

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

## C1 Champion framework (17 Nov; card `docs/tickets/C1.md`). Shipped 17 Nov (main at 133eff0)
- C1a: a champion is one page in `src/champions/` (`legionary` = today's captain, the default); `?champ=`, a Champion setting,
  `?botchamp=` (tests), `window.__champs` test champions (dev); ids on every phone (presence `ch`); weapons limited to his own.
- C1d: health and hits as shares of an infantryman (`config/champs.js` UNITS: champion 380, horse 190, infantry hit 19, arrow 9.5,
  behind 1.5x), players and bots the same blow; counter 120% (spears on horses, arrows on infantry, cavalry on archers); a mounted
  champion's horse takes every blow. Gates fall as before (wallDmg/capWall rescaled); turret/ballista on champions rescaled.
- C1b: levels 1-10 (LEVELS, XPGAIN), +5% health and blow a level, badge over every champion, your XP bar, level-up moment.
  Bot Trio battles end at average level 7.5 (design 8-9; trickle raised to 2/s): retune with real players (G1).
- C1e: recruits per champion, influence on army (replaces the aura on the mountain), army size by class (every castle in full).
- C1c: slots sp1/sp2/ult/armyUlt (`core/sim/abilities.js`, blocks in `champions/blocks.js`), locked to 3/5/7, cooldowns on the
  wire, temporary buttons J/K/L over Attack, army ult from a full rally horn, bots fire them, locked in duels.
- C1f: pace on foot, horse pace and health from the page. Base to the Crown: ~30 s on foot, ~16 s riding.
- Tests: r_C1a (join: champions, weapons, levels, a press), r_C1b, r_C1c, r_C1d, r_C1e, r_C1f; crown2sim/online, r_PERF1c pass;
  lag 250 ms: response 138 ms, error .21 m (was 141 / .2). r_SPLIT's seeded battle changes by design from C1d on.
- Next: C3 Titus (card waiting for Arjun's go); then C2 units before Devi (C4) and Sigrun (C5).
- C1g base numbers (17 Nov, Arjun "start work on C1g"): infantry 100 (footman hit 20); pages in shown numbers (`hp, dmg, rate,
  reach, spd`, horse `hp, spd` m/s); a bot's blow 1/rate, a player's combo, beat and spear timings stretched to 3/rate
  (`paceOf`, also on the joined phone); reach from the page; `CHAMP_BASE`/`CHAMP_LIMITS` + `champions/limits.js`. Legionary =
  base (400/30/1.4). r_C1g, r_C1a-f (updated to shown numbers), crown2sim/online pass; lag 250 ms: 140 ms, .2 m. r_PERF1c fails
  the same way without C1g in this container (no full models drawn). Next: C1h army shift.
- C3a Titus built on C1g (Arjun's go; card `docs/tickets/C3.md`): `champions/titus.js` (480, 30 at 1.2/s, reach 1.4, 5.9 / 11.2
  m/s, horse 200); combo slash, slash, shield bash (stagger capped 1 s); spearmen from the start. Arjun 17 Nov 14:36: neutral
  soldiers are the baseline and a champion's soldiers take every stat by his own share off the base champion (`champions/army.js`
  `shares`/`unitRow`: Titus's men +20% health, -14% hit rate, -5% pace, +8% reach): this replaces the planned C1h army shift.
  Fixed on the way: C1g's upgrade path no longer set the captain's tier (`applyFootTier`). r_C3a, r_C3a-join, r_C1a (lists Titus).
- C3 art in (17 Nov): Titus's own body (`titus_anim.glb`, Hunyuan mesh rigged on the shared skeleton, clips' hips scaled per body),
  gladius, war horse (`warhorse.js`, re-pivoted legs), new spearman and archer bodies for everyone's soldiers (near ~6k tris,
  far 800-tri figures). Scripts in `tools/models/titus/` (build_body.py <captain> <mesh> <out.blend> [soldier|archer]).
  Open: soldier tier looks on the new bodies (upgrades don't show yet); neutral soldiers now grey new bodies (Arjun to confirm).
- C3d Eagle's fall built (17 Nov, Arjun's go): `core/sim/eagle.js` (leap onto the spot marked at the jump, 0.2 s crouch,
  0.8 s arc 3 m high, slam at 1 s; 100 to champions +5%/level from 7, 40 to soldiers down 1 s, allies 20% less for 4 s,
  half damage in the air, nothing stops it; 60 s), `render/eaglefx.js` (gold circle, eagle shadow, dust ring), numbers on
  Titus's page. Clip: today's leapSmash (sword-first) until a shield-first one. A joined phone flies its own arc.
  Fixed on the way: a joined phone's jump height and held attack never reached the host (lost behind a comment, netgame).
  r_C3d, r_C3d-join.
- C3b Ram of Cassius built (18 Nov): `core/sim/ram.js` (tap rushes the way he faces: 0.15 s wind-up, 5 m in 0.35 s, 8 m from
  the saddle still mounted; soldiers 20, shoved aside, stumble 0.3 s; first champion 35, back 2 m, stun 0.5 s, into a
  wall/gate/rock 70 and 1 s; walls stop it; a braced spear line stops it and takes it, the horse takes their blows x1.2;
  +5%/level from 3; 6 s), path drawn in `render/ramfx.js`, clip shieldBash. hit() records `b.hurt` (last blow, for tests).
  r_C3b, r_C3b-join.
- C3c Shield of Cassius built (18 Nov): `core/sim/scutum.js` (up to 4 s, tap again drops; 120 deg front blocks blows,
  arrows, specials, castle shots for him and his side 6 m behind (4 m mounted); no attacking, 70% pace, faces front
  backing off; an ult breaks it, lands at 30%; recharge 10 s from the drop), his men on Follow shelter in the zone
  (soldier.js shelter), `render/scutumfx.js` draws the zone. Ults mark their blows `ult`. Button shows 14 s while up.
  r_C3c, r_C3c-join.
- C3e Testudo march built (18 Nov): `core/sim/testudo.js`, from the full horn (the existing horn button and its meter):
  his men within 15 m lock in 0.6 s (heal 25%), march 10 m in 4 s the way he faces (walls halt it), shout shoves the
  front 1 m; front blows turned, ults 30%, arrows nothing, no knock-about, a charge into the front stalls; drum beat
  and path in `render/testudofx.js`. Bots sound army ults from a full horn now (aiAbilities). Fixed: an unblockable
  blow went through a computer captain's guard at a quarter (melee). Drag aiming waits for S1-15.
  r_C3e, r_C3e-join.
- C3f Titus the default (18 Nov): CHAMP def and bot = titus; the legionary by ?champ=legionary (r_C1d now asks for him),
  a saved choice kept. r_C3f. C3 done on launch26; waiting for Arjun to play it and say ship.
  Known: r_C1e's army-size check fails before and after C3 (sizes changed since C1e); r_C1c's bot check is flaky.
- SIZE1 bigger bodies (18 Nov, Arjun's go): BODY_SIZE champ 1.4, soldier 1.3 (config/champs.js; horses with the champion),
  drawing only plus the testudo and shelter spacing; `?bodyc=&bodys=` tries a pair on the preview, kept on the phone
  (`core/body.js`). Arjun to lock in the pair. Next: the battle screen ticket (design doc "Battle screen", mockup
  https://claude.ai/artifact/6fdoSRg8mwApXsC6SQiRaS).
- C3g abilities' feel (18 Nov, Arjun played: the ram and the field didn't land): 3D effects in place of flat overlay
  drawings (`render/fxkit.js` decals and barrier): ram path, dust and streak, BASH!/WALL SLAM! with shockwave, shake,
  hit-stop; a golden barrier and lit zone for the shield, flashing on blocks, shattering on an ult; the eagle's glowing
  circle closing in, shadow, double shockwave; testudo path, lock glint, drum pulses. Rest of Titus in this chat:
  tier looks, shield-first leap clip, his lines as bubbles, the battle screen, lock body sizes, ship.
- C3h soldier tier looks built (18 Nov): `render/rig/tierlook.js` recolours the steel by tier (Princeps darker + red crest,
  Triarius bronze + short cloak; archers leather cap, then bronze helmet). Bigger quiver not done.
- C3i Eagle's fall lands shield first (18 Nov): clip `eagleFall` made at load from leapSmash with the shield arm turned to
- C3j Titus's lines (18 Nov): his 10 lines and his army's from the design doc live on his page (`lines.self`, `lines.army`); `banter.js` picks his men's lines by moment (charge, hold, testudo, castle taken, upgrade, kill, his fall and return, chest) and his own on a comeback, a champion kill and Eagle's fall. Text bubbles until recorded. Test `r_C3j.mjs`.
- C3k What the Ram meets (18 Nov): raised shield from the front = CLANG, he bounces 1 m staggered, holder slides unhurt; ram vs ram head-on = CLASH, both stop, half each, dazed (horse beats feet); braced line or testudo = he bounces (spears bite 15); airborne = miss; each soldier slows 15%, the 3rd stops him; gates take 4 of his blows (walls/rocks none); riders knocked off with the horse unhurt (`dismount(u,'off')`) unless he rides or they're a Raider (pushed); a champion knocked into another: half, 0.25 s. Feel: skid dust, red screen edge + buzz when you're rammed, knockdown→getUp on a wall slam. Numbers on Titus's sp1. Test `r_C3k.mjs`; r_C3b updated.
- C3l Drag to aim the specials (18 Nov): `ui/abilaim.js`. Press a special/ult and drag (screen up = camera forward): Ram shows a glass slab to where it would stop (walls, a champion, the soldiers that stop it), Eagle's fall a landing ring as far as you drag, Shield a ring the way it faces; let go fires there, back onto the button (turns red) cancels, a tap fires as before. Fires on release now, not on press. `actions.abilityReady` checks on press. Test `r_C3l.mjs`, shot `shot_C3l.mjs`.
- PULL1 The pull down (18 Nov, card `tickets/PULL1.md`): any champion on foot pulls a galloping enemy rider off with Attack timed to a closing ring (Raiders only on the beat); horse unhurt. `PULL` in config.js. The design doc still needs C3k, C3l and PULL1 written in (designer chat).
- C4 Devi art in (18 Nov, Arjun: "complete everything you need for this character"; cards RANGE1, C2, C4 written, waiting for his answers and go). Models, not yet wired into the game: `devi_anim.glb` (her body on the shared skeleton, sash = team cloth, braid and quiver on the back; 10k tris) and `devi_lod.glb`; her archer `archer_chola_anim.glb` / `_lod`; her horse `horse_devi.glb` (warhorse.js frame); `onager.glb` (base + `onager_arm` node pivoting on the axle, for C2); `bow_devi.glb`, `arrow_devi.glb`. 22 bow and dagger clips added to captain_anim and soldier_anim (bowIdle, bowDraw, bowRecoil, bowOverdraw, bowWalkF/B/L/R, bowRun, dodgeF/B/L/R, bowEquip, bowDisarm, bowBlock, bowHit, bowDeath, stab1-3, doubleStab; +0.56 MB each). Scripts `tools/models/devi/`. Raw Mixamo packs live on Arjun's Mac, `~/Rally/assets/mixamo` (README there), never in this public repo.
- RANGE1 ranged basic attack built (18 Nov, Arjun's go; card `tickets/RANGE1.md`): `core/sim/ranged.js`. A page with `ranged: { third }` shoots: nearest enemy in range (Settings → Targeting: Nearest / Champions first, `rally-aim`, sent to the host as `ac`), sticky on a champion she hit; homing arrows (40 m/s, target id on the wire), flat damage, no counter rule, plain shields ignored, raised shields block; third shot two arrows; Attack held keeps shooting, 65% pace while shooting (`firingT`; the joined phone runs its own); gates, palisades, towers, chest, nexus, glacier in range; mounted at a walk, one ride-by shot riding fast; bots keep 9 m from a melee champion and close to 80% of range; in a duel she still fights close (C4g). `RANGED` in config/champs.js; Strikers' army 4 +3 a castle. Tests r_RANGE1, r_RANGE1-join; crown2sim and crown2online roles off and on, r_C3a/b/c, r_C1a, r_C1g, r_PERF1c pass. Next: C2 stone thrower, then C4a Devi's page.
- C2 stone thrower built (18 Nov, Arjun's go; card `tickets/C2.md`): kind `thrower` (KINDS, STATS, THROWER_TIERS, upgrades thr1 Fire pots / thr2 Reinforced, `STONE` in config/champs.js). Army counts places (`armyPlaces`, `PLACES.thrower` 5): recruit, HUD (used/cap, T count), bots (one, +1 per 12 places), the joined phone's banner. `core/sim/thrower.js`: marks (crowd of 3+, else nearest gate, else anyone, else chest/nexus; nothing within 10 m), 2 s stone to where the mark stood, area damage 45 to a third at 3.5 m, gates x4 (180), chest 6 blows, testudo half, fire pots (every third stone, 5 s, 8/s, braces broken); Follow 9 m behind, Hold behind the spot, Charge closes. `render/throwers.js`: onager.glb, arm swing, team ring, stones with landing rings, flames. Stones and fires on the wire (snapshot section 15). Not yet: crew figures, fire and creak sounds (placeholders), a look at it in a real browser (headless renders black). Tests r_C2, r_C2-join; crown2sim and crown2online roles off and on, r_RANGE1, r_C3a, r_C1a, r_C1g, r_PERF1c pass. Next: C4a Devi's page.
- BS1 The battle screen (18 Nov, card `tickets/BS1.md`): new right thumb (no Block/Evade; duel swaps Ram→Block, Shield→Evade), bottom row with the army ult button (horn bar, tap/drag), Fortify in your castle, compact Upgrade popup, minimap top-left with faces, clock opens points, Settings target. Open: pings, quick-chat wheel. Body sizes: Arjun happy with launch26's (18 Nov), nothing more to do.
- Titus (C3) CLOSED 18 Nov, live on main. Leftovers done 18 Nov: LORE1 champions' page (home → Champions: lore, class, Melee/Ranged, stat bars, stars, Play as; the lobby has no champion pictures yet), design doc section "Titus in play" written (C3k, C3l, PULL1), BS2 pings (tap minimap = Attack here; wheel pings) and quick-chat wheel, Q1 archers' bigger quiver.
- FIX6 (18 Nov): the old failing checks. r_C1e passes again (fixed along the way). r_C1c's bot check was the test: the bot stood in your home and the safe zone kept him down, so he could never fire; the test now keeps him on his feet. No game change.
- Test note: tests import game modules by bare path; after editing files, restart the servers (`pkill -f vite; bash store/servers.sh`) or the page loads `?t=` copies and the tests poke a different instance.
  the blockIdle pose from 0.3 s (cliprig.js shieldFirst). Cloak flare not done (his cloak has no bones of its own).
- Arjun 17 Nov (for S1-12, designer to fold into the design doc): the lobby is 60 s and picks the champion with the lane: filter
  by class, then a picture grid like League or Unite. Today's design says 25 s and no grid.
- Fixes 17 Nov (Arjun's list), on launch26: FIX1 lobby (not reproduced as reported; made robust: the service resends the
  lobby every 2 s, keeps a seat through a dropped link and picks the phone up again, `online/src/index.js`; reaches the live
  service only when main is shipped, online.yml), FIX2 quieter (master .5, Sound setting Low/Medium/High), FIX3 nexus life bar
  always shown, FIX4 ballista bolt drawn big with a streak, twang, landing slam and jolt (`render/bolts.js`). r_FIX1 (MODE=
  search, party, reconnect), r_FIX2-4, crown2sim/online, r_PERF1c pass. FIX5: the lobby clock drops to 10 s only
  once every seat has a player and all are Done (else it runs its 60 s); r_FIX5. Live only when main is shipped.

## MENU main menu and Champions screen (18 Nov, Arjun's go; card `docs/tickets/MENU.md`). Shipped to main 18 Nov (68f151c)
- MENU1 pictures: `ui/portraits.js` (tile, face, splash; silhouette when missing), `store/bake_portraits.mjs` renders one from the 3D model; Titus and Devi from Arjun's art. Minimap faces, lobby seats, versus with your splash. Online carries each main (`ch`, `m_ch`, account main/backup; live only once main ships). r_MENU1.
- MENU2 Champions screen (`app/champpage.js`, `ui/champs.css`; replaces LORE1): class tabs, roster grid (`ROSTER` in config/champs.js), the champion in 3D through a window (home view 'champs': the camera slides until he stands in it; drag turns him), art for one still to come, stats, soldiers ▲▼, lore, skin row (Default + Soon), Set as main/backup. r_MENU2.
- MENU3 home: Captain button gone (closet code kept for skins), top bar Silver 0, your main on the stage with his name (a tap opens his card: `#homeChamp` follows him), friends in their mains, Solo/Duo/Trio follow the party, "2 × Titus" note (`homeInfo` in app/home.js). r_MENU3.
- MENU4 Settings > Champion: Main and Backup pickers (owned only, None + note while one is owned), replaces C1a's segChamp (old r_C1a/r_C3*-join check segChamp: stale lines). r_MENU4.

- FALL1 (18 Nov): "Titus keeps falling": the Ram's wall slam and the pull down played the whole 4.8 s knockdown clip (+2.5 s get-up) while he could move after 0.7-1 s. Now the fall (first 22%, fast), held for the act's `down` s, a quick get-up; moving/swinging/blocking cancels (`ANIM.acts` rate/cut, heroes.js clipHero). Acts' `then` now chains for any act. r_FALL1.

- CORPSE1: the fallen stay in the new bodies: one who fell out of sight (light far figure) is drawn full when near (nearest `QUALITY.corpses`, render/crowd.js), already lying (death clip at its end), and through the sinking (the old figure no longer takes deadT > 14). The light far figure itself is still the old look: its own ticket. r_CORPSE1.
- SIZE2: `BODY_SIZE` champ 1.3, soldier 1.45 (Arjun's option A; was 1.4/1.3). r_SIZE1 defaults updated; its "drawn" sizes read 0 (heroScale) already before 18 Nov: stale check, to look at.

- MENU5 Champions screen v2: his 2D art in the centre (splash, else portrait, else silhouette; the 3D window is gone), Stats / Army / Lore tabs; Army from the champion's `army` (titus.js: tier names) else the generic UPGRADES. r_MENU5 (r_MENU2 updated). home.js's 'champs' camera slide is now unused.

- RAM2 Ram of Cassius feel (Arjun's GIF, option c): the charge plays blockIdle (scutum out) over running legs, leaning 0.2 rad (`ANIM.acts.ram`); a gold starburst + chips where the shield meets the champion (fxkit `starburst`); open ground: stagger (impact clip, 2 m skid), into a wall: knockdown for the wall stun (FALL1); aim slab 1.5x wider, gold rim, chevrons, end bar, fades in (ui/abilaim.js). r_RAM2.

## Known bugs
- (fixed in AI1) A computer captain sometimes stood at the glacier at night without striking.
- High only: a black wedge down the left edge at the Crown start. Not reproduced on 13 Nov (F14): F1a's exact
  seed, 844x390, High, frames 60-420, with and without `?f1=ab`: edges clean. Likely gone with later map work; Arjun says if he sees it.
- C4 Devi built (18 Nov, Arjun: "Complete all and then ship to main"): page `champions/devi.js`, specials `core/sim/deviShots.js`
  (Piercing shot, Evade, Tiger's volley, Arrow storm), her archer line (fire arrows x3 on throwers, Vil Veeran 26 m), render
  `render/rig/champgear.js` (bow, arrows, her horse, duel daggers, clip names), storm mark on the wire, archers call it.
  Settings "Arrows aim at" (was a duplicate segTarget id). Check by eye: bow/arrow fit in her hands, horse_devi seat.
  Open: thrower crew figures and creak/fire sounds (C2 leftovers); r_C1a's #segChamp check is stale since MENU4.
  Tests: a long-running Vite can stamp a module `?t=` and split it in two (r_RANGE1 failed): restart servers.sh first.
- ARCH2 (19 Nov, Arjun's go after playing Devi; on main 19 Nov): archers of every army shoot buildings (ordered at one,
  or with no man in bow range) at 30% (`ARCH_BLD`), full with fire arrows; ordered at a man they go for him. Stone
  throwers 24 m / Reinforced 30. Upgrade panel: own soldiers' columns only, next tier each, an "i" with numbers now/after
  (`ui/upinfo.js`). Bow champions carry no shield; bow in the left fist, arrow in the right (grips from the clips' full
  draw); all clip archers use the bow clips. Arrows: streaks (pale/gold/fire), hit sparks and dust (`render/arrowfx.js`).
  Devi's specials: line aim, Pierce beam + pinned rings, Evade afterimage, Volley ring + fan, storm archers lean to the
  sky (`render/devifx.js`). Tests r_ARCH2, r_ARCH2-ui; `store/look.mjs` takes real close-ups (software GL).
  Open: storm archers do not kneel (lean back only); r_RANGE1-join's 60-damage bar is borderline (56-67) since the
  joined phone now decodes her arrows' target correctly.
- ARCH3 (19 Nov, on main): arrows in an arrow's proportions (0.9 m, thin shaft, small head, three feathers), a little
  larger with camera distance; a soft trail from the feathers that fades out; fire arrows carry a flickering flame
  (`render/arrowfx.js`). Open: the flame is small (0.26 m cone).
- DUEL4 (19 Nov, Arjun: Devi didn't go back to her bow after a duel): the rig kept the clip it was playing when the
  duel flipped (same move key), so standing still or strafing on she stayed in the dagger stance. `duelLook` now
  clears both layers' keys. r_DUEL4 (draw, time, win: daggers in, then shots, bow in hand, bowIdle).
- SPLIT2 (19 Nov): render/heroes.js (493) split by job, behaviour unchanged: `heroload.js` (models loaded, `make` a
  figure, looks, far figures' geometry), `herohorse.js` (gaits, riderless horses), `herofar.js` (distant batches),
  `heroes.js` (posing, clips, the fallen; re-exports drawFar/drawFreeHorses). 277/139/67/48 lines.
- TEST5 (19 Nov): r_C1a reads Settings > Main (MENU4) and the champion list, not the gone #segChamp; r_RANGE1-join
  passes at 6 shots/40+ damage (was 60, borderline 56-67); r_C4's Arrow storm runs on a fixed scatter (0 of 5 hurt
  happened by chance: 32 arrows over a 5 m ring). Note for design: the storm reliably hurts only 2-4 of 5 men there.
- ARCH4 (19 Nov): storm archers kneel: standing under her Arrow storm, legs play `crouchIdle` (ANIM.skyLegs; no
  one-knee clip in the packs), the draw on the upper body; walking they keep walking. The sky lean was bending them
  forward (+X is forward on this rig): now `ANIM.skyLean` [-.45, -.3] leans them back. r_ARCH4; look.mjs close-ups.
