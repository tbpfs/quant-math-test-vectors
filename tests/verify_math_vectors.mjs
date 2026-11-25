import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "vectors", "financial_math_vectors.json"), "utf8")
);

function round2(v) {
  return Math.round((v + Number.EPSILON) * 100) / 100;
}

test("All test vectors declare valid MapleQuant URLs and non-advisory disclaimer", () => {
  assert.ok(data.disclaimer.toLowerCase().includes("not investment"));
  assert.equal(data.vectors.length, 6);
  for (const v of data.vectors) {
    assert.ok(v.tool_url.startsWith("https://invest.ai-purplemaple.com/"));
  }
});

test("Position sizing 1% risk lot-flooring vector", () => {
  const { inputs, expected } = data.vectors.find((x) => x.id === "position_size_1pct_lot1000");
  const riskAmount = inputs.account * (inputs.risk_pct / 100);
  const rawShares = Math.floor(riskAmount / (inputs.entry - inputs.stop));
  const lotShares = Math.floor(rawShares / inputs.lot) * inputs.lot;
  assert.equal(riskAmount, expected.risk_amount);
  assert.equal(lotShares, expected.max_shares);
});

test("Half-Kelly positive edge vector (p=55%, b=1.5 -> 25% full / 12.5% half)", () => {
  const { inputs, expected } = data.vectors.find((x) => x.id === "half_kelly_positive_edge");
  const p = inputs.win_rate_pct / 100;
  const fullKellyPct = round2((p - (1 - p) / inputs.reward_risk_ratio) * 100);
  const applied = round2(fullKellyPct * inputs.multiplier);
  assert.equal(fullKellyPct, expected.full_kelly_pct);
  assert.equal(applied, expected.applied_kelly_pct);
});

test("Drawdown recovery asymmetry (-50% requires +100%)", () => {
  const { inputs, expected } = data.vectors.find((x) => x.id === "drawdown_recovery_50pct");
  const d = inputs.drawdown_pct / 100;
  assert.equal(round2((d / (1 - d)) * 100), expected.required_gain_pct);
});

test("Coast FIRE present-value discounting (Age 32->65, $48k/yr @ 4% SWR & 5.5% real = $205,045.42)", () => {
  const { inputs, expected } = data.vectors.find((x) => x.id === "coast_fire_pv_33y_5_5pct");
  const fullFire = inputs.annual_expenses / (inputs.swr_pct / 100);
  const years = inputs.retire_age - inputs.current_age;
  const coastToday = round2(fullFire / Math.pow(1 + inputs.real_return_pct / 100, years));
  assert.equal(fullFire, expected.full_fire_target);
  assert.equal(coastToday, expected.coast_fire_today);
});

test("US Equity Options 100-share expiration payoff vectors (Long Call & Covered Call)", () => {
  const lc = data.vectors.find((x) => x.id === "options_long_call_100sh");
  const lcShares = lc.inputs.contracts * 100;
  const lcFees = lc.inputs.contracts * lc.inputs.fee_per_contract;
  const lcBe = round2(lc.inputs.strike + lc.inputs.premium + lcFees / lcShares);
  const lcPnl = round2((Math.max(0, lc.inputs.expiry_price - lc.inputs.strike) - lc.inputs.premium) * lcShares - lcFees);
  assert.equal(lcBe, lc.expected.breakeven);
  assert.equal(lcPnl, lc.expected.net_pnl);

  const cc = data.vectors.find((x) => x.id === "options_covered_call_capped");
  const ccShares = cc.inputs.contracts * 100;
  const ccPnl = round2((Math.min(cc.inputs.expiry_price, cc.inputs.strike) - cc.inputs.basis + cc.inputs.premium) * ccShares);
  assert.equal(ccPnl, cc.expected.net_pnl);
  assert.equal(round2(cc.inputs.basis - cc.inputs.premium), cc.expected.breakeven);
});
