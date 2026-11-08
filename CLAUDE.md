# Rally

Rally is Arjun's three.js mobile multiplayer battle game: captains lead armies of soldiers, phones
play peer-to-peer (one phone hosts), and the Crown mode is played on the mountain map. It is live on
GitHub Pages from `main`. `game/` holds the client (Vite), `online/` the Cloudflare Worker (accounts,
matchmaking, stats, /admin), and `game/store/` the headless test scripts.

## Sources of truth (read with the Claude Docs tools, never from copies)
- Design: https://claude.ai/artifact/SUEvN88JzLE4qJwtmYHdRP
- Build plan: https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM
- Project state (done / in progress / next / decisions / bugs): `docs/STATE.md`
- Finished projects (read only): `docs/history/`

## Team
Arjun decides. The project owner (Opus) assigns tickets and reviews. The designer (Opus) owns the
design doc. Builders: O tickets = Opus, S = Sonnet, H = Haiku.

## Rules
1. Discuss first. Never build, commit or push until Arjun says "go" or "build" for that thing.
2. Do only your ticket. If anything is unclear or conflicts with the design doc, stop and ask.
3. Work on `roles`. Never push `main` unless told to ship: `main` is the live game.
4. Phase 0 and M tickets ship live. Phase 1+ stays behind `?roles=1` (G.roles) until Arjun approves the phase.
5. Numbers come from the design doc and go in `game/src/config.js` tables, never in game logic.
6. One ticket, one commit, message starting with the ticket ID.
7. Never write the admin dashboard key or any secret to files or memory. Arjun adds secrets as
   GitHub secrets himself; never ask him to paste one in chat.
8. Last step of every ticket: update `docs/STATE.md`. New findings about finished projects become
   tickets or STATE entries, never edits to `docs/history/`.

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
