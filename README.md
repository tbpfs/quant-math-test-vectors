# Quantitative & Personal Finance Math Test Vectors (2026)

Open, reproducible textbook test vectors for deterministic financial mathematics (position sizing with lot flooring, Kelly Criterion, drawdown recovery asymmetry, Coast FIRE present-value discounting, and 100-share US equity options expiration intrinsic payoff).

Reference vectors for [MapleQuant](https://invest.ai-purplemaple.com/) (available in Traditional Chinese, [English](https://invest.ai-purplemaple.com/en/), and [Japanese](https://invest.ai-purplemaple.com/ja/)).

## Use as an AI Agent Skill (Claude Code / Codex / Antigravity)

Install the bundled [`SKILL.md`](SKILL.md) to verify financial and risk formulas against deterministic golden vectors:

```bash
npx skills add tbpfs/quant-math-test-vectors
```

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
