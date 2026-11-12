# Rally: project state

Current work: **friends' playtest fixes (F tickets) and lag (Phase 0)**, then Roles & Combat (design and plan in
Claude Docs, links in CLAUDE.md). Every builder updates this file as the last step of its ticket. Owner: Opus owner chat.
Last updated: 2026-11-11 (evening). Older detail: `docs/history/2026-11-log.md`.

## Live on main
- P0.1 Dead-code cleanup · P0.2 Lag harness · P0.3 Ping readout · M1 Neutral soldiers look like soldiers
- P0.7 Smooth everyone else (joining phones draw others between two host snapshots; 20 snapshots a second)
- F11 Same results and names on every phone (host's battle record sent to all phones at the end)

## On `roles`, waiting for Arjun's "ship"
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
- F7 no abrupt cuts, Arjun's agreed rhythm (12 Nov): F7e duel ring shoves people to the edge over 0.3 s (was one frame).
  `r_F7e.mjs`. F7g over the chasm's edge: 0.6 s fall from the rim with a scream, untouchable, then dead (was the same
  frame). `r_F7g.mjs`; `c2bits.mjs` now waits out the fall. crown2sim and crown2online pass roles off and on.

## Build queue (in order; model = best fit; Fable 5.2 available until 15 Nov)
| # | Ticket | What | Model | Waits on |
|---|---|---|---|---|
| 1 | F7 | No abrupt cuts. Moments listed below; Arjun picks walk or fade | S | Arjun's picks |
| 3 | F1 | Batched soldiers (P8.1 forward): about 1,200 draw calls down to 150 | **Fable**, else O | card |
| 4b | F15 | Always landscape and full screen: on Android, full screen and locked sideways from the first tap, whatever way the player entered; in portrait mid-battle, a 'turn your phone' screen. iPhone can't be locked by a website: same screen, plus Add to Home Screen. Android: an Install button (the manifest is already there) | S | Arjun's go |
| 5 | F14 | Adapts to any phone: picks its quality from the first seconds of frame rate and keeps adjusting; targets iPhone 13+, Galaxy S23+, and plays on any Android | S | after F1 |
| 6 | F4 | Neutral garrisons and camps fight as real soldiers and ambush (today one shared health pool, standing still) | O | card |
| 7 | F9 | Horse charges: full stop only on Hold and facing; standing men slow it; moving or flanked men are bowled over | O | card |
| 8 | F13 | A day in one battle (sunrise to night; Crown always 10:00) | S | F10b shipped (card ready) |
| 9 | F2 | One lobby for all 8 or 12 players: lanes (left, right, jungle), ready-up, 10 s versus screen | O | card |
| 10 | F12 | Live captain-point popups can still differ between phones (found in F11) | S | |
| 11 | P0.11 | Matchmake by region first (India with India, US with US) | S | |
| 12 | P0.7b | Finer positions in snapshots; version check so old and new phones don't mix | S | |
| 13 | P0.4 | Best host | S | |
| 14 | P0.10 | Server-hosting test (Arjun's ping 400s vs Unite's 250); report, Arjun decides | O | |
| 15 | Ads | Ad while the match is set up (CrazyGames SDK); never delays the start | S | CrazyGames' ad rules checked |
| 15b | V1b | Voice for phones on the relay: a TURN relay that works. Free route: Metered.ca free tier (20 GB a month, sign-up, no card), its key kept as a secret in the online service, which hands out short-lived credentials (code slot `TURN_KEY_URL` exists). Helps the game link too | S | Arjun's sign-up and go |
| 16 | V2 | All-talk voice | O | servers |
| 17 | M3 | Ramparts for archers | O | |
| 18 | Bug | Misplaced village on the mountain map | H | |
| 19 | P0.8 / P0.9 | Fair timing / host hand-over. Cut P0.9 if battles move to servers | O | P0.10 |
| - | P0.5 | Cloudflare TURN relay | S | **Parked** (needs a card) |
| - | Phases 1-9 | Roles & Combat behind `?roles=1` | mixed | the list above, Arjun's approval |

### F7 moments (Arjun picks walk or fade; owner's suggestion in brackets)
1. Arena shuts at the war chest and at night: everyone inside is moved at once across the chasm to their home side
   (the one the friends saw). [Walk: everyone is herded out at a run over 3-4 s, can't fight; a horn sounds first.]
2. At night the soldiers (not captains) are moved out of the arena the same way. [Same as 1.]
3. Captain respawn: appears at home and the camera whips across the map, turning at once. [Fade to black and back; part of F5.]
4. A duel starts: anyone inside the ring is pushed to its edge in one frame. [Shove over 0.3 s.]
5. An execution: the executioner snaps to his spot beside the victim. [Slide over 0.25 s.]
6. Falling into the chasm: dead the same frame. [A short fall and a scream, then dead.]
7. Pushed out of the glacier's footprint (small, usually under 1 m). [Leave as is.]
8. Not yet checked: battle start after the flyover, and battle end to the results screen.

## Arjun's to-dos
1. Say "ship" for F10/F10b and, after review, V1.
2. Mixamo animation files (walk, run, sword attack, block, hit, death; FBX), upload to the chat.
3. Pick walk or fade for the F7 moments above.
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
- The misplaced village on the mountain map (queue #18).
- Live captain-point popups can differ between phones (queue #10).
