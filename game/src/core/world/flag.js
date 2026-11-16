// MAP: the relaunch's mountain is on with ?map26=1 (MAP6 makes it the default). Every phone in a battle must agree.
export let MAP26 = false;
try { MAP26 = new URLSearchParams(location.search).get('map26') === '1'; } catch (e) { /* (no address: off) */ }
export const setMap26 = v => { MAP26 = !!v; };
