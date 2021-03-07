const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const { v4: uuidV4 } = require("uuid");
app.use(express.json());

const rooms = {};

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("dwdw");
});

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
});

http.listen(9999, () => {
  console.log("Server is running...");
});
