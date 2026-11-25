# GOLD3: neutral soldier gold, nexus in the points views
Status: Done (25 Nov), on launch26, not yet on main

## What (Arjun 25 Nov)
- Every neutral soldier (a castle's guard, a camp's bandit) pays 20 gold to the army that kills him; a camp pays nothing extra when cleared (was 50 for the last man only). A "+20" floats for the player.
- XP unchanged.
- The nexus's +5 shows in the in-game Points panel (tap Points: a Nexus section, each banner's health or who broke it) and in the results summary (a Nexus source in the scoreline bar and legend, the breaker's ledger, the moments line, a chart mark). Joined phones get it in the final record.

## Code
- config.js CROWN2.guards/camp manGold 20, camp.gold 0; core/sim/neutral.js dieNeutral says 'gold'.
- ui/messages.js glory.nexus; ui/timeline.js SRC/parts/ledger/tlPack/tlAdopt (places now = total minus the rest, so a middle castle's 5 counts right); ui/hud.js capList Nexus section.

## Test
store/r_GOLD3.mjs ALL PASS; crown2sim and crown2online, roles off and on, unchanged.
