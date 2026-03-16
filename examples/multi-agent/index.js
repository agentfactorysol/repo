/**
 * Multi-Agent Example
 *
 * Creates multiple agents and manages them
 * through the Agent Factory API.
 */

const API = 'http://localhost:4000';

const AGENTS = [
  {
    name: 'AlphaBot',
    ticker: 'ALPHA',
    description: 'The leader of the pack',
    personality: 'Confident, aggressive, alpha energy',
    topics: 'solana, alpha calls, trading',
    xHandle: '@alphabot_sol',
    features: { autoTweet: true, autoReply: true, autoBuyback: true, wildMode: false },
  },
  {
    name: 'ShadowBot',
    ticker: 'SHADOW',
    description: 'Lurks in the shadows',
    personality: 'Mysterious, cryptic, speaks in riddles',
    topics: 'shadows, mystery, solana',
    xHandle: '@shadowbot_sol',
    features: { autoTweet: true, autoReply: false, autoBuyback: true, wildMode: true },
  },
  {
    name: 'RaidBot',
    ticker: 'RAID',
    description: 'Built for raids',
    personality: 'Hype beast, all caps energy, never sleeps',
    topics: 'raids, pumps, solana',
    xHandle: '@raidbot_sol',
    features: { autoTweet: true, autoReply: true, autoBuyback: false, wildMode: true },
  },
];

async function createAgent(data, wallet) {
  const res = await fetch(`${API}/api/agents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, walletAddress: wallet }),
  });
  return res.json();
}

async function main() {
  const wallet = 'YOUR_WALLET_ADDRESS';

  console.log(`Creating ${AGENTS.length} agents...\n`);

  const created = [];
  for (const agentData of AGENTS) {
    const agent = await createAgent(agentData, wallet);
    console.log(`  Created: ${agent.name} ($${agent.ticker}) — ${agent._id}`);
    created.push(agent);
  }

  console.log('\nAll agents created. Listing...\n');

  // List all agents for this wallet
  const res = await fetch(`${API}/api/agents`);
  const all = await res.json();
  const mine = all.filter(a => a.walletAddress === wallet);

  mine.forEach(a => {
    const status = a.status.toUpperCase();
    const features = [];
    if (a.features?.autoTweet) features.push('TWEET');
    if (a.features?.autoReply) features.push('REPLY');
    if (a.features?.autoBuyback) features.push('BUYBACK');
    if (a.features?.wildMode) features.push('WILD');

    console.log(`  [${status}] ${a.name} ($${a.ticker}) — ${features.join(', ')}`);
  });

  console.log(`\nTotal: ${mine.length} agents`);
}

main().catch(console.error);
