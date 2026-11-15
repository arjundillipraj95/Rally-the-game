// CL2 Focus the map: the Mountain (the Crown) is the live map. The other maps, and the modes only played on them,
// stay in the code but are hidden from every menu unless the address has ?maps=all (dev). Anything that would pick
// a hidden one (an old default, Quick, a lobby) falls back to the Crown on the Mountain.
let all = false;
try { all = new URLSearchParams(location.search).get('maps') === 'all'; } catch (e) { /* (no address: focused) */ }
export const ALL_MAPS = all;
export const liveMode = m => (ALL_MAPS ? m : 'crown');
// the home sheet and the lobby: only the Crown's button, no map picker
export function focusMenus($) {
  if (ALL_MAPS) return;
  for (const id of ['segMode', 'lobbyMode']) { const s = $(id); if (s) s.querySelectorAll('button').forEach(b => { b.hidden = b.dataset.v !== 'crown'; }); }
  for (const id of ['segMap', 'lobbyMap']) { const s = $(id), g = s && s.closest('.grp'); if (g) g.hidden = true; }
}
