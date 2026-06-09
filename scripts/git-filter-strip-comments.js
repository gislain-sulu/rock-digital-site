#!/usr/bin/env node




const strip = require('strip-comments');

let input = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});
process.stdin.on('end', () => {
  process.stdout.write(strip(input, { preserveNewlines: true }));
});
