const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });

// app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('dwdw')
})

io.on('connection', socket => {
    console.log(socket.id)
})

http.listen(9999, () => {
    console.log('Server is running...')
})