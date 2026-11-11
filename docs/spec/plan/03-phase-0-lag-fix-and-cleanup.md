<!-- Mirror of https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM (rev 19, synced 2026-11-11). Read only: the Claude Doc decides. -->

## Phase 0: lag fix and cleanup

Goal: today's game plays well for someone far from the host, and the codebase is tidy before the big build. Phase 0 changes today's game (no switch), so each ticket is merged only on Arjun's go.

| ID | Ticket | Model | Main files | Done when |
|---|---|---|---|---|
| P0.1 | **Dead-code cleanup.** List unused exports, functions, CSS rules and old valley-Crown-only paths (keep `?crown2=1` links working); delete them | S | all of `game/src`, `online/src` | Build passes; all `store/` tests that still apply pass; bundle size before and after reported |
| P0.2 | **Lag test harness.** A two-phone headless test with added delay (250 ms) and 5% packet loss, reused by P0.5–P0.7 | S | `store/lagtest.mjs` | Runs a 60 s online battle under delay and prints position error and response times |
| P0.3 | **Ping readout.** Ping to the host every 2 s; a small ms figure in the HUD corner (green under 120, amber under 250, red above); median ping and relay use sent in the perf report; the admin dashboard's Phones panel shows ping p50/p90 and % relayed | H | `net/netgame.js`, `ui/hud.js`, `online/src/stats.js`, `online/src/admin.js` | The figure updates in the test; the dashboard shows the new columns |
| P0.4 | **Best host.** During the warm-up, phones measure ping to each other; the host becomes the player with the lowest median ping | S | `net/lobby.js`, `online/src/index.js` | With one phone delayed in the test, it is never chosen as host |
| P0.5 | **Relay through Cloudflare.** Arjun enables Cloudflare Realtime TURN and adds its key as a Worker secret; the worker hands out short-lived relay credentials; phones use them when a direct link fails | S + Arjun | `online/src/index.js`, `net/p2p.js` | A forced-relay test connects; the dashboard counts relayed players |
| P0.6 | **Your captain answers instantly.** The phone moves its own captain and starts its attacks immediately, keeps a short input history, and smoothly corrects to the host (snap only if over 2 m off) | O | `net/netgame.js`, `core/sim.js` | At 250 ms delay, your captain responds on the same frame and ends within 0.3 m of the host's position |
| P0.7 | **Smooth everyone else.** Remote units drawn about 100 ms behind the newest snapshot and blended; snapshots from 12 to 20 a second if bandwidth stays under 40 KB/s | O | `net/netgame.js` | At 250 ms and 5% loss, no unit jumps more than 0.5 m between frames |
| P0.8 | **Fair timing.** Button presses carry the phone's time; the host judges timing windows (parry, perfect joust, dodging a wind-up) allowing for that player's measured ping, extending today's `remote` allowances | O | `core/sim.js`, `net/netgame.js` | A perfect joust and a wind-up dodge both succeed in the test at 250 ms |

**Exit check:** Arjun's friend in India plays a match; his ping and relay use show on the dashboard and he reports how it feels.

**Agreed additions (server hosting is the long-run goal****):** **P0.9 Host hand-over (O):** if the host's phone drops or its connection collapses (ping over twice the others' for 15 s), the whole battle state moves to the next-best phone and play carries on after a 1–3 s pause; at most once per battle. **P0.10 Server-hosting test (O):** measure running the battle on Cloudflare's servers near the players instead of on a phone (how Unite and PUBG work): cost per battle, speed, and what must change in the code; then Arjun decides.

**Map fixes from Arjun's playtest (8 Nov 2026), shipped live like Phase 0:**

| ID | Ticket | Model | Done when |
|---|---|---|---|
| M1 | **Neutral soldiers look like soldiers.** Garrison and camp soldiers on the mountain drawn with the real soldier model (footmen with shields, archers with bows) in grey steel with a neutral grey banner, instead of the simple post shapes | S | Screenshot of a garrison and a camp |
| M2 | **The mountain's edge.** Ring the summit with taller rocky peaks and cliffs falling into mist, and a distant range against the sky, so the map reads as a summit among mountains instead of a green edge that drops away; camera unchanged; no floating island | S | Screenshots from three edges |
| M3 | **Ramparts for archers.** A raised walkway behind castle and rock walls where archers stand automatically and shoot over; enemy archers can shoot back at them; needed later by the Defender's "Volley from the walls" | O | Test: archers on a rampart hit targets beyond the wall; archers below it don't |
