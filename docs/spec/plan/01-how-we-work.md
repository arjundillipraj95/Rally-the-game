<!-- Mirror of https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM (rev 19, synced 2026-11-11). Read only: the Claude Doc decides. -->

## How we work

Every executor follows these rules on every ticket. They exist because pushing to `main` publishes the game live.

- **Branch:** all work happens on the `roles` branch. Never push to `main`. A phase is merged only after Arjun says go.
- **Switch:** everything new runs only with `?roles=1` in the address (or `localStorage 'rally.roles' = '1'`). With the switch off, the game must behave exactly as today and every existing test must still pass.
- **The design doc is the source of truth.** Executors make no design decisions. If a ticket is unclear, conflicts with the design doc, or needs a choice, **stop and ask Arjun.** Don't guess.
- **Numbers live in ****config.js**** tables only** (`ROLES`, `KITS`, `ULTS`, `ARMY_ULTS`, `UNITS`, `ROLE_UPGRADES`, `CAPTAIN_TIERS2`, `ECON2`, `MORALE2`, `HEAL2`), never written into game logic, so the numbers pass can tune them without touching code.
- **One ticket, one commit.** Commit message starts with the ticket ID (for example `P1.3 Ability framework`), plus the attribution lines.
- **Tests on every ticket:** `npm run build` passes; `store/crown2sim.mjs` and `store/crown2online.mjs` still pass with the switch off and on; the ticket adds its own headless test `store/r_<ticket>.mjs` proving its "Done when" line.
- **Host decides.** All new rules run on the host in `core/` (simulation). Clients only send button presses and draw what the host sends. New events go through `net/netgame.js` snapshots.
- **Model per ticket:** **H** = Haiku (mechanical: tables, CSS, simple rules), **S** = Sonnet (standard features), **O** = Opus (hard: netcode, animation tech, formations, cavalry and bot brains). Don't run an O ticket on Haiku.
- **Review:** at the end of each phase, Opus reviews the whole phase with fresh eyes against the design doc before Arjun's go.
