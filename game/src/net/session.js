// Who we are online. NET is null in a solo game; otherwise {role:'host'|'client', room, name, seats, ...}.
export const session = { NET: null, myNick: '' };
try { session.myNick = localStorage.getItem('fb-nick') || ''; } catch (e) {}
export const isClient = () => !!(session.NET && session.NET.role === 'client');
export const isHost = () => !!(session.NET && session.NET.role === 'host');

// The player's own army: faction (look) and color (team), remembered on this device.
const read = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } };
export const prefs = {
  faction: read('rally-faction', 'roman'),
  color: +read('rally-color', '0') || 0,
  save() { try { localStorage.setItem('rally-faction', this.faction); localStorage.setItem('rally-color', String(this.color)); } catch (e) {} },
};
