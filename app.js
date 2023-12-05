const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server to serve as a basis for WebSocket
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server\n');
});

// Create a WebSocket server by passing the HTTP server
const wss = new WebSocket.Server({ server });

// Set up a connection event handler
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 3000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
