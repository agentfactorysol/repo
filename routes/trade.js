const express = require('express');
const router = express.Router();
const db = require('../db');

// Buyback — build a buy tx via PumpPortal (no API key needed)
router.post('/buyback', async (req, res) => {
  try {
    const { agentId, walletPublicKey, amountSol, slippage, priorityFee } = req.body;

    const agent = await db.getAgent(agentId);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    if (!agent.mintAddress) return res.status(400).json({ error: 'Agent has no deployed token' });

    const tradeRes = await fetch('https://pumpportal.fun/api/trade-local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publicKey: walletPublicKey,
        action: 'buy',
        mint: agent.mintAddress,
        denominatedInSol: 'true',
        amount: amountSol || 0.01,
        slippage: slippage || 10,
        priorityFee: priorityFee || 0.0005,
        pool: 'pump',
      }),
    });

    if (tradeRes.status !== 200) {
      const errText = await tradeRes.text();
      return res.status(400).json({ error: 'PumpPortal error: ' + errText });
    }

    const txData = await tradeRes.arrayBuffer();
    const txBase64 = Buffer.from(txData).toString('base64');

    res.json({ transaction: txBase64, action: 'buyback', mintAddress: agent.mintAddress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Burn — build a sell tx via PumpPortal
router.post('/burn', async (req, res) => {
  try {
    const { agentId, walletPublicKey, amountTokens, slippage, priorityFee } = req.body;

    const agent = await db.getAgent(agentId);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    if (!agent.mintAddress) return res.status(400).json({ error: 'Agent has no deployed token' });

    const tradeRes = await fetch('https://pumpportal.fun/api/trade-local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publicKey: walletPublicKey,
        action: 'sell',
        mint: agent.mintAddress,
        denominatedInSol: 'false',
        amount: amountTokens || 1000,
        slippage: slippage || 10,
        priorityFee: priorityFee || 0.0005,
        pool: 'pump',
      }),
    });

    if (tradeRes.status !== 200) {
      const errText = await tradeRes.text();
      return res.status(400).json({ error: 'PumpPortal error: ' + errText });
    }

    const txData = await tradeRes.arrayBuffer();
    const txBase64 = Buffer.from(txData).toString('base64');

    res.json({ transaction: txBase64, action: 'burn', mintAddress: agent.mintAddress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
