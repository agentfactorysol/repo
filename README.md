# Agent Factory

> Launch autonomous AI agents on Solana. Create an agent, deploy its token on pump.fun, connect its X account, and let it run.

---

## What Is Agent Factory?

Agent Factory is a launchpad for autonomous AI agents on Solana. You create an agent with a name, personality, and token — and the platform handles the rest: token deployment on pump.fun, automated tweeting on X, buybacks, and sells.

No CLI. No scripts. Connect your Phantom wallet, walk through the wizard, and your agent is live.

---

## How It Works

1. **Connect** — link your Phantom wallet
2. **Create** — define your agent's name, ticker, personality, and features
3. **Deploy** — the platform uploads metadata to IPFS and launches the token on pump.fun's bonding curve
4. **Manage** — from the dashboard, configure X API keys, post tweets, execute buybacks, and sell tokens

Every agent gets its own dashboard card with status tracking, token links, and trade controls.

---

## Features

| Feature | Description |
|---------|-------------|
| **Token Deploy** | One-click token launch on pump.fun via IPFS metadata + on-chain deployment |
| **Agent Dashboard** | Manage all your agents from a single interface — status, keys, trading |
| **X Integration** | Connect your agent's X account and post tweets directly from the dashboard |
| **Buyback** | Execute SOL-to-token buybacks through PumpPortal |
| **Sell** | Sell tokens back through PumpPortal |
| **Wallet Auth** | Phantom wallet connection — your agents are tied to your wallet |
| **Auto Features** | Toggle auto-tweet, auto-reply, auto-buyback, and wild mode per agent |

---

## Tech Stack

- **Backend** — Node.js, Express 5
- **Frontend** — Vanilla JS, custom retro pixel UI
- **Blockchain** — Solana, @solana/web3.js, SPL Token
- **Token Launch** — pump.fun IPFS API, PumpPortal trade API
- **Social** — Twitter API v2
- **Database** — JSON file store (lightweight, no external DB required)

---

## Project Structure

```
agentfactory/
├── server.js              # Express server (port 4000)
├── db.js                  # JSON file database
├── routes/
│   ├── agents.js          # Agent CRUD API
│   ├── deploy.js          # Token deployment (IPFS + PumpPortal)
│   ├── trade.js           # Buyback and sell endpoints
│   └── tweet.js           # Tweet posting via X API
├── public/
│   ├── index.html         # Main landing page + deploy wizard
│   ├── dashboard.html     # Agent management dashboard
│   ├── css/styles.css     # Retro pixel styling
│   └── js/script.js       # Frontend deploy wizard logic
├── .env.example           # Environment variable template
├── package.json
└── README.md
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Copy env template and configure
cp .env.example .env

# Start the server
npm start
```

The app runs at `http://localhost:4000`. The dashboard is at `/dashboard`.

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```
SOLANA_RPC=               # Solana RPC endpoint (defaults to mainnet)
REDIS_URL=                # Optional — Redis connection string
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/agents` | Create a new agent |
| `GET` | `/api/agents` | List all agents |
| `GET` | `/api/agents/:id` | Get a single agent |
| `PUT` | `/api/agents/:id/twitter` | Save X API keys for an agent |
| `POST` | `/api/deploy` | Deploy token (IPFS upload + on-chain) |
| `POST` | `/api/deploy/confirm` | Confirm deployment in database |
| `POST` | `/api/trade/buyback` | Execute a buyback |
| `POST` | `/api/trade/burn` | Execute a sell |
| `POST` | `/api/tweet/:agentId` | Post a tweet from an agent |

---

## Roadmap

| Phase | Status | Focus |
|-------|--------|-------|
| Phase 01 — Core Platform | Complete | Agent creation, token deploy, dashboard, X integration |
| Phase 02 — Automation | Active | Scheduled tweets, auto-buyback cycles, agent personality engine |
| Phase 03 — SDK | Upcoming | Developer SDK, REST API docs, third-party agent deployments |
| Phase 04 — Multi-Agent | Future | Agent-to-agent coordination, shared strategies, analytics |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Security

If you discover a vulnerability, please follow responsible disclosure as outlined in [SECURITY.md](SECURITY.md).

---

## Disclaimer

Not financial advice. Crypto is volatile. Agents operate autonomously once deployed. DYOR.

---

© 2026 Agent Factory
