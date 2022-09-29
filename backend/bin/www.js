#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../server');
const debug = require('debug')('server:server');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '5000');
console.log(`listen to ${port}`)
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

// Production
//db config
const db = require('../config/keys').mongoURI;

mongoose.set("useUnifiedTopology", true); //to avoid deprecation warnings

//connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    server.listen(port);
    console.log("Mongodb connected")
  })
  .catch((err) => console.log(err));


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
