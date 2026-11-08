// The side feed: a short running log, under the minimap, of what is happening across the whole field
// ("Red cut down Blue", "Green took Old Mill"). Banners are for what concerns you; this is for everything,
// so you can read the battle at a glance. Built from the same announcements on every phone.
import { TEAMS, SHOUTS, CALM } from '../config.js';
import { G, bus, colorOf, isEnemyTi, matchTime } from '../core/state.js';
import { c2Tier, c2On } from './messages.js';

let el = null, nickFor = () => null;
const MAX = 4, LIFE = 7000;
export function initFeed(opts) { el = document.getElementById('feed'); if (opts && opts.nickFor) nickFor = opts.nickFor; }
export function clearFeed() { if (el) el.innerHTML = ''; firstBlood = false; capKills = {}; lastMinute = false; heraldAt = 0; }

// ---------- the herald: a commentator for the big beats, funny rather than epic ----------
let firstBlood = false, capKills = {}, lastMinute = false, heraldAt = 0;
const pickOne = a => a[(Math.random() * a.length) | 0];
const HERALD = {
  start: ['Gentlemen, please do not die before the trumpet.', 'Remember: the pointy end goes in the other fellow.', 'May the best captain win. Or the luckiest.', 'Today\'s weather: overcast, with a chance of arrows.', 'No refunds.'],
  first: ['First blood! Somebody\'s mother will hear about this.', 'And we\'re off! One captain already regrets everything.', 'First blood! The crowd goes mild.'],
  castle: ['A castle falls. The estate agents weep.', 'There goes the neighbourhood.', 'That castle had a lovely garden, too.', 'Under new management!'],
  chestSoon: ['A war chest approaches. Greed, everyone! Greed!', 'Gold incoming. Try not to trample each other. Actually, do.'],
  chest: ['The war chest is claimed. Accountants everywhere rejoice.', 'Somebody just got very rich, very quickly.'],
  duel: ['A duel decided! Songs will be sung. Badly.', 'Honour satisfied, one captain slightly flattened.'],
  spree: ['is on a rampage! Somebody stop him. Anybody.', 'is collecting captains like stamps.', 'has clearly done this before.'],
  last: ['One minute left! Whatever you were saving it for, now\'s the time.', 'Final minute! Heroes are made now. So are excuses.'],
  stand: ['A last stand! Bards love a last stand.', 'Backs to the wall! Literally.'],
  crownTaken: ['has the Crown. Everyone else has a new hobby: chasing them.', 'wears the Crown. It suits them. For now.'],
};
function herald(text) {
  if (!el || G.state !== 'play') return;
  const now = performance.now(); if (now - heraldAt < (G.mode === 'crown' ? CALM.heraldGap : 2500)) return; heraldAt = now;
  const li = document.createElement('div'); li.className = 'fl herald'; li.innerHTML = '\u{1F4EF} ' + text;
  el.prepend(li);
  while (el.children.length > MAX) el.lastChild.remove();
  setTimeout(() => { li.classList.add('old'); setTimeout(() => li.remove(), 600); }, LIFE + 2000);
}
function heraldFor(k, a) {
  if (G.mode === 'crown' && !CALM.herald.has(k)) return;
  if (k === 'start') return herald(pickOne(HERALD.start));
  if (k === 'capDown') {
    if (!firstBlood) { firstBlood = true; return herald(pickOne(HERALD.first)); }
    const by = a[1]; if (by == null || by < 0 || by === a[0]) return;
    capKills[by] = (capKills[by] || 0) + 1;
    if (capKills[by] === 3 || capKills[by] === 6) return herald(by === G.myTi ? 'You are on a rampage! Somebody stop you. Anybody.' : `${who(by)} ${pickOne(HERALD.spree)}`);
    return;
  }
  if (k === 'castleDown') return herald(pickOne(HERALD.castle));
  if (k === 'chestSoon') return herald(pickOne(HERALD.chestSoon));
  if (k === 'chestTaken') return herald(pickOne(HERALD.chest));
  if (k === 'duelWon') return herald(pickOne(HERALD.duel));
  if (k === 'lastStand') return herald(pickOne(HERALD.stand));
  if (k === 'crownTaken') return herald(a[0] === G.myTi ? 'You have the Crown. Run. Run like the wind.' : `${who(a[0])} ${pickOne(HERALD.crownTaken)}`);
}
// called with the HUD: the final minute
export function feedTick() {
  if (G.state !== 'play' || lastMinute) return;
  const left = matchTime() - G.T; if (left <= 60 && left > 50) { lastMinute = true; herald(pickOne(HERALD.last)); }
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// a captain's name in his colour: "You" for you, the player's nickname online, else the colour
function who(ti) {
  if (ti == null || ti < 0) return '?';
  const c = colorOf(ti), t = TEAMS[c]; if (!t) return '?';
  const nm = ti === G.myTi ? 'You' : (nickFor(ti) || t.name);
  return `<b style="color:${t.css}">${esc(nm)}</b>`;
}
function side(a) { // an alliance: its colours joined
  const ts = TEAMS.map((t, i) => [t, i]).filter(([, i]) => G.ALLY[i] === a);
  if (ts.some(([, i]) => i === colorOf(G.myTi))) return '<b style="color:var(--gold)">Your side</b>';
  return ts.map(([t, i]) => `<b style="color:${t.css}">${esc(nickFor(i) || t.name)}</b>`).join(' & ') || '?';
}
const place = id => esc((G.holds && G.holds[id] && G.holds[id].name) || 'a village');

export function feedLine(k, a) {
  switch (k) {
    case 'c2capPoint': { const cap = G.teams[a[0]] && G.teams[a[0]].leader && (a[2] || 1) > 1; return cap ? `${who(a[0])} cut down ${who(a[1])} <i>+${a[2]}</i>` : `${who(a[0])}'s men got ${who(a[1])} first <i>+${a[2] || 1}</i>`; }
    case 'capDown': return a[1] != null && a[1] >= 0 && a[1] !== a[0] ? `${who(a[1])} cut down ${who(a[0])}` : `${who(a[0])} fell`;
    case 'castleDown': return `${who(a[0])}'s castle fell${a[1] != null && a[1] >= 0 ? ` to ${who(a[1])}` : ''}`;
    case 'holdTaken': return `${side(a[0])} took ${place(a[2])}`;
    case 'chestTaken': return `${side(a[0])} grabbed the war chest`;
    case 'chestUp': return `The war chest landed at ${place(a[0])}`;
    case 'breach': return `${who(a[1])} breached ${who(a[0])}'s palisade`;
    case 'gateBroken': return `${who(a[1])} broke ${who(a[0])}'s gate`;
    case 'gateRepaired': return `${who(a[0])} mended the gate`;
    case 'lastStand': return `${who(a[0])} makes a last stand`;
    case 'fortUp': return `${who(a[0])} ${a[1] >= 2 ? 'built gate towers' : 'built a palisade'}`;
    case 'rout': return `${who(a[0])}'s army broke and ran`;
    case 'duelOn': return `${who(a[0])} and ${who(a[1])} duel`;
    case 'duelWon': return `${who(a[0])} won the duel against ${who(a[1])}`;
    case 'duelDraw': return `${who(a[0])} and ${who(a[1])} drew`;
    case 'duelNo': return `${who(a[0])} chickened out of a duel`;
    case 'duelBroken': return `${who(a[0])} barged into a duel. Shameful`;
    case 'bounty': return `Bounty on ${who(a[0])}`;
    case 'bountyClaimed': return `${who(a[0])} claimed the bounty`;
    case 'flagTaken': return `${who(a[0])} has the banner`;
    case 'capture': return `${who(a[0])} brought the banner home`;
    case 'pointCaptured': return `${who(a[0])} took Point ${esc(a[1])}`;
    case 'tickets0': return `${who(a[0])} is out of tickets`;
    case 'lmsRing': return 'The ring closes: no more coming back';
    case 'crownTaken': return `${who(a[0])} grabbed the Crown`;
    case 'towerUp': return `${who(a[0])} built a watchtower`;
    case 'towerDown': return a[1] >= 0 ? `${who(a[1])} hacked down ${who(a[0])}'s watchtower` : `${who(a[0])}'s watchtower fell`;
    case 'plazaGate': return `${who(a[1])} broke a plaza gate`;
    case 'castleFort': return `${who(a[0])} fortified ${esc((G.holds && G.holds[a[1]] && G.holds[a[1]].name) || 'a castle')}`;
    case 'castleGate': return `${who(a[1])} broke ${esc((G.holds && G.holds[a[2]] && G.holds[a[2]].name) || 'a castle')}'s ${a[3] ? 'side gate' : 'main gate'}`;
    case 'newHost': return `${who(a[0])} took over hosting`;
    case 'idle': return `${who(a[0])} went idle; the computer leads for now`;
    case 'back': return `${who(a[0])} ${a[0] === G.myTi ? 'are' : 'is'} back`;
    case 'callout': return isEnemyTi(a[0], G.myTi) || a[0] === G.myTi ? null : `${who(a[0])}: “${esc(SHOUTS[a[1]] || '')}”`;
    case 'joined': return `${who(a[0])} joined the battle`;
    case 'left': return `${who(a[0])} left; the computer takes over`;
    case 'armourOn': return isEnemyTi(a[0], G.myTi) ? `${who(a[0])} put on armour` : null;
  }
  return null;
}

bus.on('shownMsg', ({ k, a }) => {
  if (!el) return;
  if (k === 'start') { setTimeout(() => heraldFor('start', []), 1200); return; }
  if (G.state !== 'play') return;
  if (c2On()) return c2Feed(k, a || []);
  setTimeout(() => heraldFor(k, a || []), 900);
  if (G.mode === 'crown' && CALM.quiet.has(k)) return; // (the Crown's feed: the moves that matter)
  const html = feedLine(k, a || []); if (!html) return;
  const li = document.createElement('div'); li.className = 'fl'; li.innerHTML = html;
  el.prepend(li);
  while (el.children.length > MAX) el.lastChild.remove();
  setTimeout(() => { li.classList.add('old'); setTimeout(() => li.remove(), 600); }, LIFE);
});

// the mountain: the herald only for the match's beats; the feed only for your side's news, a line
// at most every 5 s (the same news within that merges into the last line, anything else waits out),
// and nothing that's said repeats within 30 s
let t2 = null; const said = {};
const c2HeraldLines = { c2chestSoon: () => pickOne(HERALD.chestSoon), chestTaken: () => pickOne(HERALD.chest), c2night: () => 'Night falls. The Crown awakens. Captains, up the mountain!', c2crack: () => 'The glacier is cracking. Thirty seconds, gentlemen.', crownTaken: a => `${who(a[0])} broke the glacier and took the Crown!` };
function c2Feed(k, a) {
  const tier = c2Tier(k, a), now = performance.now();
  if (tier === 1) { const f = c2HeraldLines[k]; if (f) setTimeout(() => herald(f(a)), 900); return; }
  if (tier !== 2) return;
  const html = feedLine(k, a); if (!html) return;
  if (said[html] && now - said[html] < 30000) return; said[html] = now;
  if (t2 && now - t2.t < 5000) { if (t2.k === k && t2.li.isConnected) { t2.n++; t2.li.innerHTML = html === t2.html ? `${html} <i>×${t2.n}</i>` : `${html} <i>+${t2.n - 1} more</i>`; t2.html = html; } return; }
  const li = document.createElement('div'); li.className = 'fl'; li.innerHTML = html;
  el.prepend(li); while (el.children.length > MAX) el.lastChild.remove();
  setTimeout(() => { li.classList.add('old'); setTimeout(() => li.remove(), 600); }, LIFE);
  t2 = { k, t: now, li, html, n: 1 };
}
