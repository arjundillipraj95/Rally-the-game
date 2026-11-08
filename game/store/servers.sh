#!/bin/bash
# Starts everything the store/ tests need, if not already answering:
#   game dev server  http://127.0.0.1:8766  (vite, from game/)
#   peer server      http://127.0.0.1:9000  (store/peersrv, phone-to-phone links)
#   online service   http://127.0.0.1:8787  (wrangler dev --local, from online/)
# Usage (from anywhere): bash game/store/servers.sh
set -e
R=$(cd "$(dirname "$0")/../.." && pwd); L=/tmp/rally-test-logs; mkdir -p $L
up() { curl -s -o /dev/null --max-time 2 "$1"; }
[ -d "$R/game/node_modules" ] || (cd "$R/game" && npm install --silent)
[ -d "$R/game/store/peersrv/node_modules" ] || (cd "$R/game/store/peersrv" && npm install --silent)
[ -d "$R/online/node_modules" ] || (cd "$R/online" && npm install --silent)
up http://127.0.0.1:8766/ || (cd "$R/game" && setsid nohup npx vite --port 8766 --host 127.0.0.1 > $L/vite.log 2>&1 < /dev/null &)
up http://127.0.0.1:9000/ || (cd "$R/game/store/peersrv" && setsid nohup node peersrv.cjs > $L/peer.log 2>&1 < /dev/null &)
up http://127.0.0.1:8787/health || (cd "$R/online" && setsid nohup npx wrangler dev --local --port 8787 > $L/wrangler.log 2>&1 < /dev/null &)
for i in $(seq 1 40); do up http://127.0.0.1:8766/ && up http://127.0.0.1:9000/ && up http://127.0.0.1:8787/health && break; sleep 1; done
echo "game $(up http://127.0.0.1:8766/ && echo up || echo DOWN) | peer $(up http://127.0.0.1:9000/ && echo up || echo DOWN) | online $(up http://127.0.0.1:8787/health && echo up || echo DOWN)"
