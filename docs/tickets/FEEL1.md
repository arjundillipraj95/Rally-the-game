# FEEL1 Titus's sword, sword, shield bash

Model: O · Written by the owner 2026-11-26 from Arjun's fight-feel review (chat 25 Nov)
Status: shipped to main 26 Nov, branch t/FEEL1

## What to build
Arjun: the bash "does not look like a shield bash"; "check the animation for sword sword and bash", "you check and fix this".
Found: Mixamo's shieldBash pushes the arm out straight, so the strapped scutum turned edge-on (looked like nothing);
slash 2 ended with both arms thrown up; every blow raced at 1.5-2x and let go at a fixed 0.68 s.
- Each sword combo blow (swingKind 0, 1, 6) plays its clip out to his next blow (speed from his attack rate); the blow
  lands at the same moment as before (no rules timing change).
- The bash is drawn on the block clip (shield up in front), his body driven into it (spine lean, shield shoulder in,
  hips), a step in (BASH.step), then the shield held up (blockIdle) to near his next blow. No blade ribbon on it.
- Titus's second blow uses slash3 (ends back on guard).

## FEEL1b felt by the one hit (Arjun's go 25 Nov)
- A champion's basic blow that takes health off a champion is an 'fxchamp' moment on every phone (core/sim/blowfelt.js).
  The one hit: red screen edge from that side, shake, buzz, kick (FEEL.basic: slash .4, bash 1.1 of FX1's power).
- The bash: the hit champion staggers back (hit reaction at ANIM.impact.bashRate, even while stunned) and rocks a
  little more (FEEL.basic.reel); enemy soldiers in front of Titus are shoved back (BASH.shove). render/champhit.js.

- 26 Nov (Arjun): the hit flash toned down for everyone (FEEL.light.flash, was a white body); soldiers shoved by the
  bash stagger too.

## Done when
`game/store/r_FEEL1.mjs`: slash1, slash3, bash; bash on block then blockIdle; no idle between blows; bash steps further
than a slash; leans in; fxchamp on each blow (bash heavy), bashed champion staggers, soldiers shoved, my edge red when hit; no page errors. Also r_C3a, r_C3a-join, r_C3c, crown2sim/crown2online roles off and on.

## Where it lives
`render/rig/swingflow.js` (swingFlow, bashBody), `render/heroes.js` (clipHero), ANIM.flow / clipOf / swing.shieldBash
and BASH.step in `config.js`, `core/sim/captain.js` + `net/netgame.js` (the bash step), `champions/titus.js` (look.swings).

## Notes
r_F17 and r_F26 already failed before FEEL1 (they expect the old clip files and a spear captain); r_F17's bash check
now sees block/blockIdle by design.
