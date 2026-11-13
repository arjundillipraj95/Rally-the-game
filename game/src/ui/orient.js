// F15: always landscape and full screen on phones.
// - Android: the first tap anywhere takes the game full screen and locks it sideways, whatever way the player came in.
//   Anything that drops full screen later (the mic prompt, a swipe from the edge) is undone by the next tap.
// - In portrait during a battle: a "Turn your phone" screen. The battle keeps running underneath.
// - iPhone: websites can't lock the screen or (on iPhone) go full screen: same turn screen plus an Add to Home Screen hint.
// - Android: an Install button once the browser offers it (the manifest is already there).
const ua = navigator.userAgent || '';
export const isIOS = /iP(hone|ad|od)/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const standalone = () => navigator.standalone === true || matchMedia('(display-mode: fullscreen)').matches || matchMedia('(display-mode: standalone)').matches;
let deferred = null;

export function initOrient({ G, onPortal, coarse }) {
  const turn = document.getElementById('turnPhone'), hint = document.getElementById('turnIOS'), install = document.querySelectorAll('.installBtn');
  const portrait = () => matchMedia('(orientation: portrait)').matches;
  if (!coarse || onPortal()) return;

  // --- full screen + sideways lock ---
  const el = document.documentElement, req = el.requestFullscreen || el.webkitRequestFullscreen;
  const lock = () => { try { screen.orientation.lock('landscape').catch(() => {}); } catch (e) {} };
  function enter() {
    if (isIOS || standalone() || !req) return; // (iPhone: not allowed; an installed app is already full screen)
    if (document.fullscreenElement || document.webkitFullscreenElement) { lock(); return; }
    try { const p = req.call(el, { navigationUI: 'hide' }); if (p && p.then) p.then(lock).catch(() => {}); } catch (e) {}
  }
  // a tap that ends is a user gesture the browser accepts; this catches the first tap on any screen and every tap after full screen was lost
  document.addEventListener('pointerup', enter, { capture: true, passive: true });
  document.addEventListener('click', enter, { capture: true, passive: true });

  // --- the turn screen ---
  if (hint) hint.hidden = !(isIOS && !standalone());
  function sync() {
    if (!turn) return;
    const inBattle = G.state === 'intro' || G.state === 'play';
    turn.hidden = !(portrait() && inBattle);
  }
  addEventListener('resize', sync); addEventListener('orientationchange', sync);
  matchMedia('(orientation: portrait)').addEventListener?.('change', sync);
  setInterval(sync, 400); // (the battle's state changes from many places; a cheap check beats hooking each)
  sync();

  // --- Install (Android / Chrome) ---
  const showInstall = v => install.forEach(b => { b.hidden = !v; });
  showInstall(false);
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; if (!standalone()) showInstall(true); });
  addEventListener('appinstalled', () => { deferred = null; showInstall(false); });
  install.forEach(b => b.addEventListener('click', async () => {
    if (!deferred) return;
    const d = deferred; deferred = null; showInstall(false);
    try { await d.prompt(); await d.userChoice; } catch (e) {}
  }));
}
