import { modPow, generateSafePrime, findGenerator } from "./primes.js";
import { randomBigIntBelow } from "./random.js";
import { computeChallenge } from "./fiatShamir.js";
import type { PublicParams, KeyPair, Proof } from "./types.js";

export function generateParams(bits: number = 128): PublicParams {
  const { p, q } = generateSafePrime(bits);
  const g = findGenerator(p, q);

  return { p, q, g };
}

export function generateKeyPair(params: PublicParams): KeyPair {
  const privateKey = randomBigIntBelow(params.q);
  const publicKey = modPow(params.g, privateKey, params.p);

  return {
    params,
    privateKey,
    publicKey,
  };
}

export function prove(keyPair: KeyPair): Proof {
  const { params, privateKey, publicKey } = keyPair;
  const { p, q, g } = params;

  const r = randomBigIntBelow(q);
  const commitment = modPow(g, r, p);
  const challenge = computeChallenge(g, publicKey, commitment, q);
  const response = (r + challenge * privateKey) % q;

  return {
    params,
    publicKey,
    commitment,
    challenge,
    response,
  };
}

export function verify(proof: Proof): boolean {
  const { params, publicKey, commitment, challenge, response } = proof;
  const { p, q, g } = params;

  const expectedChallenge = computeChallenge(g, publicKey, commitment, q);

  if (expectedChallenge !== challenge) {
    return false;
  }

  const left = modPow(g, response, p);
  const right = (commitment * modPow(publicKey, challenge, p)) % p;

  return left === right;
}