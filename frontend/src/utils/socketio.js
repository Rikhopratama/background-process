import socketClient from 'socket.io-client';
const SOCKET_IO_SERVER = 'http://localhost:4000';

const socket = socketClient(SOCKET_IO_SERVER);

socket.on('connect', () => {
  console.log('Connected to server socket io..', socket.id );
});

export default socket;

