# AUD1 Three sound bars and the dip while a teammate talks

Model: S 5.5 · Written with Arjun 26 Nov ("sound and music is very loud"; on Android everything got louder with the mic on) · Status: built on t/AUD1, not shipped

## What was built
- Settings and the pause menu: three bars, Music (starts 20%), Effects (35%), Team voice (80%). They replace Sound Low/Medium/High and Music On/Off. Kept per phone (`rally-bar-music|fx|voice`); old Low/High and Music Off carry over.
- Numbers in `config/sound.js` (BARS, DUCK); values and "who is talking" in `ui/levels.js`; sliders in `ui/soundbars.js`.
- audio.js: effects go through their own bus (dry and reverb), music/drone/heartbeat through the music bus.
- Team voice bar sets teammates' voices only (`net/voice.js`).
- While a teammate speaks (checked 4x a second from the call's audio level) music dips to 30% and effects to 75%, back after 0.5 s of quiet.
- `?aec=off` opens the mic without echo cancellation, to test whether the phone's call mode is what makes things louder.

## Check
`store/r_AUD1.mjs`, `r_FIX2.mjs` (reshaped), r_CAM1, r_BS2, crown2sim pass. Phone loudness with the mic on can only be judged on the phone: try the same match with and without `?aec=off`.
