const WebSocket = require('ws');
const http = require('http');
const { exec } = require('child_process');

//each time my console.log is reporting more and more duplicate data const WebSocket
// The issue you're facing seems to be related to the fact that you are adding a new event listener for the 'data' event inside the 'connection' event handler every time a WebSocket connection is established. This leads to multiple listeners being attached to the same event, causing the 'data' event to be handled multiple times.

// To fix this issue, you should move the 'data' event listener outside of the 'connection' event handler so that it is only added once when the server starts. Here's a modified version of your code:

// In this modified version, the 'data' event listener is moved outside of the 'connection' event handler to ensure that it's only added once when the WebSocket server starts. This should help prevent the duplication of messages.






const server = http.createServer();
const wss = new WebSocket.Server({ server });

var pty = require('node-pty');
var shell = 'sh'
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



wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ message: 'Welcome To Your Virtual Terminal' }));


  // Listen for messages from clients
  

  
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // ws.send(JSON.stringify({ message: 'we received your message' }));
    //facinating strings act like json
    // let cool = JSON.parse(`${message}`)
    // console.log(cool.message)

    // Parse the incoming message
    const parsedMessage = JSON.parse(message);

    // Check for the 'terminalEvent' type
    if (parsedMessage.type === 'terminalEvent') {
      // Respond to the terminal event
      // ws.send(JSON.stringify({ message: 'Response to terminal event', type: 'terminalEvent' }));

      let terminalCommand = parsedMessage.data

      //ptyProcess.write(terminalCommand + '\r')//bad
      ptyProcess.write(terminalCommand )


      ptyProcess.on('data', (data) => {
        console.log(`************ stdout: ${data}`);
        // let output = data.replace(/apophis51@Allissa/g, '').replace(/:/g, '').replace(/~/g, '').replace(/\$/g, '')
        let output = data
        // let output = JSON.stringify({message: output}).replace('apophis')

        // let output = data
        // let output = data.slice(0, -39)








        

        ws.send(JSON.stringify({ message: output }));
        // ws.send({output})
      });
    
    ptyProcess.onData((data) => {
      process.stdout.write(data);
    });

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
