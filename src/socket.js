import io from 'socket.io-client';
const socket = io("http://localhost:9999")

export default socket;