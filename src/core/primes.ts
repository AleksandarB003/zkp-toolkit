import { randomBigInt } from "./random.js";

export function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (modulus === 1n) return 0n;

  let result = 1n;
  let b = base % modulus;
  let e = exponent;

  while (e > 0n) {
    if (e % 2n === 1n) {
      result = (result * b) % modulus;
    }
    e = e / 2n;
    b = (b * b) % modulus;
  }

  return result;
}

export function isProbablePrime(n: bigint, rounds: number = 40): boolean {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;

  let d = n - 1n;
  let r = 0n;
  while (d % 2n === 0n) {
    d = d / 2n;
    r = r + 1n;
  }

  witnessLoop: for (let i = 0; i < rounds; i++) {
    const a = 2n + (randomBigInt(n.toString(2).length) % (n - 3n));
    let x = modPow(a, d, n);

    if (x === 1n || x === n - 1n) continue;

    for (let j = 0n; j < r - 1n; j++) {
      x = modPow(x, 2n, n);
      if (x === n - 1n) continue witnessLoop;
    }

    return false;
  }

  return true;
}

export interface SafePrimeResult {
  p: bigint;
  q: bigint;
}

export function generateSafePrime(bits: number): SafePrimeResult {
  while (true) {
    let q = randomBigInt(bits - 1);
    q = q | 1n;

    if (!isProbablePrime(q)) continue;

    const p = 2n * q + 1n;

    if (!isProbablePrime(p)) continue;

    return { p, q };
  }
}

export function findGenerator(p: bigint, q: bigint): bigint {
  while (true) {
    const h = 2n + (randomBigInt(p.toString(2).length) % (p - 3n));
    const g = modPow(h, 2n, p);

    if (g !== 1n) {
      return g;
    }
  }
}