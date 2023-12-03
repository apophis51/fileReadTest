const { spawn } = require('child_process');

// Spawn a shell (e.g., bash)
const shell = spawn('bash');

// Handle data events (stdout and stderr)
shell.stdout.on('data', (data) => {
  console.log(` ${data}`);
});

shell.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Handle exit event
shell.on('exit', (code) => {
  console.log(`Child process exited with code ${code}`);
});

// Send commands to the shell
console.log('ls -l\n')
shell.stdin.write('ls -l\n');
shell.stdin.write('echo "Hello, Terminal"\n');
// shell.stdin.write('exit\n');
console.log('cd ..')
shell.stdin.write('cd ..\n');
console.log('ls')
shell.stdin.write('ls\n');
console.log('history')
shell.stdin.write('ffuf\n');
shell.stdin.write('ffuf -w common.txt -u http://ffuf.me/cd/basic/FUZZ');
