<!-- Mirror of https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM (rev 19, synced 2026-11-11). Read only: the Claude Doc decides. -->

## Phases 6 and 7: screens and bots

Goal: the battle screen and lobby match the approved mock-ups (canvas **Rally: Battle Screen and Lobby**), and computer captains play every role well.

| ID | Ticket | Model | Main files | Done when |
|---|---|---|---|---|
| P6.1 | **Battle controls.** Right arc: Attack (86 px), Ability 1, Ability 2, Ult with its charge ring, small weapon swap; bottom bar as today: army box (men, mix, morale bar), one Command button (tap to switch Follow / Hold / Charge, drag onto enemies to focus), Recruit, Ride; top: minimap, timer and phase, the four sides' scores, gold, upgrades with three pips, pause | S | `index.html`, `ui/input.js`, `ui/hud.js`, `style.css` | Screenshot at 844×390 matches the mock; every button works by touch and keyboard |
| P6.2 | **Wind-up warnings on screen.** The red banner for an enemy army ult forming near you; ground markers, aim lines and lock-on rings readable on a phone | S | `ui/hud.js`, `render/telegraphs.js` | Screenshot shows each ult's warning |
| P6.3 | **Lobby role pick.** In the free-play lobby: 30 s (at least 10 s after the last player joins), 5 s countdown once all lock in; role cards; lane plan (left, jungle, right); live picks and quick phrases for your team; the "no Attacker yet" hint; your team's picks hidden from enemies until the battle; unhurtable until you lock in; last role if you don't pick; bots fill | S | `net/lobby.js`, new `ui/rolepick.js`, `online/src/index.js` | Two-phone test: picks show live to a teammate and not to an enemy; countdown rules |
| P6.4 | **Upgrade menu.** Role-aware: captain tiers 1–3, unit upgrades for your two units, second weapon (once), Fortify and watchtower by role | S | `ui/hud.js` | Test buys through the menu |
| P6.5 | **Results screen.** Points tab unchanged in value (same for every role); role icon beside each captain in the ledgers | H | `ui/timeline.js` | Screenshot |
| P6.6 | **Tutorial coach.** First battle with roles: move, attack, ability unlock at upgrade 1, ult at upgrade 2, Command, army ult | S | `ui/tutorial.js` | Walkthrough test reaches the end |
| P7.1 | **Bot captains by role.** Use abilities and ults sensibly; dodge wind-ups by moving away; do the role's job through the match (Defender holds, Attacker sieges, Raider clears camps and hunts); three difficulty levels | O | `core/sim.js` (AI section) or new `core/brains.js` | 100 bot-only matches: no stuck captains; every ability used; each role's job counters climb |
| P7.2 | **Bot armies.** Recruit by role and by what the enemy fields (spears against cavalry, and so on); use orders and army ults | O | same | Bots field cavalry against archer-heavy enemies more often than not |
| P7.3 | **Bot lobby picks.** Fill missing roles first | H | `net/lobby.js` | Test |

**Exit check:** a trio match with friends plus bots, start to finish, on phones.
