#!/usr/bin/env node



const { execSync, execFileSync } = require('node:child_process');

const SOURCE_PATTERN = /\.(tsx?|jsx?|scss|css)$/;
const BLOCK_COMMENT = /\/\*[\s\S]*?\*\//;
const LINE_COMMENT = /^\s*\/\//m;

const sh = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

const hasComments = (content) =>
  BLOCK_COMMENT.test(content) || LINE_COMMENT.test(content);

const remote = process.argv[2] || 'origin';
const branch = sh('git rev-parse --abbrev-ref HEAD');

let range = 'HEAD';

try {
  sh(`git rev-parse --verify ${remote}/${branch}`);
  range = `${remote}/${branch}..HEAD`;
} catch {
  
}

const files = sh(`git diff --name-only --diff-filter=ACMRT ${range}`)
  .split('\n')
  .filter((file) => file && SOURCE_PATTERN.test(file));

if (files.length === 0) {
  process.exit(0);
}

const offenders = [];

for (const file of files) {
  let content;

  try {
    content = execFileSync('git', ['show', `HEAD:${file}`], { encoding: 'utf8' });
  } catch {
    continue;
  }

  if (hasComments(content)) {
    offenders.push(file);
  }
}

if (offenders.length > 0) {
  console.error('\n[pre-push] Push refusé : commentaires détectés dans les fichiers suivants :\n');
  offenders.forEach((file) => console.error(`  - ${file}`));
  console.error(
    '\nRéindexez sans commentaires :\n  npm run git:renormalize\n  git commit --amend --no-edit   # ou un nouveau commit\n'
  );
  process.exit(1);
}

process.exit(0);
