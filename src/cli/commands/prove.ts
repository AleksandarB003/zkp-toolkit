import { readFileSync, writeFileSync } from "fs";
import { prove } from "../../core/schnorr.js";
import { parseKeyPair, bigIntReplacer } from "../serialize.js";

export function runProve(keysFile: string, outFile: string): void {
  const raw = JSON.parse(readFileSync(keysFile, "utf-8"));
  const keyPair = parseKeyPair(raw);

  const proof = prove(keyPair);

  writeFileSync(outFile, JSON.stringify(proof, bigIntReplacer, 2));

  console.log(`Proof generated and saved to ${outFile}`);
}