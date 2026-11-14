# V1d Voice: a phone that waits for a call that never comes

Model: S · Written 14 Nov from the code and Arjun's two screenshots (one phone's box)
Status: built (not shipped). Step 1 only (the fix above); lobby / join-leave / carry-on-into-battle is the next card.

## What the real phones showed
Host phone (HOSTING · BLUE, co-captain), 1 minute into the battle, twice: `Mic: on · you ▮▮▮▮▮` and
`Mate 1: not calling yet`. Not one of the V1c states he expected. The other phone's box, the devices and
the networks were not sent yet.

## What "not calling yet" means in the code (`game/src/net/voice.js`)
`V.state` has no entry for the mate. Only `attach()` sets it, and `attach()` runs only (a) in `link()` when
`me < p` (the lower id calls) or (b) in `onCall()` when a call arrives. So this phone has the higher id and
no call ever arrived. Not a TURN problem: no link was even attempted. Either the other phone never called,
or it called and this phone threw the call away.

## Gaps found (every one is silent today)
1. `link()` wraps `room.voice.call()` in `try {} catch (e) {}`: a failed call start shows nothing.
2. `onCall()` closes a call from anyone not in `teammates()` with no message. Seats arrive by presence, so a
   call that beats the seats (or a seat keyed differently) is dropped for good; the caller sees
   `linking…` then `can't link` after 12 s, never retries (`state === 'failed'` blocks `link()`).
3. One direction only: if the lower-id phone never calls (mic not started, `teammates()` empty on its side,
   call dropped), the higher-id phone waits forever. Nothing says "I'm waiting for them".
4. Box shows no ids, no who-calls-whom, no signalling state (is the peer connected to the PeerJS server?),
   no ICE state or route type (host / srflx / relay), no last error, no count of calls turned away.
5. `failed` is permanent for the battle: no retry after 12 s even if seats/ICE settle later.
6. TURN: `TURN_KEY_URL` is still `''` (V1b not done). Only matters once the box says relay/can't link.

## What to build (proposal, Arjun decides)
- Box lines per teammate: `me ab12 → them cd34 (I call | they call me)`, then the state; waiting phone says
  `waiting for their call 8s`; after 8 s the waiting phone calls them itself (both directions try; if both
  call at once, keep the call from the lower id, hang the other).
- Show `signal: connected|lost`, ICE state and route (host/srflx/relay) once linked, and `turned away: n`
  plus why (`not on my side yet`) when `onCall` rejects. Log the real error from a failed `call()`.
- Retry a `failed` call every 10 s (max 3) instead of giving up.
- Test `store/r_V1d.mjs`: reproduces the failure (lower-id phone's first call is dropped, as when seats
  arrive late): before the fix the higher-id phone says `not calling yet` forever; after, it says
  `waiting for their call`, then calls itself, and sound arrives both ways.
- If the next real test says `on the relay` / `can't link`: V1b (Metered.ca) is the next card.

## Done when
`r_V1d.mjs` passes, `r_V1.mjs` still passes, crown2sim + crown2online pass roles off and on.

## Out of scope
TURN / V1b, mixing, push-to-talk, anything outside `voice.js`, the box markup and its test.

## Open questions
Phone B's box (word for word), device + browser of each, same Wi-Fi or India/US. Needed before build.
