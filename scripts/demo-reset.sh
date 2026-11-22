#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if ! git rev-parse --verify --quiet "refs/tags/demo-start^{commit}" >/dev/null; then
  echo "Error: git tag 'demo-start' does not exist. Tag the baseline first before resetting." >&2
  exit 1
fi

git reset --hard demo-start

# Preserve root /node_modules so an untouched running Vite dev server stays live,
# and preserve local untracked /AGENTS.md.
echo "Preserving /node_modules (running dev server) and local untracked /AGENTS.md..."
git clean -fdx -e /node_modules -e /AGENTS.md

# .scratch/ is excluded via .git/info/exclude; remove it explicitly so stale
# rehearsal specs and verification artifacts never persist across runs.
rm -rf .scratch

echo "Reset complete. Repository is at demo-start ($(git rev-parse --short HEAD))."
