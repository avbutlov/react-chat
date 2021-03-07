const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const rooms = {};

io.on("connection", (socket) => {
  
  socket.on("roomCreate", (userName, roomId) => {
    socket.join(roomId);
    rooms[roomId] = {
      users: new Map([[socket.id, userName]]),
      messages: [],
    };
    io.in(roomId).emit("setUsers", [...rooms[roomId].users.values()]);
  });

  socket.on('roomJoin', (userName, roomId) => {
    socket.join(roomId);
      if (rooms[roomId]) {
          rooms[roomId].users.set(socket.id, userName)
          io.in(roomId).emit("setUsers", [...rooms[roomId].users.values()]);
          io.in(roomId).emit('setMessages', rooms[roomId].messages);
      }
  })

  socket.on('disconnect', () => {
    for (let room in rooms) {
        if (rooms[room].users.delete(socket.id)) {
            const users = [...rooms[room].users.values()];
            io.in(room).emit("setUsers", users);
          }
    }
  })

  socket.on('sendMessage', ({messageText, userName, roomId}) => {

    rooms[roomId].messages.push({
        messageText,
        userName
    })

    io.in(roomId).emit('setMessages', rooms[roomId].messages);

  })
});

const PORT = process.env.PORT || 9999; 

http.listen(PORT, () => {
  console.log("Server is running...");
});
