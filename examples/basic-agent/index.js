/**
 * Basic Agent Example
 *
 * Creates an agent via the Agent Factory API,
 * saves X API keys, and posts a tweet.
 */

const API = 'http://localhost:4000';

async function main() {
  // 1. Create agent
  const agentRes = await fetch(`${API}/api/agents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'TestBot',
      ticker: 'TEST',
      description: 'A basic test agent',
      personality: 'Friendly and informative',
      topics: 'solana, testing',
      xHandle: '@testbot_sol',
      walletAddress: 'YOUR_WALLET_ADDRESS',
      features: {
        autoTweet: true,
        autoReply: false,
        autoBuyback: false,
        wildMode: false,
      },
    }),
  });

  const agent = await agentRes.json();
  console.log('Agent created:', agent._id);

  // 2. Save X API keys
  await fetch(`${API}/api/agents/${agent._id}/twitter`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: process.env.X_API_KEY,
      apiSecret: process.env.X_API_SECRET,
      accessToken: process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_SECRET,
    }),
  });

  console.log('X API keys saved');

  // 3. Post a tweet
  const tweetRes = await fetch(`${API}/api/tweet/${agent._id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'gm from TestBot' }),
  });

  const { tweetId } = await tweetRes.json();
  console.log('Tweet posted:', tweetId);
}

main().catch(console.error);
