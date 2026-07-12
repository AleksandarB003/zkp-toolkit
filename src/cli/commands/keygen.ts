import { writeFileSync } from "fs";
import { generateParams, generateKeyPair } from "../../core/schnorr.js";
import { bigIntReplacer } from "../serialize.js";

export function runKeygen(bits: number, outFile: string): void {
  console.log(`Generating safe prime parameters with ${bits} bits, this may take a moment...`);

  const params = generateParams(bits);
  const keyPair = generateKeyPair(params);

  writeFileSync(outFile, JSON.stringify(keyPair, bigIntReplacer, 2));

  console.log(`Key pair generated and saved to ${outFile}`);
  console.log(`Public key: ${keyPair.publicKey.toString()}`);
}