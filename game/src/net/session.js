// Who we are online. NET is null in a solo game; otherwise {role:'host'|'client', room, name, seats, ...}.
export const session = { NET: null, myNick: '' };
try { session.myNick = localStorage.getItem('fb-nick') || ''; } catch (e) {}
export const isClient = () => !!(session.NET && session.NET.role === 'client');
export const isHost = () => !!(session.NET && session.NET.role === 'host');
