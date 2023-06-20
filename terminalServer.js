// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const express = require('express'); // eslint-disable-line
const http = require('http'); // eslint-disable-line
const { Server } = require('socket.io'); // eslint-disable-line
const pty = require('node-pty'); // eslint-disable-line

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const ptyProcess = pty.spawn('zsh', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
});

let lastMessage = '';

io.on('connection', (socket) => {
  io.emit('terminal message', lastMessage);
  socket.on('chat message', (msg) => {
    ptyProcess.write(msg);
  });
});

ptyProcess.onData((data) => {
  lastMessage += data;
  io.emit('terminal message', data);
});

server.listen(3001);
