# ORD1 Soldiers ordered onto a gate, a nexus, the war chest

Model: O · Arjun 16 Nov ("let ordering a soldier be allowed to target gates, nexus, war chest, etc")
Status: built on launch26 (not shipped)

## What to build
The attack order (hold the order button and drag) already works on enemy men. Dragged onto an enemy castle's unbroken
gate, a nexus (not your own), the war chest or the glacier, it becomes an attack order on that: the foot soldiers walk
right up to it and strike it (the strike rules in core/sim/step.js: gates, breakables); archers go with them. Joined
phones send it as today's focus order (id 0).

## Done when
`store/r_ORD1.mjs`: the aim picks a gate / a nexus near the finger, not my own nexus; ordered at an enemy gate, my
footmen walk to it and its health drops; at an open nexus, its health drops. Regression set.
