// TCP Server
const net = require('net');

const server = net.createServer(socket => {
  // New client connected
  console.log('Client connected');

  // Handle data received from the client
  socket.on('data', data => {
    console.log(`Received data: ${data.toString()}`);
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3001;

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
