var os = require('os');
var pty = require('node-pty');

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

ptyProcess.on('data', (data) => {
    console.log(`************ stdout: ${data}`);
  });

ptyProcess.onData((data) => {
  process.stdout.write(data);
});

ptyProcess.write('ls\r');
// ptyProcess.resize(100, 40);
// ptyProcess.write('ls\r');
// ptyProcess.write('sudo apt install nano\r');
// ptyProcess.write('apophis50\r');
ptyProcess.write('node\r')
ptyProcess.write('console.log(1+3)\r');