#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILTER="${ROOT}/scripts/git-filter-strip-comments.js"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  exit 0
fi

git config --local filter.strip-comments.clean "node \"${FILTER}\""
git config --local filter.strip-comments.smudge cat
git config --local filter.strip-comments.required false

echo "Filtre Git strip-comments configuré (dépôt local)."
