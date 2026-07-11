import { createHash } from "crypto";

export function computeChallenge(g: bigint, y: bigint, t: bigint, q: bigint): bigint {
  const hash = createHash("sha256");
  hash.update(g.toString());
  hash.update(y.toString());
  hash.update(t.toString());

  const digest = hash.digest("hex");
  const value = BigInt("0x" + digest);

  return value % q;
}