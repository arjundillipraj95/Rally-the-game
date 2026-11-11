<!-- Mirror of https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM (rev 19, synced 2026-11-11). Read only: the Claude Doc decides. -->

## The prompt for each ticket

The repo's docs/README.md links this plan and the design doc, which stay the single source of truth (copies would drift). It replaces copying them as `docs/DESIGN.md` and `docs/BUILD_PLAN.md`, so any session (Sonnet, Haiku or Opus) can read them. Then each ticket is started with this prompt, changing only the ticket ID:

```
You are executing ticket <ID> of the Rally build plan.

1. Read docs/BUILD_PLAN.md: "How we work" and ticket <ID>. Then read the parts of docs/DESIGN.md the ticket relies on.
2. Do only this ticket. Work on the roles branch; never push to main.
3. Keep everything behind G.roles (?roles=1), except Phase 0 tickets.
4. Take every number from the design doc and put it in a config.js table. Never invent a number or a rule.
5. If anything is unclear, missing, or conflicts with the design doc: stop and ask Arjun. Do not decide.
6. When done: npm run build; run store/crown2sim.mjs and store/crown2online.mjs with roles off and on; write and run store/r_<ID>.mjs proving the "Done when" line.
7. Commit "<ID> <ticket title>" with the attribution lines, push to roles.
8. Report: files changed, test output, and anything you were unsure about.
```

For O tickets, start the session on Opus. For S tickets, Sonnet. For H tickets, Haiku is enough.
