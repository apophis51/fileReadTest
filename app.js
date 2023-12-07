var pty = require('node-pty');

var shell = 'bash'

var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

ptyProcess.on('data', (data) => {
    console.log(`************ stdout: ${data}`);
    io.emit('money', data.toString());
  });

ptyProcess.onData((data) => {
  process.stdout.write(data);
  io.emit('money', data.toString());
});

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
//
// Set up a connection event handler
io.on('connection', (socket) => {
  console.log('A computer connected');

  // Handle custom events from the client
  socket.on('message', (data) => {
    console.log('Message from client:', data);
//
    // Broadcast the message to all connected clients
    // io.emit('message', data);
    io.emit('message', 'Thank you for connecting')
  });

  socket.on('terminal', (data) => {
    ptyProcess.write(data + '\r');
    console.log('processed: ', data);
    io.emit('terminal', data);
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Serve a simple HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server (Socket.IO) listening on port ${PORT}`);
});