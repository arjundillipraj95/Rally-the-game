// Ranks: crowns, one count for each format (Solo, Duo, Trio), won and lost in online Crown battles.
// Squire to King. A win is worth most, but a good battle on the losing side still earns a little and a
// poor one on the winning side gains less: your rating moves it too. Kept on the phone and with your
// online account (so a new phone keeps them).
export const TITLES = [[0, 'Squire'], [100, 'Knight'], [250, 'Baron'], [450, 'Earl'], [700, 'Duke'], [1000, 'King']];
export const FMT_NAME = ['Solo', 'Duo', 'Trio'];
const KEY = 'rally-crowns';
export function crowns() { try { const v = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(v) && v.length === 3) return v.map(n => Math.max(0, n | 0)); } catch (e) {} return [0, 0, 0]; }
function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
// the account's crowns from the server win if they're higher (a new phone, or a cleared browser)
export function mergeCrowns(server) { if (!Array.isArray(server)) return crowns(); const v = crowns().map((n, i) => Math.max(n, server[i] | 0)); save(v); return v; }
export function titleOf(n) { let t = TITLES[0]; for (const x of TITLES) if (n >= x[0]) t = x; const i = TITLES.indexOf(t), next = TITLES[i + 1]; return { name: t[1], next: next ? next[1] : null, toNext: next ? next[0] - n : 0, floor: t[0] }; }
// after a battle: win +25, a draw +5, a loss -12, and the rating adds or takes up to 20 more; a title,
// once reached, isn't lost (you can't fall below its floor)
export function award(fmt, result, rating) {
  const v = crowns(), before = v[fmt], floor = titleOf(before).floor;
  const delta = Math.round((result === 'win' ? 25 : result === 'draw' ? 5 : -12) + (rating - 5.5) * 4);
  v[fmt] = Math.max(floor, before + delta); save(v);
  return { before, after: v[fmt], delta: v[fmt] - before, up: titleOf(v[fmt]).name !== titleOf(before).name ? titleOf(v[fmt]).name : null, all: v };
}
