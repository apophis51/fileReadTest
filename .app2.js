const express = require('express');
const { exec } = require('child_process');
const cool = require('./newtest2')

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let currentWorkingDirectory = __dirname; // Initial working directory is set to the directory where the script is located

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/run-script', (req, res) => {
  try {
    // Require and execute the JavaScript file
    const script = require('./newtest2');
    // script.run(); // Assuming there is a run function in your script.js
    // res.send('Script executed successfully');
  } catch (error) {
    console.error('Error executing script:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/execute', (req, res) => {
  const command = req.body.command;

  if (!command) {
    return res.status(400).json({ error: 'Command not provided' });
  }

  // Change the working directory before executing the command
  process.chdir(currentWorkingDirectory);

  // Execute the command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message, stderr });
    }

    // Update the current working directory if 'cd' command is used
    if (command.startsWith('cd ')) {
      const newPath = command.substring(3).trim();
      currentWorkingDirectory = newPath;
    }

    res.json({ result: stdout, stderr });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
