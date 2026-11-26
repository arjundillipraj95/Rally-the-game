# AI3 Computers take a lane and a job

Model: O · Written 26 Nov from Arjun's design ("agree with all, build it", 26 Nov)
Status: built (not shipped), 26 Nov

## What to build
- Lanes, as seen from your base looking at the summit: left, right, jungle. A side's computers take the lanes its
  players didn't pick in the lobby (online: the service's `lanes` in `start`), class first (Raider jungle, Striker
  left, Vanguard right), then what's left. A lone army per side keeps the older rules.
- Left: own middle castle, own left castle, the neighbour's facing castle, their middle, then their nexus. Defends a
  castle of its lane under attack within 60 m.
- Right: own middle castle, own right castle, the neighbour's facing castle, their middle; defends any of them under
  attack, then holds the last.
- Jungle: fills in for a fallen lane mate's castle under attack, helps a mate taking a castle, clears own camps (buffs
  first), steals an enemy camp with no enemy champion near, else goes to a lane mate's next castle.
- Sceptre (from its warning) and Crown: each side with computers picks All in / Split (the jungler takes an empty
  enemy castle or open nexus) / Hold (lead of 8+: keep castles, jungler waits and steals below 30%) / Third party
  (wait 20 m off, go in when two sides are hurt, it's below 30%, or after 45 s). Behind at the Crown: All in or Split.
  A computer calls the plan to a side with a player (a shout and ping: "Attack here!" at the prize, or "Defend!").
- Picked by Arjun's answers: the jungler fills in for a fallen lane; the plan shows as a computer teammate's shout.

## Done when
`game/store/r_AI3.mjs`: lanes by class on every side; left really on the screen's left from each base; the left lane
meets the neighbour's right; in a 12-captain computer battle to 9:20 the laners' plans are their lane's castles (97-100%)
and the jungler's camps or a mate's castle (99%); every side picks a plan at the Sceptre and at the Crown; only a side
with a player hears the call.

## Where it is
`core/sim/lanes.js` (new), hooked first in `core/sim/holds.js` holdPlan (and AI2's jungleCamp skips laners);
`app/friends.js` passes the lobby picks to the host; numbers `CASTLE26.lanes` in `config.js`.

## Out of scope
Players' own lane (a plan only). The map slot names in map26.js ('left' is k = -1) are the other way round from the
screen; nothing player-facing uses them.
