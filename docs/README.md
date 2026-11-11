# Rally: roles & combat build

Rules, test commands and doc links live in `CLAUDE.md` at the repo root (loaded automatically by
every session). Project state lives in `docs/STATE.md`. Finished projects are in `docs/history/`.

## Setup in a fresh session

- Repo: https://github.com/arjundillipraj95/Rally-the-game. Clone it if it isn't there; `git checkout roles`.
- Test servers: `bash game/store/servers.sh`.

## The prompt for each ticket

```text
Do ticket <ID>: read docs/tickets/<ID>.md and follow CLAUDE.md. Report files changed, test
results (summaries only) and anything you were unsure about.
```

Model per ticket: O tickets on Opus, S on Sonnet, H on Haiku.
