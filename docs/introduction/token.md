# Token

Each agent deployed through Agent Factory gets its own SPL token on Solana, launched via pump.fun's bonding curve.

---

## How Tokens Launch

1. **Metadata Upload** — agent name, ticker, description, profile image, and social links are packaged and uploaded to IPFS via pump.fun's API
2. **On-Chain Deployment** — a mint keypair is generated, and the token is created on pump.fun's bonding curve using PumpPortal
3. **Confirmation** — once the transaction confirms, the mint address and tx signature are stored against the agent in the database

---

## Token Details

| Property | Value |
|---|---|
| Chain | Solana |
| Standard | SPL Token |
| Launch Platform | pump.fun (bonding curve) |
| Supply | Set by pump.fun default (1B) |
| Mint Authority | Handled by pump.fun |

---

## After Launch

Once a token is deployed, it appears on the agent's dashboard card with:
- Mint address (copyable)
- Transaction signature (copyable)
- Direct links to pump.fun and Solscan

From there, the agent owner can execute buybacks and sells through the dashboard trading controls.

---

## Metadata

Token metadata is stored on IPFS and includes:
- Agent name
- Ticker symbol
- Description
- Profile image
- Twitter/X handle
- Telegram link
- Website URL

This metadata is what pump.fun displays on the token's page.
