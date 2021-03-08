import React, { useState, useEffect } from "react";
import Login from "./components/login/login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import socket from "./socket";
import ChatRoom from "./components/chat-room/chat-room";

const App = () => {
  const [users, setUsers] = useState([]);
  const [entered, setEntered] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);

  const onAuth = (userName, roomId) => {
    setEntered(true);
    setCurrentUser(userName);
    setCurrentRoom(roomId);
  };

  useEffect(() => {
    socket.on("setUsers", (newUsers) => {
      setUsers(newUsers);
    });
    socket.on("setMessages", (newMessages) => {
      setCurrentMessages(newMessages);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Route
          path="/:id?"
          render={({ match }) => {
            const { id } = match.params;

            if (!entered) {
              return <Login roomLink={id} onAuth={onAuth} />;
            } else {
              return (
                <ChatRoom
                  users={users}
                  userName={currentUser}
                  roomId={currentRoom}
                  messages={currentMessages}
                />
              );
            }
          }}
        />
      </Router>
    </div>
  );
};

export default App;
