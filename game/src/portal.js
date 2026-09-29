// Games-site hooks (CrazyGames SDK v3). Everywhere else, and whenever the SDK can't load, every call
// here is a harmless no-op, so the game never depends on it.
//
// Docs: https://docs.crazygames.com/sdk/intro/  (game events, video ads, settings)
// - loadingStart/Stop around the first load; gameplayStart when a battle starts, gameplayStop when
//   it ends or you go back to the menu; happytime on a victory (sparingly).
// - Ads: a new game goes out on a "Basic Launch", where ads are NOT allowed. ADS_ENABLED stays false
//   until CrazyGames moves Rally to a full launch; the midgame ad slot between battles is wired so
//   flipping it is the only change needed. During an ad the game is muted and paused.
// - The site handles fullscreen itself, so the game's own fullscreen request is skipped there.

// (dev builds can force ads on with ?ads=1 to test the pause/mute path; production is always off)
export const ADS_ENABLED = !!import.meta.env.DEV && new URLSearchParams(location.search).get('ads') === '1';
const SDK_URL = 'https://sdk.crazygames.com/crazygames-sdk-v3.js';

let sdk = null, env = 'none', siteMuted = false, hooks = { mute() {}, pause() {} };
export const portalEnv = () => env;
export const onPortal = () => env === 'crazygames';
export const portalActive = () => !!sdk;

// Only reach out for the SDK when we're plausibly on the site (embedded in a frame, or a
// crazygames domain), or when testing with ?portal=1 on localhost.
function wanted() {
  const q = new URLSearchParams(location.search);
  if (q.get('portal') === '1') return true;
  let framed = false; try { framed = window.top !== window.self; } catch (e) { framed = true; }
  return framed || /(^|\.)crazygames\./.test(location.hostname);
}
function loadScript() {
  return new Promise((res, rej) => { const s = document.createElement('script'); s.src = SDK_URL; s.async = true; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
}
// hooks: { mute(bool), pause(bool) } so ads (and the site's mute setting) can silence/freeze the game
export async function portalInit(h) {
  hooks = Object.assign(hooks, h);
  if (!wanted()) return;
  try {
    await loadScript();
    const S = window.CrazyGames && window.CrazyGames.SDK; if (!S) return;
    await S.init();
    env = S.environment;
    if (env !== 'crazygames' && env !== 'local') return; // 'disabled' elsewhere: calls would throw
    sdk = S;
    // the site's own mute toggle
    const apply = () => { try { siteMuted = !!(sdk.game.settings && sdk.game.settings.muteAudio); hooks.mute(siteMuted); } catch (e) {} };
    apply(); try { sdk.game.addSettingsChangeListener(apply); } catch (e) {}
  } catch (e) { sdk = null; }
}
const call = fn => { if (!sdk) return; try { fn(sdk); } catch (e) {} };
export const portal = {
  loadingStart: () => call(s => s.game.loadingStart()),
  loadingStop: () => call(s => s.game.loadingStop()),
  gameplayStart: () => call(s => s.game.gameplayStart()),
  gameplayStop: () => call(s => s.game.gameplayStop()),
  happytime: () => call(s => s.game.happytime()),
  // Between battles. `done` always runs exactly once: straight away when ads are off or unavailable,
  // otherwise after the ad finishes or fails. The game is muted and paused while it plays.
  midgameAd(done) {
    let fired = false; const finish = () => { if (fired) return; fired = true; hooks.pause(false); hooks.mute(siteMuted); done(); };
    if (!ADS_ENABLED || !sdk) { finish(); return; }
    try {
      sdk.ad.requestAd('midgame', {
        adStarted: () => { hooks.mute(true); hooks.pause(true); },
        adFinished: finish,
        adError: finish,
      });
    } catch (e) { finish(); }
  },
};
