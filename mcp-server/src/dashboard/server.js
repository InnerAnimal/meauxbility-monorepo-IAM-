#!/usr/bin/env node

import 'dotenv/config';
import express from 'express';
import { WebSocketServer } from 'ws';
import { config } from '../config.js';
import { Orchestrator } from '../orchestrator.js';

const app = express();
const PORT = process.env.DASHBOARD_PORT || 4000;

// Serve static dashboard
app.use(express.static('src/dashboard/public'));
app.use(express.json());

// API endpoint: Get current status
app.get('/api/status', async (req, res) => {
  try {
    const orchestrator = new Orchestrator();
    const summary = await orchestrator.run({ planOnly: true });
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint: Get configuration
app.get('/api/config', (req, res) => {
  res.json({
    projects: config.projects,
    workers: config.workers,
    render: config.render,
    healthChecks: config.healthChecks,
  });
});

// API endpoint: Trigger health check
app.post('/api/health-check', async (req, res) => {
  try {
    const orchestrator = new Orchestrator();
    const results = await orchestrator.runHealthChecks();
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`🎨 Dashboard running at http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api/status`);
});

// WebSocket for real-time updates
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('📡 Dashboard client connected');

  ws.send(JSON.stringify({ type: 'connected', message: 'Welcome to Meauxbility Dashboard' }));

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'get_status') {
        const orchestrator = new Orchestrator();
        const summary = await orchestrator.run({ planOnly: true });
        ws.send(JSON.stringify({ type: 'status', data: summary }));
      }
    } catch (error) {
      ws.send(JSON.stringify({ type: 'error', error: error.message }));
    }
  });

  ws.on('close', () => {
    console.log('📡 Dashboard client disconnected');
  });
});

// Periodic status broadcast (every 30 seconds)
setInterval(async () => {
  try {
    const orchestrator = new Orchestrator();
    const summary = await orchestrator.run({ planOnly: true });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(JSON.stringify({ type: 'status_update', data: summary }));
      }
    });
  } catch (error) {
    console.error('Error broadcasting status:', error);
  }
}, 30000);

console.log('✅ Dashboard server started successfully');
