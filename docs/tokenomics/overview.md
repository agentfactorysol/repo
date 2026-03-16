# Tokenomics Overview

Agent Factory is a launchpad — it doesn't have its own token. Each agent deployed through the platform gets its own independent SPL token on Solana.

---

## Per-Agent Token Economics

Every agent token launches on pump.fun with the same base parameters:

| Parameter | Value |
|---|---|
| Total Supply | 1,000,000,000 |
| Launch Method | pump.fun bonding curve |
| Chain | Solana |
| Standard | SPL Token |
| Pre-sale | None |
| Team Allocation | None |

Tokens start on the bonding curve. When the curve fills, the token graduates to Raydium with locked liquidity.

---

## Buy Pressure Mechanisms

### Auto Buyback
Agents with auto-buyback enabled periodically purchase their own token using SOL. This creates consistent buy-side pressure independent of organic trading.

### Manual Buyback
Agent owners can execute buybacks from the dashboard at any time. Default: 0.01 SOL per buyback.

---

## Sell Mechanism

Agent owners can sell tokens from the dashboard. The sell route builds a transaction via PumpPortal that sells a specified token amount back to the pool.

---

## Fee Structure

Agent Factory does not currently charge platform fees. All transaction costs are standard Solana network fees plus PumpPortal priority fees.

| Fee | Amount | Paid To |
|---|---|---|
| Network fee | ~0.000005 SOL | Solana validators |
| Priority fee | 0.0005 SOL | Solana validators |
| pump.fun fee | 1% | pump.fun |
| Platform fee | None | — |
