#!/usr/bin/env node

import { Command } from "commander";
import { runKeygen } from "./commands/keygen.js";
import { runProve } from "./commands/prove.js";
import { runVerify } from "./commands/verify.js";
import { runDemo } from "./commands/demo.js";

const program = new Command();

program
  .name("zkp-toolkit")
  .description("CLI for Schnorr zero knowledge proof authentication")
  .version("0.1.0");

program
  .command("keygen")
  .description("Generate a new key pair and public parameters")
  .option("-b, --bits <number>", "bit length for the safe prime", "128")
  .option("-o, --out <file>", "output file for the key pair", "keys.json")
  .action((options) => {
    const bits = parseInt(options.bits, 10);
    runKeygen(bits, options.out);
  });

program
  .command("prove")
  .description("Generate a zero knowledge proof using an existing key pair")
  .option("-k, --keys <file>", "input file containing the key pair", "keys.json")
  .option("-o, --out <file>", "output file for the proof", "proof.json")
  .action((options) => {
    runProve(options.keys, options.out);
  });

  program
  .command("verify")
  .description("Verify a zero knowledge proof")
  .option("-p, --proof <file>", "input file containing the proof", "proof.json")
  .action((options) => {
    runVerify(options.proof);
  });

  program
  .command("demo")
  .description("Run a complete demo of the protocol, from key generation to verification")
  .option("-b, --bits <number>", "bit length for the safe prime", "128")
  .action((options) => {
    const bits = parseInt(options.bits, 10);
    runDemo(bits);
  });

program.parse();