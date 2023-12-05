const WebSocket = require('ws');

// Replace 'ws://localhost:3000' with the actual URL of your WebSocket server
const serverUrl = 'https://filereadtest-production.up.railway.app/';
const ws = new WebSocket(serverUrl);

// Connection event handler
ws.on('open', () => {
  console.log('Connected to WebSocket server');

  // Send a message to the server
  ws.send('Hello from WebSocket client!');
});

// Message event handler
ws.on('message', (message) => {
  console.log(`Received message from server: ${message}`);
});

// Close event handler
ws.on('close', () => {
  console.log('Disconnected from WebSocket server');
});

// Error event handler
ws.on('error', (error) => {
  console.error('WebSocket error:', error.message);
});
