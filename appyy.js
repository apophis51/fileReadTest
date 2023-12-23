const WebSocket = require('ws');
const http = require('http');
const pty = require('node-pty');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

var shell = 'sh';
var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

var ptyProcess2 = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

function removeANSIEscapeCodes(input) {
  // Define the regular expression to match ANSI escape codes
  const ansiEscapeRegex = /\x1B\[[0-9;]*[JKmsu]/g;

  // Replace ANSI escape codes with an empty string
  const cleanedOutput = input.replace(ansiEscapeRegex, '');

  return cleanedOutput;
}

// Move the 'data' event listener outside of the 'connection' event handler
ptyProcess.on('data', (data) => {
  // Handle 'data' event
  let output = data;
  console.log(`************ stdout: ${data}`);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ message: output }));
      console.log('sent to client', JSON.stringify({ message: output }))
    }
  });
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ message: '...' }));

  // Listen for messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Parse the incoming message
    const parsedMessage = JSON.parse(message);

    // check for the 'chatMessage' type
    if (parsedMessage.type === 'chatMessage') {
      let output = message;
      console.log('fuck yeah')
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ message: parsedMessage }));
          console.log('sent to client', JSON.stringify({ message: parsedMessage }))
        }
      });
    }

    // Check for the 'terminalEvent' type
    if (parsedMessage.type === 'terminalEvent') {
      let terminalCommand = parsedMessage.data;
      ptyProcess.write(terminalCommand);
    }
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
