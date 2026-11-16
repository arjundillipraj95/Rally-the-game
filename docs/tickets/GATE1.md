# GATE1 Castle gates: health bars, and the back gate breaks

Model: O · Written by the builder 2026-11-16 from Arjun's playtest note (13:01: "it feels like the team is hitting indefinitely")
Status: built

Found: a castle's gate health had room for 3 gates, but the middle castle has 4 (MAP7's back gate). Blows on the back
gate took nothing off, forever. Now every castle carries 4 gate healths (`GATES` in `core/sim/forts.js`; repair and
fortify reset all 4). A gate that is hit shows its health bar over it (green: your side's, red: theirs), fading 6 s
after the last blow; a broken gate shows nothing (it is open). Joined phones get each gate's health (%) in the holds
snapshot and mark the blow time themselves.
`store/r_GATE1.mjs`: the middle castle's 4 gates each break (24, 16, 16, 16 blows of the player's captain), each blow
takes health off, a broken gate opens, the bar shows. crown2sim/online pass roles off and on; r_SPLIT re-baselined.
