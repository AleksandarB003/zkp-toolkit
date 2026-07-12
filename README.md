# Schnorr ZKP Toolkit

[![npm version](https://img.shields.io/npm/v/schnorr-zkp-toolkit.svg)](https://www.npmjs.com/package/schnorr-zkp-toolkit)

A CLI tool and TypeScript library for authentication using Schnorr zero knowledge proofs. Everything is implemented from scratch, no external cryptography libraries, just built in Node.js crypto module for random number generation and hashing.

This started as part of my university thesis, where I built an IoT device authentication system using this exact protocol. This repo is that cryptographic core pulled out into its own standalone package, so it can be reused in other projects.

## What is a Schnorr zero knowledge proof

In short, it lets you prove you know a secret value without actually revealing it. This implementation uses the non interactive version (Fiat Shamir transformation), so there is no back and forth communication needed between the two sides, a proof can just be generated and checked later.

If you want to go deeper into the math behind it, check [docs/MATH.md](docs/MATH.md).

## Installation

npm install schnorr-zkp-toolkit

Or if you want to run it locally:

git clone https://github.com/AleksandarB003/zkp-toolkit.git

cd zkp-toolkit

npm install

npm run build

## CLI usage

Generate a key pair:
npx zkp-toolkit keygen --bits 128 --out keys.json

Generate a proof from that key pair:
npx zkp-toolkit prove --keys keys.json --out proof.json

Verify a proof:
npx zkp-toolkit verify --proof proof.json

Or just run the whole thing in one go:
npx zkp-toolkit demo --bits 128

## Using it as a library

```typescript
import { generateParams, generateKeyPair, prove, verify } from "schnorr-zkp-toolkit";

const params = generateParams(128);
const keyPair = generateKeyPair(params);
const proof = prove(keyPair);

console.log(verify(proof));
```

## A note on security

The default is 128 bit safe primes, this is just for fast demos, generating bigger primes takes a while. For anything close to real world use you would want at least 2048 bits.

## Running tests
npm test

## License

MIT