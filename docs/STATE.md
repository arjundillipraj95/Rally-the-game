# Rally: project state

Current project: **Roles & Combat** (design and build plan in Claude Docs, links in CLAUDE.md).
Every executor updates this file as the last step of its ticket. Owner: Opus project owner chat.
Last updated: 2026-11-08.

## Done (live on main)
- P0.1 Dead-code cleanup
- P0.2 Lag test harness (`window.__lag`, `game/store/lagtest.mjs`)
- P0.3 Ping readout (HUD figure, colour bands; dashboard columns). Showed 274 ms at a 250 ms simulated round trip.
- M1 Neutral soldiers look like soldiers (`game/store/r_M1.mjs`)

## In progress
- (none)

## Next (owner assigns; builder model in brackets)
| Ticket | What | Model | Waits on |
|---|---|---|---|
| P0.6 | Your captain answers instantly | O | |
| P0.4 | Best host | S | |
| M2 | The mountain's edge (rocky peaks, mist, sky) | S | |
| P0.7 | Smooth everyone else | O | P0.6 |
| P0.8 | Fair timing | O | P0.6 |
| P0.9 | Host hand-over (extend the existing one) | O | P0.6-P0.8 |
| M3 | Ramparts for archers | O | |
| P0.10 | Server-hosting test (report, Arjun decides) | O | P0.9 |
| P0.5 | Relay through Cloudflare TURN | S | **Parked**: Cloudflare asks for a card; revisit only if real players fail to connect |

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
