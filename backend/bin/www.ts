#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.js';
import debugModule from 'debug'; // Debugging messages
import https from 'https';
import fs from 'fs';
import { AddressInfo } from 'net';

const debug = debugModule('backend:server');

const options = {
  key: fs.readFileSync('../key.pem'),
  cert: fs.readFileSync('../cert.pem'),
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '5001');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Trying another port...`);
    server.listen(0); // Essaie un port aléatoire
  } else {
    throw err;
  }
});

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | string | false {
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

function onError(error: NodeJS.ErrnoException): void {
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
  const addr = server.address() as AddressInfo;
  if (addr === null) {
    console.error('Server address is null');
    return;
  }

  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + (addr as AddressInfo).port;

  debug('Listening on ' + bind);
}
