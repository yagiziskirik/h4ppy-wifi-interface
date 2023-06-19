// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useEffect } from 'react';
import { type Socket, io } from 'Socket.IO-client';
import { Terminal } from 'xterm';

import 'xterm/css/xterm.css';
let socket: Socket;

export default function Term() {
  useEffect(() => {
    const term = new Terminal();
    term.open(document.getElementById('terminal') as HTMLElement);
    term.onData((data) => {
      socket.emit('chat message', data);
    });

    const socketInitializer = async () => {
      // await fetch('http://localhost:3001');
      socket = io('http://localhost:3001');

      // socket.on('connect', () => {
      //   console.log('connected');
      // });

      socket.on('chat message', (data) => {
        term.write(data);
      });
    };

    socketInitializer();

    return () => {
      socket.disconnect();
    };
  });
  return <div id='terminal' className='text-left'></div>;
}
