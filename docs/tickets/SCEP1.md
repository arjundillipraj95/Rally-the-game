# SCEP1 The war chest becomes the Sceptre (tracker block 6)
Status: built 25 Nov on launch26

Design: the relic in the arena is the Sceptre, the Crown's pair, worth 5 points (was 4); warning at 4:30, "Sceptre in 30 s";
a prize only (no stat). Arjun 25 Nov: it stays broken open (250 blows), not carried.
- config.js: `CROWN2.points.chest` 5, `chestWarn` 30. Code names (`chest`) unchanged, so the wire and saves stay the same.
- Every word players see says Sceptre: messages, feed, HUD phase line and big bar, overlay, timeline, results, report, missions.
- render/mountain.js: a stone plinth, a slowly turning gold sceptre with a pulsing star-white gem, inside a six-bar iron cage;
  bars fall away as its health drops (joined phones too: they get its health).
Test: `store/r_SCEP1.mjs` (warning at 4:30 not before, lands at 5:00 in the arena, big bar "The Sceptre", 5 points to the
side that breaks it; close-up /tmp/scep1.png, copy in SCEP1.png). crown2sim and crown2online pass.
