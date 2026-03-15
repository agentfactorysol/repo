const express = require('express');
const router = express.Router();
const { TwitterApi } = require('twitter-api-v2');
const db = require('../db');

// Post a tweet for an agent using the user's own Twitter API keys
router.post('/:agentId', async (req, res) => {
  try {
    const agent = await db.getAgent(req.params.agentId);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    const keys = agent.twitterKeys;
    if (!keys || !keys.apiKey || !keys.apiSecret || !keys.accessToken || !keys.accessSecret) {
      return res.status(400).json({ error: 'Twitter API keys not configured for this agent' });
    }

    const client = new TwitterApi({
      appKey: keys.apiKey,
      appSecret: keys.apiSecret,
      accessToken: keys.accessToken,
      accessSecret: keys.accessSecret,
    });

    const tweetText = req.body.text;
    if (!tweetText) return res.status(400).json({ error: 'Tweet text required' });

    const tweet = await client.v2.tweet(tweetText);
    res.json({ success: true, tweetId: tweet.data.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
