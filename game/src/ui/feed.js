// The side feed: a short running log, under the minimap, of what is happening across the whole field
// ("Red cut down Blue", "Green took Old Mill"). Banners are for what concerns you; this is for everything,
// so you can read the battle at a glance. Built from the same announcements on every phone.
import { TEAMS } from '../config.js';
import { G, bus, colorOf, isEnemyTi, matchTime } from '../core/state.js';

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
  go: ['And they\'re off! Like a herd of very angry goats.', 'Run, you fools! The good castles go first.', 'Gentlemen, the trumpet. Please run.'],
  siege: ['Siege time. Somebody\'s walls are about to have a bad day.', 'The castles are open season. Lock your doors.'],
  rise: ['The Crown rises! Everybody suddenly loves the plaza.', 'Behold: the shiniest hat in the land.'],
  crownTaken: ['has the Crown. Everyone else has a new hobby: chasing them.', 'wears the Crown. It suits them. For now.'],
  crownDropped: ['dropped the Crown. Butterfingers!', 'lost the Crown. It was nice while it lasted.'],
  ring: ['The ring is closing. Personal space is about to become a luxury.', 'No more second chances. Not that you used the first ones well.'],
  champ: ['Two captains left. Everyone else, take a seat.', 'The Champions\' Duel! Bets are now closed.'],
  overtime: ['Overtime! Nobody leaves until this is settled.', 'Overtime! The bards are taking notes.'],
};
function herald(text) {
  if (!el || G.state !== 'play') return;
  const now = performance.now(); if (now - heraldAt < 2500) return; heraldAt = now;
  const li = document.createElement('div'); li.className = 'fl herald'; li.innerHTML = '\u{1F4EF} ' + text;
  el.prepend(li);
  while (el.children.length > MAX) el.lastChild.remove();
  setTimeout(() => { li.classList.add('old'); setTimeout(() => li.remove(), 600); }, LIFE + 2000);
}
function heraldFor(k, a) {
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
  if (k === 'crownGo') return herald(pickOne(HERALD.go));
  if (k === 'crownSiege') return herald(pickOne(HERALD.siege));
  if (k === 'crownRise') return herald(pickOne(HERALD.rise));
  if (k === 'crownTaken') return herald(a[0] === G.myTi ? 'You have the Crown. Run. Run like the wind.' : `${who(a[0])} ${pickOne(HERALD.crownTaken)}`);
  if (k === 'crownDropped') return herald(a[0] === G.myTi ? 'You dropped the Crown. Butterfingers!' : `${who(a[0])} ${pickOne(HERALD.crownDropped)}`);
  if (k === 'lmsRing') return herald(pickOne(HERALD.ring));
  if (k === 'champions') return herald(pickOne(HERALD.champ));
  if (k === 'overtime') return herald(pickOne(HERALD.overtime));
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
    case 'crownRise': return 'The Crown rises in the plaza';
    case 'lmsRing': return 'The ring closes: no more coming back';
    case 'champions': return `Champions' Duel: ${who(a[0])} against ${who(a[1])}`;
    case 'crownFree': return 'The Crown is free';
    case 'crownTaken': return `${who(a[0])} grabbed the Crown`;
    case 'crownDropped': return `${who(a[0])} dropped the Crown`;
    case 'crownSiege': return 'The siege begins';
    case 'towerUp': return `${who(a[0])} built a watchtower`;
    case 'towerDown': return a[1] >= 0 ? `${who(a[1])} hacked down ${who(a[0])}'s watchtower` : `${who(a[0])}'s watchtower fell`;
    case 'plazaGate': return `${who(a[1])} broke a plaza gate`;
    case 'castleFort': return `${who(a[0])} fortified ${esc((G.holds && G.holds[a[1]] && G.holds[a[1]].name) || 'a castle')}`;
    case 'castleGate': return `${who(a[1])} broke ${esc((G.holds && G.holds[a[2]] && G.holds[a[2]].name) || 'a castle')}'s ${a[3] ? 'side gate' : 'main gate'}`;
    case 'newHost': return `${who(a[0])} took over hosting`;
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
  setTimeout(() => heraldFor(k, a || []), 900);
  const html = feedLine(k, a || []); if (!html) return;
  const li = document.createElement('div'); li.className = 'fl'; li.innerHTML = html;
  el.prepend(li);
  while (el.children.length > MAX) el.lastChild.remove();
  setTimeout(() => { li.classList.add('old'); setTimeout(() => li.remove(), 600); }, LIFE);
});
