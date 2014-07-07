/**
 * forever task for grunt to start, stop and restart an application as a daemon.
 */
module.exports = {

  app: {
    options: {
      command: 'n use 0.11.13 --harmony',
      index: 'app.js',
      logDir: 'logs'
    }
  },

};
