import { describe, it, expect } from "vitest";
import { generateParams, generateKeyPair, prove, verify } from "../src/core/schnorr";

describe("schnorr protocol", () => {
  it("generates valid params and key pair", () => {
    const params = generateParams(64);
    const keyPair = generateKeyPair(params);

    expect(keyPair.publicKey).toBeGreaterThan(0n);
    expect(keyPair.privateKey).toBeLessThan(params.q);
  });

  it("produces a proof that verifies successfully", () => {
    const params = generateParams(64);
    const keyPair = generateKeyPair(params);
    const proof = prove(keyPair);

    expect(verify(proof)).toBe(true);
  });

  it("fails verification when the proof is tampered with", () => {
    const params = generateParams(64);
    const keyPair = generateKeyPair(params);
    const proof = prove(keyPair);

    const tamperedProof = { ...proof, response: proof.response + 1n };

    expect(verify(tamperedProof)).toBe(false);
  });

  it("fails verification with a different key pair's public key", () => {
    const params = generateParams(64);
    const keyPair1 = generateKeyPair(params);
    const keyPair2 = generateKeyPair(params);
    const proof = prove(keyPair1);

    const forgedProof = { ...proof, publicKey: keyPair2.publicKey };

    expect(verify(forgedProof)).toBe(false);
  });
});