# Rally

Rally is Arjun's three.js mobile multiplayer battle game: captains lead armies of soldiers, phones
play peer-to-peer (one phone hosts), and the Crown mode is played on the mountain map. It is live on
GitHub Pages from `main`. `game/` holds the client (Vite), `online/` the Cloudflare Worker (accounts,
matchmaking, stats, /admin), and `game/store/` the headless test scripts. Goal: a Unite-like team
battle game that holds players.

## Read in this order, and stop as soon as you have enough
1. `docs/STATE.md`: what's done, in progress, next, open decisions, known bugs.
2. Your ticket card: `docs/tickets/<ID>.md` (what to build, done when, design rules, where to start).
3. Code: `graphify query "<question>"`, `graphify explain "<symbol>"`, `graphify path "<A>" "<B>"`
   before any grep or file read. Then read only the lines the graph points to (Read with offset/limit;
   `core/sim.js` is 2.7k lines and `main.js` 1k: never read them whole).
4. Design and plan detail: `docs/spec/design/` and `docs/spec/plan/`, one file per section; start
   from each folder's `index.md`. These mirror the Claude Docs; the Claude Docs decide:
   - Design: https://claude.ai/artifact/SUEvN88JzLE4qJwtmYHdRP
   - Build plan: https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM
   Open a Claude Doc only if the card or mirror is missing something. A whole doc is ~28k tokens.
5. Finished projects: `docs/history/` (read only).

## Team
Arjun decides. The project owner (Opus) assigns tickets, writes ticket cards and reviews. The
designer (Opus, its own chat) owns the design doc. Builders: O tickets = Opus, S = Sonnet, H = Haiku.

## Rules
1. Discuss first. Never build, commit or push until Arjun says "go" or "build" for that thing.
2. Do only your ticket. If anything is unclear or conflicts with the design, stop and ask.
3. Work on `roles`. Never push `main` unless told to ship: `main` is the live game.
4. Phase 0, M and F tickets ship live. Phase 1+ stays behind `?roles=1` (G.roles) until Arjun approves the phase.
5. Numbers come from the design doc and go in `game/src/config.js` tables, never in game logic.
6. One ticket, one commit, message starting with the ticket ID.
7. Never write the admin dashboard key or any secret to files or memory. Arjun adds secrets as
   GitHub secrets himself; never ask him to paste one in chat.
8. Last step of every ticket: update `docs/STATE.md` (a few lines, not a report) and the card's Status.
   New findings about finished projects become tickets or STATE entries, never edits to `docs/history/`.

## Saving tokens
- Run long test output through `tail` or `grep`; print summaries, not logs.
- Don't re-read a file you just wrote or edited. Don't paste whole files or docs into chat.
- Keep replies to Arjun short: he reads on his phone.

## Owner duties (the owner chat only)
- Before a ticket starts: write its card from `docs/tickets/_TEMPLATE.md`, quoting only the design
  rules it needs, with code pointers found through graphify.
- When the design doc's "Changes for the owner" section changes: re-sync the mirror. Read the doc's
  root node with the Claude Docs tools (the result is saved to a file), then
  `python3 -I tools/docs2md.py <saved file> design|plan <doc url>`, commit `docs/spec/`.
- Keep `docs/STATE.md` under ~120 lines: move finished detail into `docs/history/<yyyy-mm>-log.md`.

## Test
- Servers (game :8766, peer :9000, online :8787): `bash game/store/servers.sh`
- Chromium for Playwright: `/opt/pw-browsers/chromium`
- Every ticket, from `game/`: `node store/crown2sim.mjs` and `node store/crown2online.mjs`, each with
  roles off and on (`Q='?crown2=1&roles=1'`), plus its own `store/r_<ID>.mjs` proving "Done when".
- Lag: `LAG=250 LOSS=0.05 DUR=60 node store/lagtest.mjs`

## Ship
1. `npm run build` in `game/` as the very last step before committing (it writes `index.html` and
   `assets/` at the root), then `git checkout -- online.json` (the build rewrites it; never commit it).
2. Commit, push `roles`. To ship live (only when told): `git checkout main && git merge --ff-only roles
   && git push origin main`, then confirm with `gh run list -L 1 --branch main`.

## graphify (code map)
A session hook installs graphify and builds `graphify-out/` at start (~10 s, no model tokens; not
committed). After changing code, run `graphify update .`. Use `GRAPH_REPORT.md` only for broad
architecture questions.
