import { generateParams, generateKeyPair, prove, verify } from "../../core/schnorr.js";

export function runDemo(bits: number): void {
  console.log(`Running full demo with ${bits} bit safe prime, this may take a moment...`);
  console.log("");

  console.log("Step 1: Generating public parameters and key pair");
  const params = generateParams(bits);
  const keyPair = generateKeyPair(params);
  console.log(`  Public key: ${keyPair.publicKey.toString()}`);
  console.log("");

  console.log("Step 2: Generating zero knowledge proof");
  const proof = prove(keyPair);
  console.log(`  Commitment: ${proof.commitment.toString()}`);
  console.log(`  Challenge: ${proof.challenge.toString()}`);
  console.log("");

  console.log("Step 3: Verifying the proof");
  const isValid = verify(proof);
  console.log(`  Result: ${isValid ? "VALID" : "INVALID"}`);
}