# SPD1: one champion speed
Status: done (launch26)

Arjun (07:22): champion speed as an average; show speed on and off a mount.
- Was: your captain 6.3 m/s, the computer's 5.4; mounted x1.8 (yours .8-1.15 more with the gallop).
- Now: every captain 6.2 m/s on foot (`CAPTAIN_SPD.foot`), x1.8 on a horse (`CAPTAIN_SPD.mount`, +5% per horse upgrade). 6.2, not the plain average 5.85, keeps the map's walk times (border 8-10 s, base to Crown 25-30 s).
- The Ride button shows the speed above it: 6.2 m/s on foot, 11.2 m/s mounted.
- Done when: store/r_SPD1.mjs passes; r_MAP1 walk times hold.
