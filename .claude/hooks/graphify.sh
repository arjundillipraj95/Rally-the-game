#!/bin/bash
# graphify for every Claude session on this repo (cloud sessions start without it).
#   setup: install graphify if missing and build the code graph (about 10 s, no model tokens)
#   search|read|compact: graphify's own guard, which points Claude at the graph before grep/read
# The graph (graphify-out/) is rebuilt per session and never committed.
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" || exit 0
if [ "$1" = setup ]; then
  command -v graphify >/dev/null || pip install -q --break-system-packages graphifyy==0.9.106 >/dev/null 2>&1
  command -v graphify >/dev/null && graphify update . >/dev/null 2>&1
  exit 0
fi
command -v graphify >/dev/null && [ -f graphify-out/graph.json ] || exit 0
exec graphify hook-guard "$1"
