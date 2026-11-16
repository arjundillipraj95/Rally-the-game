# HUD1: the buff on the HUD; a mini captain you can tell apart
Status: done (launch26)

- Your side's buff (from a buff camp's mini captain) shows under the phase tag: "War drum · +15% damage · 60s" in the drum's red, "Swift · +15% speed · 30s" in swift's blue; gone when it ends. Numbers from `CROWN26.buffs`.
- A buff camp's mini captain is captain-sized, his health bar always shows (captain width), with WAR DRUM or SWIFT over it in its colour.
- Code: ui/hud.js, index.html, style.css (#buffTag); render/overlay.js, render/soldiers.js.
- Test: store/r_HUD1.mjs (tag shows, changes, goes; 8 mini captains; screenshot /tmp/hud1_boss.png).
