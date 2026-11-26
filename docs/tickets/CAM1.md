# CAM1 The fixed high camera

Model: O · Written by the owner 25 Nov 2026 (Arjun's review chat: "fights feel average") · Status: built (not shipped)

## What to build
Agreed with Arjun 25 Nov after a played-match review (fights unreadable: low camera blocked by towers/trees, own back fills the screen).
- Fixed high camera like Unite: never turns, base at the bottom and summit at the top for each faction (nexus to centre).
- Angle presets 45/50/55, same ground seen at each; default 50; Settings > Camera angle (Lower/Standard/Higher, kept per phone,
  `rally-cam`); `?cam=45|50|55` for testing, `?cam=old` keeps the old turning camera.
- Fights ease the camera out, never in. Close low camera only for the existing close moments (executions/finishers, death, intro).
- No camera drag or arrow-key turning in battle.
- Minimap: press to look there, drag to look round, let go: holds 1.2 s then slides back. With the shout tray open a tap is
  "Attack here!" (was: every minimap tap pinged).
- Dead: drag the screen or push the stick to move the camera, tap the minimap to jump, teammates' faces under the death card
  (tap to follow; "You" goes back). Stays where left until the respawn cut.
- Thin ring in faction colour under every champion (you stay gold).
- See-through: a dithered tube cuts scenery (towers, walls, keeps, hills) between the camera and you; trees fade on a wider line
  and within 4 m of you.
- Trees (Arjun: "reshape with this build"): pines slimmer (cones 1.55/1.1 wide, were 2.1/1.5), a little smaller (.85-1.2),
  kept 18 m from castles, 10 m from camps, 6.5 m from roads (were 14/7/4).

## Done when
`game/store/r_CAM1.mjs` (17 checks) passes; crown2sim and crown2online pass roles off and on; r_BS2 updated for the tray ping.

## Where it lives
`src/config/cam.js` (all numbers), `render/camera.js` (fixedFollow, director, camMode, camLook, setCamAngle), `ui/camlook.js`
(minimap look, death camera, faces), `render/camhole.js` (see-through tube), `render/seethrough.js` (wider tree fade),
`render/soldiers.js` (ringFor, ringC0-3), `render/world.js` (pine shape), `core/world/map26.js` (tree clearances), Settings in
`index.html` + `app/menus.js`, `render/scene.js` (fov 45 landscape / 62 portrait).

## Open questions
- Arjun to play one match at each angle on his phone and pick the default.
- Tree clearances change the blockers on the map: old and new phones must not play together (no version check yet, P0.7b).
