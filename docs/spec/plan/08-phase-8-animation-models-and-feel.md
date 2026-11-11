<!-- Mirror of https://claude.ai/artifact/URoG87MpXxNALYLWS83BsM (rev 19, synced 2026-11-11). Read only: the Claude Doc decides. -->

## Phase 8: animation, models and feel

Goal: every move looks and sounds great on a phone. Today captains are a GLB body posed by code (no animation clips), soldiers are built from simple parts, and the horse's legs are swung by code. For the combat we designed, captains and soldiers need **real animation clips on one shared skeleton**, and up to about 240 soldiers need animating cheaply. This phase starts on day one, in parallel, because sourcing models takes time.

| ID | Ticket | Model | Main files | Done when |
|---|---|---|---|---|
| P8.1 | **Animation test.** Prove 240 animated soldiers at 45+ fps on a mid-range Android phone, using animation baked into textures and drawn in batches (instancing); keep today's parts as the far-distance fallback | O | new `render/anim/` | Recorded fps on a real phone, with a go or no-go |
| P8.2 | **Model pipeline.** A script that checks each GLB (scale, axis, skeleton names), retargets clips to the shared skeleton, bakes soldier clips, adds a team-colour mask, and compresses (meshopt, KTX2) into `public/models` | S | new `tools/models/` | Arjun's first GLBs pass through and load in game |
| P8.3 | **Captain animation.** Clips mixed by game state with blends; upper body separate from legs (attack while running) | S | `render/heroes.js`, `render/rig/` | Every move in the button map plays its clip |
| P8.4 | **Soldier animation.** The baked, batched approach from P8.1 for all soldier types | O | `render/soldiers.js` | Full trio battle at target fps |
| P8.5 | **Horse animation.** Walk, trot, gallop, rear, hit, fall; barding mesh | S | `render/horses.js` | Riders and horses in sync at every speed |
| P8.6 | **Effects.** One readable effect per move and ult: slash trails, shield flash, sweep arc, piercing streak, spin, cut-down shockwave, long-shot glint and trail, joust impact, testudo ring, arrow-storm sky, wedge dust, fire and burning ground, stone impacts | S | `render/effects.js` | Video of each in the effects test scene |
| P8.7 | **Impact feel.** Hit-stop (40–120 ms by weight), camera shake, ult flash, phone vibration, captain-kill slow motion (exists), damage numbers, all tuned together | S | `render/camera.js`, `render/effects.js` | Arjun signs off on feel |
| P8.8 | **Sound.** A sound per ability and ult; war cries, horns and the testudo drum on "push, push, spear" | S | `ui/audio.js`, `public/sfx` | Every move has a sound |
| P8.9 | **Performance budget.** 60 fps on mid phones, never under 30; under 150 draw calls; quality tiers extended | S | `render/quality.js` | Measured on two real phones |

### GLB list for Arjun

All models: GLB 2.0, Y-up, metres, low-poly painted style like today's, licensed for commercial use in a web game. All humans share **one skeleton** (Mixamo-compatible bone names), so every clip works on every body. A team-colour area (a vertex-colour or texture mask) lets the game paint team colours.

| Priority | Asset | Spec |
|---|---|---|
| 1 | **Captain body** | Rigged, T-pose, about 1.8 m tall, 8–12k triangles |
| 1 | **Soldier body** | Same skeleton, under 2,500 triangles, plus an 800-triangle version for distance |
| 1 | **Movement clips** | Idle, walk, run, sprint, strafe; hit light, hit heavy, stagger, knockdown and get-up, two deaths; execute (attacker and victim pair); war cry |
| 1 | **Weapon clips** | Sword 3-hit combo and boosted; spear thrust combo, brace, sweep; shield bash, shield retreat walk-back; bow draw, release, quick double, long-shot draw-hold-release; javelin throw; axe heavy two-hit and overhead chop; spin loop (2–3 s); overhead "cut down"; evade dash |
| 1 | **Riding clips** | Mount, dismount, jump-down strike, ride idle, trot, gallop; mounted sword swing; lance couch and strike (joust); unhorsed fall |
| 1 | **Army clips** | Testudo shield raise, push step, spear thrust; javelin throw from a line; archer volley |
| 2 | **Horse** | Rigged, with idle, walk, trot, gallop, rear, hit, fall; a barding (armoured) version |
| 3 | **Weapons and shields** | Sword, spear, pike, javelin, bow and longbow (string can bend), axe, lance with pennant, quiver; big shield (Defender), small round shield (Raider), kite shield |
| 3 | **Armour by upgrade** | Tunic, leather jerkin, mail, plate; plain, nasal and closed helmets |
| 4 | **Stone thrower** | A mangonel or onager with an animated throwing arm and two crew; stone and fire-pot projectiles |

Good sources: Mixamo (free clips for Mixamo-rigged bodies), Synty POLYGON packs, Quaternius (free), or a commissioned artist. Check each licence allows commercial use in a web game.
