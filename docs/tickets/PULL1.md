# PULL1 The pull down
Status: built 18 Nov (r_PULL1, shot_PULL1)

Agreed with Arjun 18 Nov: riders were too strong with no answer for sword or bow champions. Any champion on foot can
pull a passing enemy rider out of the saddle with a timed Attack.

- A ring closes on an enemy rider passing within reach at speed (white while closing, gold in the window).
- Attack on the beat (perfect) or near it (good): he's pulled off, the horse bolts unhurt, he takes a blow and is down.
- A Raider only comes off on the beat. Early or late: a normal swing. Computer captains catch it now and then.
- The beat is `lead` s before his closest pass, so a good pull beats his own ride-by blow.
- Numbers: `PULL` in `game/src/config.js`. Code: `core/sim/pulldown.js`, `render/pullfx.js`, hooked in
  `captain.js` (captainAttack) and `ai.js` (aiCaptainFight).

Done when: r_PULL1 passes (on the beat off, horse unhurt; early stays on; a Raider stays on for a near-miss and comes
off on the beat; a walking horse can't be pulled; a computer captain catches it).
