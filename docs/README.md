# Rally: roles & combat build

The design and the build plan live in two Claude Docs. They are the **single source of truth**:
read them there (with the Claude Docs tools), not from copies, so every session sees the latest
agreed version.

- **Design:** Rally: Roles & Combat Design: https://claude.ai/artifact/SUEvN88JzLE4qJwtmYHdRP
- **Build plan:** Rally: Build Plan for Roles & Combat: https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM
- **Screens (approved mock-ups):** Rally: Battle Screen and Lobby: https://claude.ai/artifact/P6Qm1gxVT5yoDz7RHXoFvt

## Rules (short form; the build plan's "How we work" is the full version)

1. Work on the `roles` branch. Never push to `main`: pushing to `main` publishes the game live.
2. Everything new runs only with `?roles=1` (or `localStorage 'rally.roles' = '1'`), except Phase 0 tickets.
3. The design doc decides. If a ticket is unclear or needs a choice, stop and ask Arjun.
4. Numbers go in `game/src/config.js` tables, never in game logic.
5. One ticket, one commit, starting with the ticket ID.
6. Every ticket: `npm run build` in `game/`; `game/store/crown2sim.mjs` and `game/store/crown2online.mjs`
   pass with roles off and on; the ticket's own test `game/store/r_<ID>.mjs` proves its "Done when".

## The prompt for each ticket

```text
You are executing ticket <ID> of the Rally build plan.

1. Read docs/README.md, then with the Claude Docs tools read the build plan's "How we work" and ticket <ID>,
   and the parts of the design doc the ticket relies on.
2. Do only this ticket. Work on the roles branch; never push to main.
3. Keep everything behind G.roles (?roles=1), except Phase 0 tickets.
4. Take every number from the design doc and put it in a config.js table. Never invent a number or a rule.
5. If anything is unclear, missing, or conflicts with the design doc: stop and ask Arjun. Do not decide.
6. When done: npm run build; run store/crown2sim.mjs and store/crown2online.mjs with roles off and on;
   write and run store/r_<ID>.mjs proving the "Done when" line.
7. Commit "<ID> <ticket title>" with the attribution lines, push to roles.
8. Report: files changed, test output, and anything you were unsure about.
```

Model per ticket: O tickets on Opus, S on Sonnet, H on Haiku.
