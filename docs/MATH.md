# The math behind it

This is a walkthrough of how the Schnorr protocol works in this project, step by step.

## The group we work in

Everything happens inside a mathematical group defined by a large prime number `p`. Specifically, we use what is called a safe prime, meaning `p = 2q + 1`, where `q` is also prime.

Why does this matter? If `p - 1` had small prime factors, an attacker could exploit that structure to make solving the discrete logarithm problem easier (this is known as the Pohlig-Hellman attack). Using a safe prime avoids this, the subgroup we work in has a large prime order `q`, so there is no shortcut like that available.

Alongside `p` and `q`, we also need a generator `g`, a number that generates a subgroup of order `q`. All the public parameters `(p, q, g)` are, well, public. Anyone can know them.

## Generating a key pair

Once we have the group parameters, generating a key pair is simple.

The private key `x` is just a random number smaller than `q`. That's it, that's the whole secret.

The public key `y` is calculated as:
y = g^x mod p

This is a one way function. Given `g`, `p`, and `y`, there is no efficient way to figure out `x`. That's the discrete logarithm problem, and it's what makes the whole thing secure. Computing `y` from `x` is fast, going backwards is not, at least not with parameters big enough (128 bits is fine for a demo, but you'd want way more for anything real, see the security note in the README).

## Generating a proof

This is where it gets interesting. The prover wants to convince someone they know `x`, without revealing `x` itself.

**Step 1, commitment.** Pick a random number `r`, smaller than `q`. Calculate:
t = g^r mod p

This `t` is called the commitment. It's sent (or included in the proof) but it doesn't reveal anything about `r` or `x`.

**Step 2, challenge.** In the original interactive version of this protocol, the verifier would send back a random challenge at this point. But we're using the Fiat-Shamir transformation, which turns this into a non interactive protocol, so instead of waiting for someone else to send a challenge, we just hash the public values ourselves:
c = H(g, y, t) mod q

This works because a hash function is unpredictable, you can't choose `r` or `x` to try to control what `c` comes out to be, not without breaking the hash function itself.

**Step 3, response.** Now combine everything:
s = (r + c * x) mod q

The proof that gets sent is `(t, c, s)`, along with the public key `y` and the group parameters.

## Verifying a proof

The verifier gets the proof `(t, c, s)`, the public key `y`, and the group parameters `(p, q, g)`. No secret information involved at all.

First, the verifier recomputes the challenge the same way the prover did:
c' = H(g, y, t) mod q

If `c'` doesn't match the `c` that came with the proof, something is wrong, reject it immediately.

If it matches, the verifier checks this equation:
g^s mod p == (t * y^c) mod p

If both sides are equal, the proof is valid.

## Why this actually works

This is the part that took me a while to really get, so here it is spelled out.

Remember `s = r + c*x`. If we plug that into the left side of the verification equation:
g^s = g^(r + cx) = g^r * g^(cx) = g^r * (g^x)^c

And since `t = g^r` and `y = g^x`, this becomes:
g^s = t * y^c

Which is exactly the equation being checked. It only works out like this if `s` was actually computed using the real `x`. Someone who doesn't know `x` can't just make up a valid `s`, they would need to know the discrete logarithm, which is the hard problem this whole thing relies on.

## Why the hash based challenge instead of a random one

In the classic Schnorr protocol, both sides talk to each other, the verifier picks a random challenge and sends it over. That means someone can't precompute a fake proof in advance because they don't know what the challenge will be ahead of time.

With Fiat-Shamir, we replace that random challenge with a hash of the public values instead. This works because a good hash function behaves unpredictably, an attacker still can't control what the challenge ends up being without breaking the hash. The upside is we don't need any live interaction anymore, the whole proof can just be generated once and verified later, which is exactly what we need for something like device authentication over MQTT.