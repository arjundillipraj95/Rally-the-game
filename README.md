# Rally!

A 3D castle battle for phones. Play solo or with up to three friends using a 4-letter battle code.

Play: https://arjundillipraj95.github.io/Rally-the-game/

## Working on the game

The source lives in `game/` (Vite + three.js):

- `game/src/core/` — the rules (state, map layouts, combat, AI). No three.js or DOM, so it can move to another engine later.
- `game/src/render/` — 3D drawing, batched so 100+ soldiers stay smooth, plus graphics quality levels.
- `game/src/ui/` — HUD, controls, sounds, messages.
- `game/src/net/` — online play (PeerJS, host runs the battle).

```
cd game
npm install
npm run dev      # local test server
npm run build    # builds and copies the game to the repo root, which GitHub Pages serves
```

Add `?stress=1` to the URL for 20-soldier squads (performance testing).
