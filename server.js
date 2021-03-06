const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('dwdw')
})

server.listen(7777, () => {
    console.log('Server is running...')
})