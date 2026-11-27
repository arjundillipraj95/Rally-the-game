# Rally: project state

Work on `launch26` (test site https://rally-preview.arjun-rally.workers.dev deploys on every push; `main` = live).
Every builder updates this file as the last step of its ticket. Keep it under ~120 lines; finished detail goes to
`docs/history/2026-11-log.md` (the full board as of 26 Nov is at its end).
Last updated: 2026-11-26 (BAL1, FEEL5, CASTLE11, AI3, FEEL3, FEEL4 built on launch26, not shipped).

## Live on main (26 Nov)
- The relaunch: new mountain (MAP), castles (CASTLE1-10, ORD1), champions Titus (C3), Devi (C4), Sigrun (C5), Stage 1
  finish (GOLD1-3, SCEP1, RATE1, MATCH1, HEAL1, BAR1), bots pick champions (BOT1), factions (FAC1), menus (MENU1-5).
- 26 Nov: FEEL1 Titus's sword, sword, bash; the champion hit feels it; hit flash toned down. FEEL2 Titus's specials and
  every mount (Ram .3 s warning, through soldiers; Shield stab, blows bounce; Eagle locks on, springs off the horse;
  Testudo shove, stab, heavy shove; mount pushes capped; ride-by ring at waist; Devi draws on horseback). CAM2 turning
  camera back as default (Settings > Camera). FIX13 picture after rotate, Fortify tappable. AUD1 sound bars.
- Arjun hasn't played the FEEL build on his Android yet.

## Built on launch26, waiting for Arjun's "ship"
- FEEL3 (card): block, parry, clash, computers' guard, champions turning arrows and the finisher only in a duel.
  AI1's hunt had left a computer's guard up for minutes (now `huntT`). r_FEEL3 11/11.
- FEEL4 (card): a joined phone shows its own blow's hit on the target at once (~130 ms after the press at 250 ms
  lag), the host's word not played twice. r_FEEL4. Both: crown2sim/online roles off+on, r_FEEL1/2, r_DUEL4 pass.

- AI3 (card): computers take a lane (left / right / jungle, by what players left, then class) and its job; at the
  Sceptre and the Crown each side picks All in / Split / Hold / Third party and calls it to its players. `core/sim/lanes.js`.
  r_AI3, crown2sim/online roles off+on, r_CASTLE9, r_AI1, r_AI2, r_BOT1 pass.

- CASTLE11 (card): a broken gate silences its ballista and the archers beside it; Repair at level III (120 gold, one
  bar). r_CASTLE11, shot_CASTLE11, crown2sim/online off+on, r_CASTLE2/3/9/10 pass.

- BAL1 (card): champions grow in their trait (Titus health, Devi attack speed, Sigrun run speed), specials 2x his
  blow and ults 5x, armies grow with him, moves in the faction colour, Upgrade names his tiers. r_BAL1.
- FEEL5 (card): Devi's own arrows at once on a joined phone, boosted arrow after Evade, thwack, SA1 black tail, 4 s
  Volley, Arrow storm hits everyone inside. r_FEEL5, r_FEEL5-join. Regression: crown2sim/online off+on, lagtest,
  r_FEEL1/2/4, r_DUEL4, r_C1g pass (r_FEEL2 runs out of browser memory in one go: run PART=b,c,d / e / f / g).

## Agreed, not built (fight feel)
- Sigrun's review proposed 26 Nov (basic chop stagger, Pounce mark, Spin ring, Hunt's red mark / 5x, Snout wedge):
  waiting for Arjun. Then each champion's soldiers (Devi's archers first).

## Open decisions
- Eagle's fall: knock champions down? (today a .22 s stun)
- Does the bash break a block inside duels?
- Hold-to-aim for mounted specials (discussed, not built).
- Battles on servers (P0.10 report first; Durable Objects free tier, paid $5/month).
- Numbers pass (HP, damage, gold): designer. Skins and shop: after the game. Budget $50, nothing spent.

## Next (Arjun's order, 26 Nov)
1. Readability: crowds of soldiers hide your champion. Needs a design talk and a card.
2. P0.7b version check: still needed (26 Nov check: CAM2 kept CAM1's tree clearances in map26.js, and every ship
   changes host rules or joined-phone prediction). No card yet.
3. Fight-feel review: Devi, then Sigrun, then the soldiers.

## Build queue (open)
| Ticket | What | Model |
|---|---|---|
| P0.7b | Version check (and finer snapshot positions) | S |
| P0.11 | Matchmake by region first | S |
| P0.4 | Best host | S |
| P0.10 | Server-hosting test; report, Arjun decides | O |
| P0.8 / P0.9 | Fair timing / host hand-over (cut P0.9 if servers) | O |
| Ads | Ad while the match is set up (CrazyGames SDK), never delays the start | S |
| V1b / V3 | Voice on relayed phones (Metered TURN, Arjun's sign-up); non-party teammates | S |
| P0.5 | Cloudflare TURN relay: parked | S |

## Before CrazyGames (must, Arjun 15 Nov)
- Cheat-proof results before any ranks/rewards (every phone reports and the server compares, or server battles).
- Online service: origin allowlist instead of CORS `*`; per-connection message rate and size caps.
- Admin page behind Cloudflare Access. Profanity filter; mute and report for voice.
- GitHub secret scanning, Dependabot, branch protection on `main`.

## Open leftovers (small)
- Devi's army stone-thrower crews wear the Roman spearman (no Chola crew figure).
- Light far soldier figure still the old look (own ticket). r_SIZE1's drawn sizes read 0 (stale check).
- Lobby: 60 s with a class filter and picture grid (Arjun 17 Nov), design doc still says 25 s.
- Branches never shipped and likely stale: t/CL2 (only the Crown in menus), t/F25, t/F26 (spear reach/facing).

## Known test issues
- Flaky before FEEL: r_C3k, r_C4. Out of date: r_F17, r_F26, r_F7 (b-d, f fail before FEEL3). Also flaky: r_CASTLE2 (needs an enemy army with spearmen; random champions), r_C5-join, r_F8 (e), r_F22, r_F24.
- After editing src, restart vite (`pkill -f "vite --port 8766"`; `store/t.sh` does it) or tests import a second copy
  of modules and read empty. servers.sh can hang: start vite directly.
- Headless renders can't judge feel; Arjun checks on his phone (851x393 landscape touch for screenshots).

## Arjun's to-dos
- Play the FEEL build on Android and report.
- A full friends match (Gate 1).
- Voice: party of 2 test, Metered sign-up and 2 secrets.
