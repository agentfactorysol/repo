# Architecture

Agent Factory is a three-layer system: a frontend UI, a backend API, and on-chain execution via Solana.

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
│                                                          │
│  ┌──────────────┐    ┌──────────────────┐               │
│  │ Landing Page  │    │    Dashboard     │               │
│  │ Deploy Wizard │    │  Agent Manager   │               │
│  └──────┬───────┘    └────────┬─────────┘               │
│         │                     │                          │
│         │    Phantom Wallet   │                          │
│         │    (sign + send)    │                          │
└─────────┼─────────────────────┼──────────────────────────┘
          │                     │
          ▼                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Express API (Node.js)                  │
│                                                          │
│  /api/agents   — CRUD operations                        │
│  /api/deploy   — IPFS upload + token creation           │
│  /api/trade    — buyback + sell via PumpPortal           │
│  /api/tweet    — post tweets via X API                  │
│                                                          │
│  ┌──────────┐                                           │
│  │  db.js   │ ← JSON file store                        │
│  └──────────┘                                           │
└─────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│                    Solana Blockchain                      │
│                                                          │
│  pump.fun IPFS API    — metadata hosting                │
│  PumpPortal API       — transaction building            │
│  SPL Token Program    — token operations                │
│  Jupiter / Raydium    — liquidity + swaps               │
└─────────────────────────────────────────────────────────┘
```

---

## Frontend Layer

Two static HTML pages served by Express:

- **`index.html`** — landing page with hero, agent showcase grid, and the deploy wizard modal. The wizard is a multi-step form that collects agent identity, personality, features, and profile image.
- **`dashboard.html`** — agent management interface. Loads agents via API, filters by connected wallet, renders expandable cards with trading controls.

No framework. No build step. Vanilla JavaScript, custom CSS, canvas animations. The font is Press Start 2P. The vibe is retro terminal.

---

## API Layer

Express 5 server running on port 4000. Four route modules:

| Route | File | Purpose |
|---|---|---|
| `/api/agents` | `routes/agents.js` | Create, list, get, update agents |
| `/api/deploy` | `routes/deploy.js` | Upload metadata to IPFS, create token on pump.fun |
| `/api/trade` | `routes/trade.js` | Build buyback/sell transactions via PumpPortal |
| `/api/tweet` | `routes/tweet.js` | Post tweets using agent's X API keys |

Data is stored in `data.json` via `db.js` — a simple JSON file store with no external database dependency.

---

## Blockchain Layer

All on-chain operations go through two external APIs:

1. **pump.fun IPFS API** (`https://pump.fun/api/ipfs`) — uploads token metadata and profile image, returns a metadata URI
2. **PumpPortal API** (`https://pumpportal.fun/api/trade-local`) — builds the token creation transaction, returns serialized bytes for wallet signing

The frontend handles wallet signing via Phantom. Transactions are deserialized, signed, and sent client-side using `@solana/web3.js`.
