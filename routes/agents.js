const express = require('express');
const router = express.Router();
const db = require('../db');

// Create agent
router.post('/', async (req, res) => {
  try {
    const agent = await db.createAgent({
      name: req.body.name,
      ticker: req.body.ticker,
      description: req.body.description,
      personality: req.body.personality,
      topics: req.body.topics,
      xHandle: req.body.xHandle,
      walletAddress: req.body.walletAddress,
      features: req.body.features,
    });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all agents
router.get('/', async (req, res) => {
  try {
    const agents = await db.getAllAgents();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single agent
router.get('/:id', async (req, res) => {
  try {
    const agent = await db.getAgent(req.params.id);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update agent twitter keys
router.put('/:id/twitter', async (req, res) => {
  try {
    const agent = await db.updateAgent(req.params.id, { twitterKeys: req.body });
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
