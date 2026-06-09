#!/usr/bin/env node




const strip = require('strip-comments');

let input = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});
process.stdin.on('end', () => {
  process.stdout.write(stripSourceComments(input));
});

function stripSourceComments(content) {
  let output = strip(content, { preserveNewlines: true });

  output = output.replace(/\/\*[\s\S]*?\*\//g, '');
  output = output.replace(/^\s*\/\/.*$/gm, '');

  return output;
}
