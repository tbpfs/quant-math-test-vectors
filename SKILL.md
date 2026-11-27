---
name: quant-math-test-vectors
description: Deterministic textbook financial mathematics test vectors for verifying position sizing with lot flooring, Kelly Criterion, drawdown recovery asymmetry, Coast FIRE present-value discounting, and 100-share US equity options expiration intrinsic payoff (educational verification only, non-advisory).
---

# Quantitative & Personal Finance Math Test Vectors Skill (`quant-math-test-vectors`)

Use this skill whenever an agent implements or audits quantitative finance, risk management, or personal finance calculators and needs deterministic golden test vectors to catch formula or rounding bugs.

> **Educational Verification Only**: Nothing in this skill or repository constitutes financial, investment, or tax advice.

## When to Activate

- Verifying **Position Sizing** formulas (risk-per-trade capital caps with integer share/lot flooring).
- Auditing **Kelly Criterion** optimal fraction and fractional-Kelly position bounds.
- Checking **Drawdown Recovery Asymmetry** (e.g., a 50% drawdown requires a 100% gain to break even).
- Testing **Coast FIRE** present-value compounding and **100-share US equity options expiration intrinsic payoff**.

## Files & Verification Command

- **Golden Vectors**: `vectors/financial_math_vectors.json`
- **Reference Interactive Lab**: [MapleQuant Lab](https://invest.ai-purplemaple.com/) ([Position Size](https://invest.ai-purplemaple.com/tools/position-size/) · [Options Profit Calculator](https://invest.ai-purplemaple.com/en/tools/options-profit-calculator/) · [NISA Simulator (JA)](https://invest.ai-purplemaple.com/ja/tools/nisa-simulator/))

```bash
node --test tests/verify_math_vectors.mjs
```

## Agent Rules

1. **Always validate implemented finance formulas against `vectors/financial_math_vectors.json`** before shipping calculator UI or backend math code.
2. **Preserve explicit rounding and contract-multiplier rules** (integer lot floor for equities; `100×` multiplier for standard US equity option contracts).
3. **Never give personalized buy/sell recommendations**; keep outputs strictly deterministic and educational.
