# RATE1 Match rating and stats (tracker block 6)
Status: built 25 Nov on launch26

Design (15 Nov): rating out of 10, skill only, place and gold not counted: points brought to the side 35%, champion kills
and assists against deaths 25%, army 25% (enemy soldiers killed and recruited against lost), teamwork 15% (objective
assists, kill assists, cover). Average game about 6.0; 9+ is rare.
- `RATING` in config.js. Each part is scored against this match's average: 1 - 0.4^(value / average), so average = 6.0,
  three times the average ~9.4, nothing 0 (floor 1).
- core/sim/credit.js (new): kill assists (struck him in the last 10 s, your side killed him), cover (struck an enemy champion
  who struck your teammate in the last 5 s), objective assists (within 30 m when your side takes a castle, the Sceptre, a
  nexus or the Crown). Hooked from turret.js `champHit` (every champion-on-champion blow), score.js `die`, crown2.js, nexus.js.
  The Sceptre's breaker now gets `hl.sceptre` (the whole side still gets `hl.chest`).
- Joined phones get assists, cover and objective assists in the end tally (net/netgame.js, fields 9-11).
- ui/report.js: `parts`, `ratingOf`; results table adds Assists and Objectives ("taken +helped").
Test: `store/r_RATE1.mjs` (a 12-champion computer match: assists 18, cover 35, objective assists 13; ratings 1.8-7.3,
median 5.9; average = 6.0; win or lose changes nothing). crown2sim and crown2online pass.
