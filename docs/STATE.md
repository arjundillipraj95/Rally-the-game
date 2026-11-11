# Rally: project state

Current project: **Roles & Combat** (design and build plan in Claude Docs, links in CLAUDE.md).
Every executor updates this file as the last step of its ticket. Owner: Opus project owner chat.
Last updated: 2026-11-11 (afternoon).

## Done (live on main)
- P0.1 Dead-code cleanup
- P0.2 Lag test harness (`window.__lag`, `game/store/lagtest.mjs`)
- P0.3 Ping readout (HUD figure, colour bands; dashboard columns). Showed 274 ms at a 250 ms simulated round trip.
- M1 Neutral soldiers look like soldiers (`game/store/r_M1.mjs`)

## In progress
- V1 Team voice: **built on `roles`, not shipped**. Your team talks on an open mic from the start of an online battle,
  with a mute button beside Shout. Each teammate's phone calls the others directly (lower id calls, one link per pair);
  nothing crosses teams. Calls need a direct link, so a player on the relay has no voice (the game still plays).
  `game/store/r_V1.mjs`: both phones' mics live, mute works, no call across teams. NOT YET TESTED: a same-team call
  (the duo lobby needs a second player in the party; the harness can't yet set that up). First check on a real duo.
  Review of the border work (F10 and F10b, by the other agent): F10's test passes; F10b's test clicked a hidden button
  on the baseline page, which I fixed in `store/r_F10b.mjs` (direct click). Its status line said "built on `f10b`",
  which doesn't exist; it's on `roles`.
- F10b The summit feeling (redo of F10's needle ring): **built on `roles` (5a923ef), not shipped**. Cliffs past the rim drop into a
  drifting cloud sea; far snowy massifs below eye level, low sun disc, birds under the rim, blown snow at the edge
  (4 draw calls; outer cliff trees dropped). Low, Crown start: calls/tris within noise of 4cafda1. `store/r_F10b.mjs`.
- P0.7 Smooth everyone else: **built on `roles`, not shipped** (waits for Arjun's "ship"). Joining phones draw other
  units between two host snapshots, a moment in the past, instead of gliding at the newest one; small snapshots go
  out 20 a second (was 12). `game/store/r_P0.7.mjs` at 250 ms and 5% loss: drawn-speed stutter 3.34 -> 2.39 m/s,
  too-fast frames 483 -> 229, position error 0.63 -> 0.76 m (the cost of drawing in the past). The plan's
  "no jump over 0.5 m" line is not met as written: the headless phones drop frames, and a unit rightly covers more
  ground after a dropped frame. Left over: P0.7b below.

## Assigned, waiting for Arjun's go (no build yet)
Model is the cheapest one that can do the ticket without losing the feel. Opus where timing, netcode or animation blending matter.
| Ticket | What | Model |
|---|---|---|
| F4 | Neutrals and camps fight and ambush as real soldiers | O |
| F5 | Captain death sequence (fall, grey, respawn timer, who killed you; men carry on) | O |
| F6 | Hit feel: captain sword clash, blocked hit, captain cutting down a soldier, then the rest | O |
| F9 | Horse charges: full stop only on Hold and facing; standing men slow; moving or flanked men are bowled over | O |
| F1 | Batched soldiers (P8.1 forward): about 1,219 draw calls down to the budget of 150 | O |
| F8 | Animation: integrate a rigged pack's clips, one shared skeleton; blending | O |
| F8a | Animation file prep: convert, rename, check licence | H |
| F7 | Remove abrupt cuts (war chest and similar): walk or fade every one | S |
| F2 | Lobby: lanes, ready-up, the 10 s versus screen | S |
| V2 | All-talk voice (after servers) | O |
| P0.11 | Region matchmaking | S |
| Ad slot | Ad while the match is set up (CrazyGames SDK) | S, after CrazyGames' rules are checked |

## Next (owner assigns; builder model in brackets)
Ticket cards ready in `docs/tickets/`: F10b (running, Opus), F13 (after F10b and Fable's work), F7. The owner writes a card before any other ticket starts.

| Ticket | What | Model | Waits on |
|---|---|---|---|
| P0.6 | Your captain answers instantly. Re-measured 11 Nov: the far phone's own captain already moves in about 130 ms (it is moved on its own phone); what is late is everyone else and hits. Re-scope to hits and your own soldiers | O | |
| P0.7b | Finer positions in snapshots (0.1 m steps make about 2 m/s of speed noise at 20 a second); needs a version check so old and new phones don't mix | S | P0.7 shipped |
| P0.11 | Matchmake by region first (India with India, US with US); a far host is 250 ms whatever the code does | S | |
| P0.4 | Best host | S | |
| M2 | The mountain's edge (rocky peaks, mist, sky) | S | |
| P0.7 | Smooth everyone else | O | P0.6 |
| P0.8 | Fair timing | O | P0.6 |
| P0.9 | Host hand-over (extend the existing one) | O | P0.6-P0.8 |
| M3 | Ramparts for archers | O | |
| P0.10 | Server-hosting test (report, Arjun decides) | O | P0.9 |
| P0.5 | Relay through Cloudflare TURN | S | **Parked**: Cloudflare asks for a card; revisit only if real players fail to connect |

### Friends' playtest, 10 Nov 2026 (F tickets; ship live like Phase 0)
Ready to build (no design question):
| Ticket | What | Model |
|---|---|---|
| F10 | The map's edge is a slope: same as M2 (peaks, cliffs, mist). Do M2 | S |
| F7 | No abrupt cuts: after the war chest is taken you are teleported outside. Walk or fade every such moment; list them all first | S |
| F4 | Neutral garrisons and camps fight like soldiers and ambush. Today each squad is one shared health pool that stands still (`c2` breaks of kind guard/camp), so this is a rebuild as real units | O |
| F1 | Not smooth even on High: 1,219 draw calls and 560k triangles at the start of a Crown battle on Low (budget 150). Bring P8.1 (batched soldiers) forward | O |
| F3 | Lag India to US: P0.7 (built), P0.7b, P0.4, P0.11, then P0.10 | - |

Built on `roles`, not shipped:
- F11 Same results and names on every phone. Each phone kept its own record of the battle for the Points tab, so a
  joined phone that missed a moment showed different captains' points and no Chest or Crown marks. The host's record
  now goes to every phone at the end (`game/store/r_F11.mjs`). Also: a matchmade host's seat could be kept under a
  stand-in name, so joined phones showed him under a computer captain's name (seen as "Monk"); put right on both ends.
  The name fix is from reading the code and the two screenshots, not reproduced in a test.

Arjun's answers, 11 Nov:
- F2 lobby: lanes left, right, jungle; yes to the versus screen. New: voice chat like Unite (team, and all-talk) = F12.
- F5 dying: yes to fall, grey screen, respawn timer, who killed you; his men carry on in the current order.
- F6 hit feel: the three moments agreed (captain sword clash, a blocked hit, a captain cutting down a soldier), then the rest.
- F9 horses: agreed, the design doc's rule early (full stop only on Hold and facing; standing men slow it; moving or flanked men are bowled over).
- Order: F10, F7, then F4. Owner plans and builds.
- His ping was in the 400s where Unite shows him 250: phone-to-phone links take a worse road than a game server's. P0.10 (server test) moves up.

Answered above; kept for the record:
| Ticket | What | Question |
|---|---|---|
| F2 | One lobby for all 8 or 12 players, lanes, ready-up, 10 s versus screen | Lane choices; who can talk to whom; what "ready" does |
| F5 | The dying sequence feels random | What should a captain's death show, and what happens to his men |
| F6 | Hits, blocks and clashes aren't felt | Bring P8.7 forward; which three moments matter most |
| F8 | Walking looks robotic | Needs real animation clips (free packs); approve the art route |
| F9 | Soldiers always turn and brace against a horse | Proposal: the design doc's rule early (full brace only on Hold and facing; moving or flanked men are bowled over) |

Budget: 50 dollars, nothing spent. Nothing above needs money.

Phase 0 exit check: Arjun's friend in India plays a match; ping and relay use show on the dashboard.
Phases 1-9 (roles behind `?roles=1`) start after Phase 0 and Arjun's approval.

## Arjun's to-dos
1. Battle screen: the designer chat is making a fresh one from the design doc (replaces choosing v1/v2).
2. Source the priority 1 GLB models (gate Phase 8; list in the build plan).
3. Phone models list (yours and your friend's).
4. Sound effects source.
5. Playtest with the friend in India after P0.6-P0.8 are live.

## Open decisions
- P0.5: the game already relays through public relays and the online service (commits of 1 and 3 Nov).
  Check whether Cloudflare TURN is still needed before un-parking it.
- The numbers pass (HP, damage, gold for everything): designer, before Phase 9.
- Skins and the shop: after the game is done.

## Known bugs / deferred
- Measured: 466 ms response at a 250 ms round trip (fix: P0.6-P0.8).
- The misplaced village on the mountain map (deferred).
- History: P0.3 "Ping colours" was committed twice around a merge (harmless).
