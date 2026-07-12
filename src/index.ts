export { modPow, isProbablePrime, generateSafePrime, findGenerator } from "./core/primes.js";
export { randomBigInt, randomBigIntBelow } from "./core/random.js";
export { computeChallenge } from "./core/fiatShamir.js";
export { generateParams, generateKeyPair, prove, verify } from "./core/schnorr.js";
export type { PublicParams, KeyPair, Proof } from "./core/types.js";