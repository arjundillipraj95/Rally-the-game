# MENU1-4 Main menu and the Champions screen

Model: O · Arjun 18 Nov (mockup approved: https://claude.ai/artifact/QpEWL4axf2kzPokpobFPNZ), design rev 160
Status: MENU1-4 shipped to main 18 Nov (r_MENU1-4, crown2sim, crown2online pass)

## What to build
- MENU1 Portraits: one picture per champion (tile 256x200, minimap face 128, 16:9 splash). Baked from the 3D model
  (`store/bake_portraits.mjs`) or an artist's file of the same name in `public/portraits/`, `public/splash/`. Titus and
  Devi use Arjun's Nano Banana splash art (sparkle removed, 2560x1440 master kept off-repo). Used on the minimap
  faces, the lobby seats, the versus (loading) screen with your splash behind it. The online service carries each
  player's main (`ch` on hello/party/lobby/start, `m_ch`; main and backup kept on the account).
- MENU2 Champions screen (design "Lobby pick" layout): left class tabs All/Vanguard/Striker/Raider (no faction tabs:
  Arjun agreed, culture tag on each tile); middle the 9-champion roster grid (owned in colour; not owned greyed with
  lock and price; free-this-week badge; Coming soon until a champion's page exists; ★ main, B backup); right the
  selected champion on the home stage in 3D (drag to turn), stats with bars, soldiers' ▲▼, lore, skin row (Default
  plus locked Soon: the old closet doesn't dress champions with their own body), ★ Set as main / Set as backup.
- MENU3 Home: Captain button removed (closet code kept, unreachable). Your main stands centre in his skin; a tap
  opens the Champions screen on him. Left: Champions, Friends, Missions, Shop. Top: logo, rank/XP, Silver 0,
  settings. Right: Solo/Duo/Trio (party size, set by who is in your party), Play, Battle the computer, Private battle.
  "2 × Titus" note only in a party where two share a main.
- MENU4 Settings → Champion: main and backup pickers, owned only; Titus the main at the start.

## Done when
`store/r_MENU1.mjs` … `r_MENU4.mjs`, plus crown2sim and crown2online.

## Out of scope
The 60 s lobby pick (its own ticket). Real skins (the shop).
