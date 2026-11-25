# Quantitative & Personal Finance Math Test Vectors (2026)

Open, reproducible textbook test vectors for deterministic financial mathematics (position sizing with lot flooring, Kelly Criterion, drawdown recovery asymmetry, Coast FIRE present-value discounting, and 100-share US equity options expiration intrinsic payoff).

Reference vectors for [MapleQuant](https://invest.ai-purplemaple.com/).

> **Educational Verification Only (Non-Advisory)**  
> Nothing in this repository constitutes financial, investment, or tax advice.

## Run Locally

```bash
node --test tests/verify_math_vectors.mjs
```

## Included Files

- `vectors/financial_math_vectors.json` — Deterministic input/expected vectors with explicit rounding and fee-basis assumptions.
- `tests/verify_math_vectors.mjs` — Zero-dependency Node.js verification suite.

## License

Released under the [MIT License](LICENSE).
