const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_FILE = path.join(__dirname, 'data.json');

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return { agents: {} };
  }
}

function saveData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

async function connect() {
  if (!fs.existsSync(DB_FILE)) saveData({ agents: {} });
  console.log('Database connected (JSON file)');
}

async function createAgent(data) {
  const db = loadData();
  const id = crypto.randomUUID();
  const agent = {
    _id: id,
    name: data.name,
    ticker: data.ticker,
    description: data.description || '',
    personality: data.personality || '',
    topics: data.topics || '',
    xHandle: data.xHandle || '',
    walletAddress: data.walletAddress || '',
    mintAddress: '',
    txSignature: '',
    twitterKeys: data.twitterKeys || {},
    features: data.features || { autoTweet: true, autoReply: true, autoBuyback: true, wildMode: false },
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  db.agents[id] = agent;
  saveData(db);
  return agent;
}

async function getAgent(id) {
  const db = loadData();
  return db.agents[id] || null;
}

async function getAllAgents() {
  const db = loadData();
  return Object.values(db.agents).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function updateAgent(id, updates) {
  const db = loadData();
  if (!db.agents[id]) return null;
  Object.assign(db.agents[id], updates);
  saveData(db);
  return db.agents[id];
}

module.exports = { connect, createAgent, getAgent, getAllAgents, updateAgent };
