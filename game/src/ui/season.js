// Missions, seasons and what you own. Kept on this device (the online account can carry it later).
// - Missions: three a day, picked from a pool by the date; any battle counts (the computer too).
// - Seasons: about eight weeks each, numbered from the first. Battles and missions earn season stars;
//   every 250 stars is a tier, and some tiers give a cosmetic: the free track for everyone, the Gold
//   track once the season pass is bought. When a season ends each format's crowns are halved (a
//   soft reset: a fresh climb, from a head start) and the titles you reached go into your record.
// - Owned items: the wardrobe's locked pieces open from here (a feat, a season tier, the pass, the shop).
import { SLOTS } from '../core/look.js';

const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch (e) { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

// ---------- seasons ----------
export const SEASON = { epoch: Date.UTC(2026, 10, 2), days: 56, tierStars: 250, tiers: 20 };
const DAY = 864e5;
// (everything is read back from storage on use, so two tabs, or a test poking at it, stay in step)
function sync() { S = read('rally-season', S); owned = new Set(read('rally-owned', [])); feats = read('rally-feats', {}); M = read('rally-missions', M); }
export function seasonNow(now = Date.now()) {
  const k = Math.max(0, Math.floor((now - SEASON.epoch) / (SEASON.days * DAY)));
  const ends = SEASON.epoch + (k + 1) * SEASON.days * DAY;
  return { n: k + 1, daysLeft: Math.max(0, Math.ceil((ends - now) / DAY)) };
}
// the tracks: tier -> the item it gives ({slot id, item index}); a tier with no item gives gold-leaf
// bragging rights only (the bar still fills)
export const TRACK = {
  free: { 4: { slot: 'helm', item: 3 } },
  gold: { 6: { slot: 'cape', item: 3 } },
};
const blank = n => ({ n, stars: 0, pass: false, claimed: [] });
let S = read('rally-season', null);
export const season = () => { sync(); return S; };
// a new season: the old one's best titles into your record, crowns halved
export function rollSeason({ crowns, setCrowns, titleOf } = {}) {
  sync();
  const now = seasonNow();
  if (!S) { S = blank(now.n); write('rally-season', S); return null; }
  if (S.n === now.n) return null;
  const rec = read('rally-record', []);
  if (crowns) { const c = crowns(); rec.push({ season: S.n, titles: c.map(n => titleOf(n).name) }); write('rally-record', rec); setCrowns(c.map(n => Math.floor(n / 2))); }
  S = blank(now.n); write('rally-season', S);
  return rec[rec.length - 1] || null;
}
export const record = () => read('rally-record', []);
export const tierOf = stars => Math.min(SEASON.tiers, Math.floor(stars / SEASON.tierStars));
function addStars(n) {
  const before = tierOf(S.stars); S.stars += n;
  const after = tierOf(S.stars), got = [];
  for (let t = before + 1; t <= after; t++) {
    for (const track of ['free', 'gold']) { const r = TRACK[track][t]; if (r && (track === 'free' || S.pass)) { give(r.slot, r.item); got.push(itemName(r)); } }
  }
  write('rally-season', S);
  return { before, after, got };
}
// buying the pass hands over every Gold reward already passed
export function grantPass() {
  sync();
  if (S.pass) return [];
  S.pass = true; const got = [];
  for (const [t, r] of Object.entries(TRACK.gold)) if (tierOf(S.stars) >= +t) { give(r.slot, r.item); got.push(itemName(r)); }
  write('rally-season', S); return got;
}

// ---------- owned items ----------
let owned = new Set(read('rally-owned', []));
let feats = read('rally-feats', {});
const key = (slot, item) => slot + ':' + item;
export function give(slot, item) { owned = new Set(read('rally-owned', [])); owned.add(key(slot, item)); write('rally-owned', [...owned]); }
const itemName = r => { const sl = SLOTS.find(s => s.id === r.slot); return sl ? sl.items[r.item].name : '?'; };
export const featCount = k => feats[k] | 0;
// can you wear it? (no lock: always; a feat: once done enough; anything else: once it's yours)
export function owns(si, j, rankOk = () => false) {
  sync();
  const it = SLOTS[si] && SLOTS[si].items[j]; if (!it) return false;
  const L = it.lock; if (!L) return true;
  if (owned.has(key(SLOTS[si].id, j))) return true;
  if (L.feat) return featCount(L.feat) >= L.n;
  if (L.rank != null) return rankOk(L.rank);
  return false;
}
export function lockText(L) {
  if (!L) return '';
  if (L.feat) return `${L.text} (${Math.min(featCount(L.feat), L.n)}/${L.n})`;
  if (L.season != null) return `Season tier ${L.tier}`;
  if (L.pass) return `Gold track, tier ${L.tier}`;
  if (L.shop) return 'Shop';
  return '';
}

// ---------- missions ----------
// k: what counts (a battle's moments, see sim.js hl(), or 'win' / 'battle'); n: how many in one day
export const POOL = [
  { id: 'win', text: 'Win a battle', k: 'win', n: 1 },
  { id: 'play3', text: 'Fight 3 battles', k: 'battle', n: 3 },
  { id: 'capk', text: 'Cut down 3 captains', k: 'capkill', n: 3 },
  { id: 'hold', text: 'Take 4 villages or mines', k: 'hold', n: 4 },
  { id: 'castle', text: 'Take a castle', k: 'castle', n: 1 },
  { id: 'exec', text: 'Execute a captain', k: 'exec', n: 1 },
  { id: 'duel', text: 'Win a duel', k: 'duel', n: 1 },
  { id: 'crown', text: 'Carry the Crown', k: 'crown', n: 1 },
  { id: 'parry', text: 'Parry 5 blows', k: 'parry', n: 5 },
  { id: 'bash', text: 'Shield-bash 4 times', k: 'bash', n: 4 },
  { id: 'chest', text: 'Grab a war chest', k: 'chest', n: 1 },
];
export const MISSION_STARS = 60, BATTLE_STARS = 15, WIN_STARS = 25;
const today = (now = Date.now()) => Math.floor(now / DAY);
function pickDay(d) { // three different missions, the same for everyone on a given day
  let s = (d * 2654435761) >>> 0 || 1; const r = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  const ids = POOL.map(p => p.id), out = [];
  while (out.length < 3) { const i = (r() * ids.length) | 0; out.push(ids.splice(i, 1)[0]); }
  return out.map(id => ({ id, prog: 0, done: false }));
}
let M = read('rally-missions', null);
export function missions() {
  sync();
  const d = today(); if (!M || M.day !== d) { M = { day: d, list: pickDay(d) }; write('rally-missions', M); }
  return M.list.map(m => ({ ...POOL.find(p => p.id === m.id), ...m }));
}
export const resetIn = () => { const ms = (today() + 1) * DAY - Date.now(); return `${Math.floor(ms / 36e5)}h ${Math.floor(ms % 36e5 / 6e4)}m`; };

// ---------- after a battle ----------
// moments: your army's hl (sim.js); result 'win' | 'lose' | 'draw'. Returns what to tell the player.
export function afterBattle({ result, moments = {} }) {
  rollSeason(); sync();
  const counts = { ...moments, battle: 1, win: result === 'win' ? 1 : 0 };
  for (const [k, v] of Object.entries(moments)) if (k !== 'streak') feats[k] = (feats[k] | 0) + (v | 0);
  write('rally-feats', feats);
  missions(); const done = [];
  for (const m of M.list) {
    if (m.done) continue; const p = POOL.find(x => x.id === m.id);
    m.prog = Math.min(p.n, m.prog + (counts[p.k] | 0));
    if (m.prog >= p.n) { m.done = true; done.push(p.text); }
  }
  write('rally-missions', M);
  const stars = BATTLE_STARS + (result === 'win' ? WIN_STARS : 0) + done.length * MISSION_STARS;
  const t = addStars(stars);
  return { stars, done, tierUp: t.after > t.before ? t.after : 0, got: t.got };
}
