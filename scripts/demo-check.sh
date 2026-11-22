#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

passed=0
failed=0

pass() {
  echo "[PASS] $1"
  passed=$((passed + 1))
}

fail() {
  echo "[FAIL] $1"
  failed=$((failed + 1))
}

echo "=== Automated Baseline Preconditions ==="

vite_body="$(curl -fsS --max-time 3 http://localhost:5173/ 2>/dev/null || true)"
if [ -n "$vite_body" ] && [[ "$vite_body" == *"torq."* ]]; then
  pass "Vite dev server responding on http://localhost:5173 (torq. served)"
else
  fail "Vite dev server not responding with TORQ page on http://localhost:5173 (start with: npm run dev)"
fi

if [ ! -e .scratch ] && [ ! -L .scratch ]; then
  pass ".scratch/ is absent"
else
  fail ".scratch/ exists (clear stale artifacts with: rm -rf .scratch)"
fi

exclude_file="$(git rev-parse --git-path info/exclude)"
ignore_info="$(git check-ignore -v -- .scratch/ 2>/dev/null || true)"
ignore_source="${ignore_info%%:*}"
if [ -n "$ignore_info" ] && [ "$ignore_source" = "$exclude_file" ]; then
  pass ".scratch/ is locally git-excluded ($exclude_file)"
elif [ -n "$ignore_info" ]; then
  fail ".scratch/ is ignored by '$ignore_source' instead of local exclude '$exclude_file' (keep .scratch/ only in $exclude_file, never .gitignore)"
else
  fail ".scratch/ is not git-excluded (fix with: printf '.scratch/\\n' >> \"$exclude_file\")"
fi

tag_commit="$(git rev-parse --verify --quiet 'refs/tags/demo-start^{commit}' || true)"
head_commit="$(git rev-parse HEAD)"
if [ -n "$tag_commit" ] && [ "$tag_commit" = "$head_commit" ]; then
  pass "Git HEAD is at tag demo-start (${head_commit:0:7})"
elif [ -z "$tag_commit" ]; then
  fail "Git tag 'demo-start' does not exist (HEAD is ${head_commit:0:7})"
else
  fail "Git HEAD (${head_commit:0:7}) does not match tag demo-start (${tag_commit:0:7})"
fi

status_output="$(git status --porcelain=v1)"
dirty_lines=()
has_local_agents=false
if [ -n "$status_output" ]; then
  while IFS= read -r line; do
    if [ "$line" = "?? AGENTS.md" ]; then
      has_local_agents=true
    else
      dirty_lines+=("$line")
    fi
  done <<< "$status_output"
fi

if [ "${#dirty_lines[@]}" -eq 0 ]; then
  pass "Working tree is clean"
else
  fail "Working tree has uncommitted or untracked changes:"
  for line in "${dirty_lines[@]}"; do
    echo "       $line"
  done
fi

if [ "$has_local_agents" = true ]; then
  echo "[INFO] Local untracked AGENTS.md present (preserved out of git)."
fi

echo ""
echo "=== Manual & Figma Preconditions ==="

if [ -f docs/PROMPTS.md ] \
  && grep -q 'JeHQJzcI84SD9fqPi49Tim' docs/PROMPTS.md \
  && grep -q '2:4' docs/PROMPTS.md \
  && grep -q '2:5' docs/PROMPTS.md \
  && grep -q '2:6' docs/PROMPTS.md \
  && grep -q '2:37' docs/PROMPTS.md \
  && grep -q '2:38' docs/PROMPTS.md \
  && grep -q '2:39' docs/PROMPTS.md; then
  echo "[READY] Demo 1 Figma file/section IDs (JeHQJzcI84SD9fqPi49Tim; 2:4/2:5/2:6, 2:37/2:38/2:39) present in docs/PROMPTS.md"
else
  echo "[WARN]  Demo 1 Figma section IDs missing or incomplete in docs/PROMPTS.md"
fi

if [ ! -f docs/PROMPTS.md ]; then
  echo "[WARN]  docs/PROMPTS.md is missing; cannot verify Demo 2 hero variant node URLs"
elif grep -qE '<demo-2-desktop-node-url>|<demo-2-mobile-node-url>' docs/PROMPTS.md; then
  echo "[PENDING] Demo 2 centered hero variant node URLs still use placeholders in docs/PROMPTS.md (prepare 1600 and 390 variant before rehearsal)"
else
  echo "[READY] Demo 2 hero variant node URLs recorded in docs/PROMPTS.md"
fi

echo "[MANUAL] Confirm chrome-devtools MCP is reachable in the active harness (standalone Chrome with --isolated=true)"
echo "[MANUAL] Confirm Figma MCP is reachable (smoke test: Hero 2:4 and Mobile Hero 2:37 in file JeHQJzcI84SD9fqPi49Tim)"
echo "[MANUAL] Confirm /jor-* skills and .agents/skills/verify-jor-stack-demo/ are available in the active harness"

echo ""
echo "Summary: ${passed}/5 automated baseline checks passed, ${failed} failed."

if [ "$failed" -gt 0 ]; then
  exit 1
fi
