# NET1: bush reveal on joined phones
Status: done (launch26)

Arjun (07:22): "Can we do anything about this" (an enemy striking from a bush stayed hidden on a joined phone).
- The host already knew (`u.atkT`); joined phones only had the swing animation.
- Now the host sets bit 30 of a man's unit flags while he's in a bush and struck within `CROWN26.bush.reveal` s; the joined phone reads it as `u.netSeen` and `bushHid` shows him.
- Code: net/netgame.js (send, read), core/sim/bush.js.
- Test: store/r_NET1.mjs (online, needs the servers): an enemy held in a bush is seen while striking, hidden when quiet. Fails without the fix.
