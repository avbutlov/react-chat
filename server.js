const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const path = require("path");

// this middleware is for production version, for provide server ability use static files
app.use(express.static(path.join(__dirname, "build")));

// this get request is for production version, for provide server ability to use react routes as real url
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// this is database
const rooms = {};

// this block provides connection between server and client by socket.io
io.on("connection", (socket) => {
  // this event starts work when new user create new room
  socket.on("roomCreate", (userName, roomId) => {
    // users's socket join specific room
    socket.join(roomId);
    // database updates with new room and new user in this room
    rooms[roomId] = {
      users: new Map([[socket.id, userName]]),
      messages: [],
    };
    // socket sends to client information about new user in room
    io.in(roomId).emit("setUsers", [...rooms[roomId].users.values()]);
  });

  // this event starts work when new user join existing room
  socket.on("roomJoin", (userName, roomId) => {
    socket.join(roomId);

    if (rooms[roomId]) {
      // this adds user to database
      rooms[roomId].users.set(socket.id, userName);
      // socket sends to client information about new user in room
      io.in(roomId).emit("setUsers", [...rooms[roomId].users.values()]);
      // socket sends to client information about all messages in this room to show them to new user
      io.in(roomId).emit("setMessages", rooms[roomId].messages);
    }
  });

  // this event starts work when user disconnects from room
  socket.on("disconnect", () => {
    for (let room in rooms) {
      // code in condition tries to delete disonnected user from room if he exists and returns true
      if (rooms[room].users.delete(socket.id)) {
        const users = [...rooms[room].users.values()];
        // socket sends to client updated information about users in room
        io.in(room).emit("setUsers", users);
      }
    }
  });

  // this event starts work when user sends message in chatroom
  socket.on(
    "sendMessage",
    ({ messageText, userName, roomId, hours, minutes }) => {
      if (minutes.toString().length < 2) {
        minutes = `0${minutes}`;
      }

      // this block adds message's information in database
      rooms[roomId].messages.push({
        messageText,
        userName,
        hours,
        minutes,
      });
      // socket sends to client updated information about messages
      io.in(roomId).emit("setMessages", rooms[roomId].messages);
    }
  );
});

const PORT = process.env.PORT || 9999;

http.listen(PORT, (err) => {
  if (err) {
    throw new Error(err);
  }

  console.log("Server is running...");
});
