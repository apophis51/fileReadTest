const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ message: 'welcome' }));

  // Listen for messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(JSON.stringify({ message: 'we received your message' }));

    // Parse the incoming message
    const parsedMessage = JSON.parse(message);

    // Check for the 'terminalEvent' type
    if (parsedMessage.type === 'terminalEvent') {
      // Respond to the terminal event
      ws.send(JSON.stringify({ message: 'Response to terminal event', type: 'terminalEvent' }));
    }

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

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
