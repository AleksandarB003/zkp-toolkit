import { randomBytes } from "crypto";

export function randomBigInt(bits: number): bigint {
  const bytes = Math.ceil(bits / 8);
  const buffer = randomBytes(bytes);
  let value = BigInt("0x" + buffer.toString("hex"));

  const excessBits = bytes * 8 - bits;
  value = value >> BigInt(excessBits);

  return value;
}

export function randomBigIntBelow(max: bigint): bigint {
  const bits = max.toString(2).length;

  while (true) {
    const value = randomBigInt(bits);

    if (value > 0n && value < max) {
      return value;
    }
  }
}