const io = require('socket.io-client');

// Replace 'http://localhost:3000' with the actual URL of your Socket.IO server
const socket = io('http://localhost:5000');

// Listen for the 'connect' event, which is emitted when the connection is established
socket.on('connect', () => {
  console.log('Connected to Socket.IO server');

  // Emit a 'message' event to the server
  socket.emit('message', 'Hello from backend!');
});

// Listen for the 'message' event from the server
socket.on('message', (data) => {
  console.log('Message from server:', data);

  // Close the connection after receiving a message (optional)
  socket.disconnect();
});

// Listen for the 'disconnect' event, which is emitted when the connection is closed
socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});
