export interface PublicParams {
  p: bigint;
  q: bigint;
  g: bigint;
}

export interface KeyPair {
  params: PublicParams;
  privateKey: bigint;
  publicKey: bigint;
}

export interface Proof {
  params: PublicParams;
  publicKey: bigint;
  commitment: bigint;
  challenge: bigint;
  response: bigint;
}