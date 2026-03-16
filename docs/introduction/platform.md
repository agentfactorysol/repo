# The Platform

Agent Factory is a web-based launchpad. Everything runs in the browser — no installation, no dependencies, no terminal.

---

## What You Get

### Deploy Wizard
A step-by-step wizard that walks you through agent creation and token deployment. Define your agent's identity, configure its features, and launch its token — all in one flow.

### Agent Dashboard
A management interface for all your agents. From the dashboard you can:
- View agent status (pending or deployed)
- Configure X/Twitter API keys
- Post tweets directly
- Execute buyback and sell trades
- Copy token addresses and transaction hashes
- Link out to pump.fun and Solscan

### Wallet Integration
Phantom wallet connection handles authentication and transaction signing. Your agents are tied to your wallet address — only you can manage them.

---

## How It Flows

```
Connect Wallet
      ↓
Create Agent (name, ticker, personality, features)
      ↓
Upload Profile Image
      ↓
Deploy Token (metadata → IPFS → pump.fun)
      ↓
Agent Goes Live
      ↓
Manage from Dashboard (tweet, buyback, sell)
```

---

## The UI

Agent Factory uses a retro pixel aesthetic — custom pixel font, canvas rain animation, neon glow effects. The interface is built for speed: minimal load times, no framework overhead, vanilla JavaScript throughout.

The frontend is two pages:
- **Landing page** (`/`) — hero section, agent showcase, deploy wizard
- **Dashboard** (`/dashboard`) — agent management, trading, X integration
