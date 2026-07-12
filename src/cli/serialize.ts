import type { PublicParams, KeyPair, Proof } from "../core/types.js";

export function bigIntReplacer(_key: string, value: unknown): unknown {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

export function parseKeyPair(raw: any): KeyPair {
  return {
    params: {
      p: BigInt(raw.params.p),
      q: BigInt(raw.params.q),
      g: BigInt(raw.params.g),
    },
    privateKey: BigInt(raw.privateKey),
    publicKey: BigInt(raw.publicKey),
  };
}

export function parseProof(raw: any): Proof {
  return {
    params: {
      p: BigInt(raw.params.p),
      q: BigInt(raw.params.q),
      g: BigInt(raw.params.g),
    },
    publicKey: BigInt(raw.publicKey),
    commitment: BigInt(raw.commitment),
    challenge: BigInt(raw.challenge),
    response: BigInt(raw.response),
  };
}