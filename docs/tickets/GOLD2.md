# GOLD2 + HEAL1 + BAR1 + SIGART (Arjun 25 Nov, his go)
Status: built 25 Nov on launch26, waiting for ship

- GOLD2 kill gold (`KILLGOLD` in config.js): a champion 50 (was 25); a soldier 20 when your champion lands the blow,
  8 when your soldiers do (was 8); an enemy champion's mount (horse, or Sigrun's wolf) 20 (was 0), to whoever struck it
  last within 4 s (`horseDamage(r, dmg, by)` in army.js; callers pass the attacker).
- HEAL1 castle healing (`CASTLE26.hold`): every second (was 3 s), champions +20, soldiers +10 (was +8 everyone), a green
  "+20" floats over each healed champion (joined phones draw it too: netgame `clientTick` runs holdingTick for show).
- BAR1 health bars (render/overlay.js `healthBar`): like the gates': dark backing, green yours / red theirs, a tick every
  100 health, white edge; armour is a grey block past the health; a mounted champion's bar sits above the rider with his
  mount's health (brown) under it. Every champion's mount and armour health now goes to joined phones (snapshot section 16).
- SIGART: Sigrun's grid portrait and minimap face cut from her 2D splash art (were baked from her 3D model).
Test: `store/r_BAR1.mjs` (each gold rule, 2 s of healing: champion +40 soldier +20, a close-up /tmp/bar1.png).
