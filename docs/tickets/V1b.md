# V1b Voice for phones that can't link directly: a private TURN relay

Model: S (Opus review before shipping) · Written 14 Nov from the code
Status: built (not shipped). Live only after Arjun's 3 steps and a ship (the online service deploys from `main`).

## What was found
The game already tries STUN + two public relays (Open Relay, freeturn.net) when a direct link fails. Those are best effort and shared.
`TURN_KEY_URL` was empty, so there was no private relay. PeerJS uses the same list for the game link and for voice calls.

## What was built
- `online/src/turn.js` + `GET /turn` in the worker: with secrets `METERED_APP` and `METERED_SECRET_KEY` it creates a 4 h Metered
  credential (key never leaves the worker), answers the list of relay addresses, reused for 1 h (Cache API + browser cache).
  Without the secrets it answers `[]`.
- `game/src/net/p2p.js` `iceServers()`: asks `<online url>/turn`; if it gets relays it uses only those; else the public ones as before.
  Asked again each hour (credentials last 4 h).
- `.github/workflows/online.yml`: hands the two secrets to the worker after deploy when they exist; a notice when they don't.
- `store/r_V1b.mjs`: stand-in for Metered + second worker: list shape, key stays server side, one credential shared, game uses it,
  no secrets = public relays.

## Arjun's three steps (he does these; nothing is pasted in chat)
1. Sign up at metered.ca (free tier, 20 GB a month, no card).
2. In Metered: Dashboard > Developers: note the app name (the part before `.metered.live`) and the Secret key.
3. In GitHub, repo Rally-the-game > Settings > Secrets and variables > Actions > New repository secret: `METERED_APP` (the app name)
   and `METERED_SECRET_KEY` (the key). Then say "ship": main deploys the worker and sets them. (After ship, Actions > "Deploy online service" > Run workflow also works.)

## Known limits
- Anyone who knows the worker address can ask `/turn` and use the relay for up to 4 h (free tier cap 20 GB). Fine for now; watch usage.
- A new Metered credential can take up to 2 minutes to work everywhere: the first phones after a refresh may use the public relays.

## Done when
`r_V1b.mjs` passes; crown2sim/online pass roles off and on. Real check: two phones on different networks, box says "via relay" and hears.
