# BS1 The battle screen
Status: built 18 Nov (r_BS, shot_BS)

Agreed with Arjun 18 Nov (design doc "Battle screen (agreed 18 Nov)", mockup in the design canvas). On for a
champion with specials (`body.bs`); others keep the old pad.
- Right thumb: Attack in the corner, Special 1 left, Special 2 above, the ult on top with a charge ring; each with
  a small icon. No Block or Evade buttons: in a duel Special 1 is Block (held), Special 2 is Evade.
- Bottom row, no tray: army count and split, Recruit, Upgrade, Ride (middle), Follow, the army ult (replaces
  Volley) with the horn bar: tap sounds it the way you face, drag places it, back on the button cancels.
- Fortify: one button while you stand in a castle you hold. Upgrade popup: small, see-through, one button per soldier
  type (its next tier), Armour, the Crown's watchtower.
- Top: minimap left with each captain's initial; sides' circles and clock in the middle, tap the clock for the points;
  gold, quick chat, voice, menu right.
- Settings: "Specials aim at" Champions first (default) / Nearest.
Code: `ui/battle.css`, `ui/battlehud.js`, `ui/input.js`, `render/overlay.js` (faces), `champions/blocks.js` (target).
Not done: pings on the minimap and a quick-chat wheel (today's shout tray stays).
