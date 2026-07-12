import { readFileSync } from "fs";
import { verify } from "../../core/schnorr.js";
import { parseProof } from "../serialize.js";

export function runVerify(proofFile: string): void {
  const raw = JSON.parse(readFileSync(proofFile, "utf-8"));
  const proof = parseProof(raw);

  const isValid = verify(proof);

  if (isValid) {
    console.log("Proof is VALID");
    process.exitCode = 0;
  } else {
    console.log("Proof is INVALID");
    process.exitCode = 1;
  }
}