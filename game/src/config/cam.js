// CAM1 the battle camera (Arjun 25 Nov). Settings > Camera angle picks a preset (kept per phone, 'rally-cam'); all show the same ground.
//: high, fixed, looking down at an angle like Unite. It never turns: each faction
// sees its own base at the bottom of the screen and the summit at the top. ?cam=45|50|55 picks the test preset (default 50);
// ?cam=old brings back the low follow camera that turns (to compare).
// pitch: degrees down from level; dist: metres from the look point; fov: vertical field of view in landscape (portrait: fovTall);
// ahead: the look point sits this far up-screen of the champion (m), so he stands a little below the middle with room in front.
export const CAMVIEW = {
  presets: { 45: { pitch: 45, dist: 19.5 }, 50: { pitch: 50, dist: 19 }, 55: { pitch: 55, dist: 18.5 } }, def: 50,
  fov: 45, fovTall: 62, ahead: 2.4,
  // on horseback (or wolf): a little further out, and the look point leads the way he rides (lead m at full speed, eased)
  mounted: { out: 1.1, lead: 2.4, leadK: 2.5 },
  // the director, fixed view: when champions meet it eases out (never in). fight: how far out at the biggest brawl;
  // duel: two captains face to face; ring: a called duel's ring
  fight: 1.14, duel: 1.08, ring: 1.12,
  // the close moments keep the old low camera for their length: pitch (rad) and distance (m) it swings down to
  close: { pitch: .42, dist: 7.5 },
  // looking elsewhere. glide: how fast the camera slides to a looked-at place (1/s); back: how fast it returns;
  // stay: seconds a minimap look holds after the finger lifts, before sliding back (alive)
  look: { glide: 7, back: 4.5, stay: 1.2 },
  // dead: drag the screen to move the camera (pan: metres per pixel at the default distance)
  pan: .045,
};
// the see-through tube from the camera to your champion (render/camhole.js): r m wide at his end; min: how much of a cut
// wall still shows as dither (0 none); chest: where the tube ends on him (m above his feet); feet: nothing below this is cut
export const HOLE = { r: 3.4, min: .12, chest: 1.2, feet: .5 };
// trees (render/seethrough.js), fixed camera: the line test is wider (pad m), and any tree within near m of him fades too
export const TREEFADE = { pad: 1.4, near: 4 };
