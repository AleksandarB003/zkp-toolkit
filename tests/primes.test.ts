import { describe, it, expect } from "vitest";
import { modPow, isProbablePrime, generateSafePrime, findGenerator } from "../src/core/primes";

describe("modPow", () => {
  it("computes 3^13 mod 7 correctly", () => {
    expect(modPow(3n, 13n, 7n)).toBe(3n);
  });

  it("returns 1 for exponent 0", () => {
    expect(modPow(5n, 0n, 11n)).toBe(1n);
  });

  it("returns 0 when modulus is 1", () => {
    expect(modPow(5n, 3n, 1n)).toBe(0n);
  });
});

describe("isProbablePrime", () => {
  it("identifies small primes correctly", () => {
    expect(isProbablePrime(2n)).toBe(true);
    expect(isProbablePrime(3n)).toBe(true);
    expect(isProbablePrime(17n)).toBe(true);
    expect(isProbablePrime(97n)).toBe(true);
  });

  it("identifies small composites correctly", () => {
    expect(isProbablePrime(1n)).toBe(false);
    expect(isProbablePrime(4n)).toBe(false);
    expect(isProbablePrime(15n)).toBe(false);
    expect(isProbablePrime(100n)).toBe(false);
  });

  it("identifies a known larger prime correctly", () => {
    expect(isProbablePrime(7919n)).toBe(true);
  });
});

describe("generateSafePrime", () => {
  it("generates a valid safe prime pair", () => {
    const { p, q } = generateSafePrime(64);

    expect(p).toBe(2n * q + 1n);
    expect(isProbablePrime(p)).toBe(true);
    expect(isProbablePrime(q)).toBe(true);
  });
});

describe("findGenerator", () => {
  it("finds a generator with correct order", () => {
    const { p, q } = generateSafePrime(64);
    const g = findGenerator(p, q);

    expect(modPow(g, q, p)).toBe(1n);
    expect(g).not.toBe(1n);
  });
});