// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const express = require('express'); // eslint-disable-line
const http = require('http'); // eslint-disable-line
const jsonParse = require('body-parser').json(); // eslint-disable-line
const { Server } = require('socket.io'); // eslint-disable-line
const pty = require('node-pty'); // eslint-disable-line
const fs = require('fs'); // eslint-disable-line
const cors = require('cors'); // eslint-disable-line
const osu = require('node-os-utils'); // eslint-disable-line
const si = require('systeminformation'); // eslint-disable-line

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: '*' }));

app.post('/settings', (_, res) => {
  if (fs.existsSync('settings/general.json')) {
    const data = fs.readFileSync('settings/general.json', 'utf8');
    res.status(200).send(JSON.parse(data));
  } else {
    res.sendStatus(404);
  }
});

app.post('/setsettings', jsonParse, (req, res) => {
  const data = req.body;
  fs.writeFileSync('settings/general.json', JSON.stringify(data));
  res.sendStatus(200);
});

const io = new Server(server, {
  cors: {
    origin: '*',
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
  socket.on('request osu', async (_) => {
    const cpu = await osu.cpu.usage();
    const ram = await osu.mem.used();
    const strg = await osu.drive.used();
    const uptime = osu.os.uptime();
    const battery = await si.battery();
    io.emit('osu message', {
      cpu,
      ram: Math.round((ram.usedMemMb / ram.totalMemMb) * 10000) / 100,
      strg: parseFloat(strg.usedPercentage),
      uptime,
      battery: battery.percent,
    });
  });
});

ptyProcess.onData((data) => {
  lastMessage += data;
  io.emit('terminal message', data);
});

server.listen(3001);
