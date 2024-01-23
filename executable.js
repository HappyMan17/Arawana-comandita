const { spawn } = require('node:child_process')

// start the `ping google.com` command
const front = spawn('serve', ['-p', '8080', 'dist/'], { shell: true });
const back = spawn('cd back && npm i && npm run dev', { shell: true });
// const command = spawn('npm', ["bin", "-g"]);

// the `data` event is fired every time data is
// output from the command
front.stdin.on('data', output => {
    // the output data is captured and printed in the callback
    console.log("Output: ", output.toString())
})
front.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
})

// back
back.stdin.on('data', output => {
    // the output data is captured and printed in the callback
    console.log("Output: ", output.toString())
})
back.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
})