<!-- Mirror of https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM (rev 19, synced 2026-11-11). Read only: the Claude Doc decides. -->

## Phases 2 and 3: captain kits and ults

Goal: each role fights with its own basic attack, two abilities and an ult, built on the P1.4 ability system. Moves use placeholder animation until Phase 8 lands.

| ID | Ticket | Model | Main files | Done when |
|---|---|---|---|---|
| P2.1 | **Basic attacks.** Tap, tap, boosted for each role: Defender shield bash (staggers), Attacker arrows at the nearest unit (third = 2 quick arrows), Raider cleaving slash; the rhythm bonus on the boosted hit | S | `core/sim.js`, `core/abilities.js` | Test: three taps give the boosted hit for each role; on-beat timing adds the bonus |
| P2.2 | **Defender abilities.** Shield retreat (blocks everything from the front, arrows included; allies directly behind covered); spear sweep (area damage, knockback and stagger; heavy horse damage; stops a charge) | S | `core/abilities.js` | Test: arrows from the front do nothing during the retreat; the sweep stops a galloping horse |
| P2.3 | **Attacker abilities.** Piercing shot (drag to aim; passes through several; slows; stops a gallop); evade (a dash) | S | `core/abilities.js` | Test: the shot hits three in a line and stops a gallop; the evade moves the right distance |
| P2.4 | **Raider abilities.** Charge on horseback (a short leap without a horse); spin (2–3 s of area damage, can move; pressed while mounted, he jumps down into it) | S | `core/abilities.js` | Test: charge bowls men over; spin hits everyone around twice a second |
| P2.5 | **Second weapons.** Sword, spear and javelins (exist) plus the new bow and axe as basic-attack sets; one purchase; the swap button; the axe breaks a soldier's formation for 2 s and cleaves 3, never an ability or army ult | S | `core/sim.js`, `render/rig/weapons.js` | Test: each weapon's basic attack; the axe breaks a Hold line but not a testudo |
| P2.6 | **Horse rules for everyone.** Horse takes hits first; unhorsed only by a perfect joust or perfect brace; a new horse sets off from the nearest held place 30 s after one dies, can be intercepted and killed; a bow tap halts the horse, shoots after 0.4 s, and riding on restarts the gallop slowly; only the Raider has mounted abilities and jousting | S | `core/sim.js` | Test: each rule, including a horse killed on its way to you |
| P2.7 | **Execute at 15%.** Alone and not mid-ability; a 1 s finisher in which only the target is locked, so the executor can be hit | H | `core/sim.js` | Test: rescued by a teammate's hit |
| P3.1 | **Ult unlock and cooldown.** Upgrade 2 unlocks the ult; 90 s cooldown, shortened by P1.11 | H | `core/abilities.js` | Test: locked before upgrade 2 |
| P3.2 | **The cut down (Defender).** Wind-up about 1 s; area strike; heals 50% of damage dealt, capped at 40% of his health | S | `core/abilities.js` | Test: the heal cap holds against 20 men |
| P3.3 | **The long shot (Attacker).** Plants and draws 1.2 s with an aim line; one arrow about 60 m; passes through soldiers, stops at the first captain; more damage the more wounded the target; horse first, and killing the horse unhorses | O | `core/abilities.js`, `render/telegraphs.js` | Test: missing-health scaling; dodging by moving out of the line during the draw |
| P3.4 | **The joust (Raider).** Horseback only; 1.2 s lock-on marker on the target (25 m); mounted target unhorsed for certain; on foot under 35% health, a kill; otherwise a big hit and knockdown; without a horse the charge is kept | O | `core/abilities.js` | Test: escaping the lock-on by moving out of range; all three outcomes |

**Exit check:** each role's captain feels distinct against the computer, every ult shows its wind-up, and nothing interrupts an ult once it starts.

**Added: P2.8 Duels (O, ****agreed****).** A duel stays an opt-in, equal-terms fight: both captains on foot, at the same health (150), each with a melee weapon (an Attacker draws a sword); abilities and ults locked for the duel. Block returns **only in duels**, with today's directional reads (left, right, overhead) and parry: during a duel the Ability 1 button becomes Block. Challenge by a contextual Challenge button that appears near an enemy captain within 10 m. Rules as today: 5 s to accept, the armies form a guard ring, 60 s limit, an outsider breaking the ring costs his army morale; the winner gets +30 morale (the agreed source), the loser's army drops toward rout. Done when: a duel between any two roles is decided by skill alone in the test (role stats don't apply).
