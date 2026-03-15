const express = require('express');
const router = express.Router();
const { Keypair, Connection, PublicKey, TransactionMessage, VersionedTransaction } = require('@solana/web3.js');
const bs58 = require('bs58').default;
const { PumpSdk } = require('@pump-fun/pump-sdk');
const db = require('../db');

const RPC_URL = process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_URL, 'confirmed');
const pumpSdk = new PumpSdk(connection);

// Step 1: Upload metadata to IPFS + build create_v2 transaction
router.post('/', async (req, res) => {
  try {
    const { agentId, name, symbol, description, imageBase64, twitter, telegram, website, walletPublicKey, devBuyAmount, slippage, priorityFee } = req.body;

    // Upload metadata to IPFS via pump.fun
    const formData = new FormData();

    let imageBuffer;
    if (imageBase64) {
      imageBuffer = Buffer.from(imageBase64, 'base64');
    } else {
      imageBuffer = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        'base64'
      );
    }
    const imageBlob = new Blob([imageBuffer], { type: 'image/png' });
    formData.append('file', imageBlob, 'logo.png');
    formData.append('name', name);
    formData.append('symbol', symbol);
    formData.append('description', description || '');
    if (twitter) formData.append('twitter', twitter);
    if (telegram) formData.append('telegram', telegram);
    if (website) formData.append('website', website);
    formData.append('showName', 'true');

    const ipfsRes = await fetch('https://pump.fun/api/ipfs', {
      method: 'POST',
      body: formData,
    });

    if (!ipfsRes.ok) {
      const errText = await ipfsRes.text();
      return res.status(400).json({ error: 'IPFS upload failed: ' + (errText || ipfsRes.status) });
    }

    const ipfsText = await ipfsRes.text();
    console.log('IPFS raw response:', ipfsText);
    let ipfsData;
    try {
      ipfsData = JSON.parse(ipfsText);
    } catch (parseErr) {
      return res.status(400).json({ error: 'IPFS returned invalid JSON: ' + ipfsText.slice(0, 200) });
    }

    if (!ipfsData.metadataUri) {
      return res.status(400).json({ error: 'Failed to upload metadata to IPFS' });
    }

    // Generate mint keypair
    const mintKeypair = Keypair.generate();
    const mintPublicKey = mintKeypair.publicKey.toBase58();
    const mintSecretKey = bs58.encode(mintKeypair.secretKey);

    const userPubkey = new PublicKey(walletPublicKey);

    // Build create_v2 instruction using official pump SDK
    const createIx = await pumpSdk.createV2Instruction({
      mint: mintKeypair.publicKey,
      name: name,
      symbol: symbol,
      uri: ipfsData.metadataUri,
      creator: userPubkey,
      user: userPubkey,
      mayhemMode: false,
      cashback: false,
    });

    // Build versioned transaction
    const { blockhash } = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
      payerKey: userPubkey,
      recentBlockhash: blockhash,
      instructions: [createIx],
    }).compileToV0Message();

    const tx = new VersionedTransaction(messageV0);
    const txBase64 = Buffer.from(tx.serialize()).toString('base64');

    console.log('Built create_v2 tx for mint:', mintPublicKey);

    res.json({
      transaction: txBase64,
      mintPublicKey: mintPublicKey,
      mintSecretKey: mintSecretKey,
      metadataUri: ipfsData.metadataUri,
    });
  } catch (err) {
    console.error('Deploy route error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Step 2: Confirm deployment — save mint + tx to Redis
router.post('/confirm', async (req, res) => {
  try {
    const { agentId, mintAddress, txSignature } = req.body;

    const agent = await db.updateAgent(agentId, {
      mintAddress: mintAddress,
      txSignature: txSignature,
      status: 'deployed',
    });

    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
