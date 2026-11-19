# RANGE1 Ranged basic attack for champions

Model: O · Written by the owner 18 Nov from the design doc (rev 159: Devi card, "Base champion", Battle screen) and the code on `launch26` (ff672e6)
Status: ready, questions answered 18 Nov (waiting for Arjun's go). Needed before C4 (Devi); every later Striker uses it.

## What to build
A champion page with `ranged: { ... }` shoots instead of swinging. Numbers live on the page (Devi: 24 a shot at 1.75/s, 14 m).
- **Target:** the nearest enemy within the page's range; **sticky** on a champion she has hit while he stays in range.
  Setting **Targeting: Nearest / Champions first** (one setting for every ranged champion, saved on the phone).
- **Arrows home in:** about 40 m/s, low arc, steer to the target each tick; walls, closed gates, trees stop them; a raised
  front block (Shield of Cassius, shield wall, testudo) blocks from the front. Flat damage: no head/leg roll.
- **Third shot:** two quick arrows of `third` each (Devi 18 + 18 = 36, her 1.5x), no stagger. Combo resets as melee does.
- **Shooting on the move:** Attack held = she keeps shooting; she walks while drawing and plants `plant` s (0.2) to loose,
  so she moves at about 65% (3.8 m/s) while firing; let go and she runs at full speed.
- **Structures in range:** gates, palisades, watchtowers, the glacier and the chest are shot from range (a gate takes the
  hit instead of stopping the arrow); champion bonus against walls and gates as melee.
- **Mounted:** at a walk she shoots from the saddle; riding fast, one ride-by shot (on release, like the melee ride-by).
- **Bots:** a computer ranged champion keeps 10-14 m, steps back from a melee champion, shoots while moving.
- **Joined phone:** sees the same arrows fly to the same target; presses go through the existing `atk` path.

## Done when
`store/r_RANGE1.mjs` with a test ranged champion (`window.__champs`): hits the nearest at 14 m and not at 15; stays on a hit
champion while a soldier walks closer; Champions first picks the champion; 5 arrows kill a neutral footman (see question 1);
a raised Shield of Cassius stops arrows from the front only; moving while shooting is 3.6-4.0 m/s; third shot is two hits;
a gate in range takes damage; a bot ranged champion keeps range. `r_RANGE1-join` (r_C1a harness): the same from a joined
phone. crown2sim, crown2online (roles off and on), r_PERF1c, lag no worse.

## Design rules it relies on
Devi card "Basic hits" and "Mount" (18 Nov); Battle screen "Attack: hold to keep swinging", "Targeting"; budget: ranged
reach is paid with health and speed. Animation decides the look, code the effect.

## Where to start in the code
- `core/sim/captain.js` `captainAttack0` (melee only today: `softAim` 3.4 m, `startSwing`): branch on `champOf(ti).ranged`
  into a new `core/sim/ranged.js` (target, sticky, combo, plant).
- `core/sim/missiles.js` `shoot`/`arrowHit`/`arrowsTick`: arrows are lobbed to a fixed point and hit whoever is within 1 m
  at landing; add a homing arrow (`a.tg`), flat damage, skip the plain-shield 70% roll for champion arrows (question 2).
- `core/sim/move.js` / `step.js`: the 65% pace while shooting; `guard.js` hold-attack; `app/` settings for Targeting.
- `core/sim/ai.js` (captain AI walks into melee reach): a ranged branch that kites.
- `net/netgame.js` line 74: arrows go on the wire as fixed x1/z1 and only the last 18; add the target id so a joined phone
  steers the same arrow.
- `render/rig/cliprig.js` already has legs and upper-body layers: draw/loose on the upper body over the walk.

## Out of scope
Devi's page, specials and art (C4); the stone thrower (C2).

## Arjun's answers (18 Nov)
1. A champion's own arrows skip the counter rule (24 stays 24: a footman in 5 arrows).
2. Champion arrows ignore plain soldier shields; only raised blocks stop them (Shield of Cassius, shield wall, testudo).
3. Default targeting: the nearest enemy; Settings can switch it to Champions first.
4. Mounted: she shoots and uses her specials from the saddle, as Titus does (see C4).
5. Strikers' army: 4 places to start, +3 for each castle held (`ARMY.striker`), set in this ticket.
