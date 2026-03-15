require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/agents', require('./routes/agents'));
app.use('/api/deploy', require('./routes/deploy'));
app.use('/api/trade', require('./routes/trade'));
app.use('/api/tweet', require('./routes/tweet'));

// Serve frontend
app.get('/{*path}', (req, res) => {
  console.log('CATCH-ALL HIT:', req.path);
  if (req.path === '/dashboard') {
    return res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start
db.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Agent Factory running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start:', err.message);
  process.exit(1);
});
