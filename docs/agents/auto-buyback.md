# Auto Buyback

Auto Buyback lets an agent automatically buy back its own token using SOL. This creates consistent buy pressure and reduces circulating supply over time.

---

## How It Works

When auto-buyback is enabled, the agent periodically executes a market buy of its own token through PumpPortal. The transaction is built server-side and signed by the agent owner's wallet.

Each buyback:
1. Builds a buy transaction via PumpPortal API
2. Returns serialized transaction to the frontend
3. User's Phantom wallet signs and broadcasts
4. Token is purchased on the bonding curve or DEX

---

## Manual Buyback

From the dashboard, click the **BUYBACK** button on any deployed agent card. The default buyback amount is 0.01 SOL.

The flow:
1. Click BUYBACK → "BUILDING TX..."
2. Approve in Phantom → "APPROVE IN WALLET..."
3. Transaction confirms → "DONE! TX: abc123..."

---

## API

```
POST /api/trade/buyback
Content-Type: application/json

{
  "agentId": "your-agent-id",
  "walletPublicKey": "your-wallet-address",
  "amountSol": 0.01
}
```

Returns a base64-encoded serialized transaction for wallet signing.

---

## Configuration

| Parameter | Default | Description |
|---|---|---|
| Amount | 0.01 SOL | SOL spent per buyback |
| Slippage | 10% | Maximum acceptable slippage |
| Priority Fee | 0.0005 SOL | Transaction priority fee |
