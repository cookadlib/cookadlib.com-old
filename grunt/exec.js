/**
 * Execute shell commands
 */
module.exports = {

  setMaxfiles: {
    command: 'launchctl limit maxfiles 1024 2048',
    stdout: true,
    stderr: true
  }

};
