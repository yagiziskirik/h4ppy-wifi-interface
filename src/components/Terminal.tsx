// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useEffect } from 'react';
import { type Socket, io } from 'socket.io-client';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import 'xterm/css/xterm.css';
let socket: Socket;

export default function Term() {
  useEffect(() => {
    const term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(document.getElementById('terminal') as HTMLElement);
    fitAddon.fit();
    term.onData((data) => {
      socket.emit('chat message', data);
    });

    const socketInitializer = async () => {
      // await fetch('http://localhost:3001');
      socket = io('http://localhost:3001');

      // socket.on('connect', () => {
      //   console.log('connected');
      // });

      socket.on('terminal message', (data: string) => {
        term.write(data);
      });
    };

    socketInitializer();

    window.addEventListener('resize', () => {
      fitAddon.fit();
    });

    return () => {
      socket.disconnect();
    };
  });
  return <div id='terminal' className='px-2 pb-1 text-left'></div>;
}
