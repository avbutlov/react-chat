import React, { useState, useEffect } from "react";
import Login from "../login/login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import socket from "../../socket";
import ChatRoom from "../chat-room/chat-room";
import "./app.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [entered, setEntered] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);

  // this function add inforamtion about user and room when user wants to create or join room
  const onAuth = (userName, roomId) => {
    setEntered(true);
    setCurrentUser(userName);
    setCurrentRoom(roomId);
  };

  // this useEffect hook is substitution for componentDidMount
  useEffect(() => {
    // this recieves information about new users from server
    socket.on("setUsers", (newUsers) => {
      setUsers(newUsers);
    });

    // this recieves information about new messages from server
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
            // this code shows to user Login component if he is not authenticated else he sees chatroom which he joined
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
