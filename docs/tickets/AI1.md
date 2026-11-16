# AI1: the glacier stall, and a purpose
Status: done (launch26)

Arjun (07:22): "fix that or make him protect, he needs to have a purpose".
- A computer captain holding javelins at the glacier or chest switches to his sword to strike it.
- If his blows do nothing for 6 s, he turns guard for 20 s: hunts the nearest enemy captain (120 m), then goes back to his plan.
- Code: `breakWatch`/`swordUp` in core/sim/step.js; the guard hold at the top of `planLeader` in core/sim/ai.js.
- Done when: store/r_AI1.mjs passes (strikes with sword; turns guard when his blows do nothing).
