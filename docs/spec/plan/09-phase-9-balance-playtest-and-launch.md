<!-- Mirror of https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM (rev 19, synced 2026-11-11). Read only: the Claude Doc decides. -->

## Phase 9: balance, playtest and launch

Goal: the numbers are proven fair before players see roles, then the switch goes on for everyone.

| ID | Ticket | Model | Main files | Done when |
|---|---|---|---|---|
| P9.1 | **Balance harness.** Runs hundreds of headless bot matches per setup: each solo role pairing, each trio team mix (three Defenders against three Raiders, and so on); reports win rates, gold at 2:00 / 5:00 / 8:00 / 10:00, when each upgrade is bought, ult uses, glacier and chest times | O | new `store/balance.mjs` | One command produces the full report |
| P9.2 | **Numbers pass.** Tune the `config.js` tables until every role pairing and team mix wins 40–60%; upgrades land near 1:00 / 4:00 / 7:30; the glacier takes about 3 minutes alone and 1 minute for three; snowballing checked (the side behind still gets its ults) | O | `config.js` only | Harness report within targets; changes listed for Arjun |
| P9.3 | **Dashboard by role.** Win rate, pick rate and kills per role and team mix; ping by player, so real matches confirm the harness | S | `online/src/stats.js`, `online/src/admin.js` | Panels show test data |
| P9.4 | **Friends' playtest.** Arjun and friends (including the player in India) play with `?roles=1`; feedback collected; fixes as tickets | Arjun + S | — | Arjun's go |
| P9.5 | **Launch.** Roles on by default; old systems removed for good; `?roles=0` kept for a week as a fallback | S | all | Live; dashboard watched for a week |
