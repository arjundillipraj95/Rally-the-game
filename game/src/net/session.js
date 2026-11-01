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
  time: [5, 10, 15].includes(+read('rally-time', '10')) ? +read('rally-time', '10') : 10,
  tgt: (() => { try { return JSON.parse(read('rally-targets', '{}')) || {}; } catch (e) { return {}; } })(), // (each mode's last target)
  save() { try { localStorage.setItem('rally-faction', this.faction); localStorage.setItem('rally-color', String(this.color)); localStorage.setItem('rally-time', String(this.time)); localStorage.setItem('rally-targets', JSON.stringify(this.tgt)); } catch (e) {} },
};
