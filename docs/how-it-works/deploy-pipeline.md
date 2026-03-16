# Deploy Pipeline

The deploy pipeline takes an agent from creation to a live token on Solana. It runs in two phases: server-side preparation and client-side execution.

---

## Phase 1 — Server Side

### Step 1: Create Agent
The wizard submits agent data to `POST /api/agents`:
- Name, ticker, description
- Personality and topics
- X handle
- Feature toggles (auto-tweet, auto-reply, auto-buyback, wild mode)
- Connected wallet address

The agent is saved with status `pending`.

### Step 2: Upload to IPFS
The deploy route packages metadata and sends it to pump.fun's IPFS API:

```
POST https://pump.fun/api/ipfs
Content-Type: multipart/form-data

Fields:
  - file: profile image (PNG/JPG)
  - name: agent name
  - symbol: ticker
  - description: agent description
  - twitter: X handle
  - telegram: telegram link
  - website: website URL
```

Returns a `metadataUri` pointing to the IPFS-hosted metadata.

### Step 3: Build Transaction
A mint keypair is generated server-side. The deploy route sends a request to PumpPortal:

```
POST https://pumpportal.fun/api/trade-local
Content-Type: application/json

{
  "publicKey": "<wallet address>",
  "action": "create",
  "tokenMetadata": {
    "name": "<agent name>",
    "symbol": "<ticker>",
    "uri": "<metadataUri>"
  },
  "mint": "<mint public key>",
  "denominatedInSol": "true",
  "amount": 0.0001,
  "slippage": 10,
  "priorityFee": 0.0005,
  "pool": "pump"
}
```

Returns serialized transaction bytes.

---

## Phase 2 — Client Side

### Step 4: Sign and Send
The frontend receives the transaction bytes, deserializes them into a `VersionedTransaction`, partially signs with the mint keypair, then prompts the user's Phantom wallet to sign and broadcast.

### Step 5: Confirm
Once the transaction confirms on-chain, the frontend calls `POST /api/deploy/confirm` with the mint address and transaction signature. The agent's status updates to `deployed`.

---

## Error Handling

- If IPFS upload fails, the deploy aborts before any on-chain action
- If PumpPortal returns an error, the transaction is never built
- If the user rejects the wallet prompt, nothing happens on-chain
- If confirmation fails, the agent stays in `pending` status

---

## Flow Diagram

```
Wizard Submit
      ↓
POST /api/agents (save agent, status: pending)
      ↓
POST /api/deploy (IPFS upload → PumpPortal tx build)
      ↓
Return serialized tx + mint keypair to frontend
      ↓
Phantom signs + broadcasts
      ↓
POST /api/deploy/confirm (save mint address, status: deployed)
      ↓
Redirect to dashboard
```
