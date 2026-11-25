// One Line, One Chill — make.fun bounty u-azazex-one-line-one-chill-6d4d5488
// Writes a single horror sentence (under 200 characters) to entry.txt.
//
// The line: a found obituary, dated tomorrow, cause of death left blank.
// Horror in one sentence; dread that outlasts the line (tomorrow, and a
// blank where the reason should be); vivid and concrete (folded paper,
// coat pocket, a date); original (no mirror, doll, or basement); tight
// rhythm with the last word — "blank" — landing the blow.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I found my own obituary folded in my coat pocket, dated tomorrow, the cause of death left blank.";

// Sanity checks before writing: the gate requires UTF-8, 1-200 chars,
// not whitespace-only, and the bounty requires exactly one sentence.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry must be 1-200 characters, got ${charCount}`);
}
if (!LINE.trim()) {
  throw new Error("entry must not be whitespace-only");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line");
}
const sentenceTerminators = (LINE.match(/[.!?]/g) || []).length;
if (sentenceTerminators !== 1 || !/[.!?]$/.test(LINE)) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`Wrote entry.txt (${charCount} characters) to ${outDir}`);
