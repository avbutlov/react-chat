import React, { useState } from "react";
import socket from "../../socket";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const Login = ({onAuth, roomLink }) => {
  const [userName, setUserName] = useState("");
  const roomId = roomLink || uuidV4();

  const onLogin = () => {
    
    if (!roomLink) {
      socket.emit("roomCreate", userName, roomId);
    } else {
      socket.emit("roomJoin", userName, roomId);
    }

    onAuth(userName, roomId);

  };

  return (
    <div className="input-field">
      <h5>
        To {roomLink ? <b>join this</b> : <b>create new</b>} room, please, type your name
      </h5>
      <input
        placeholder="userName"
        id="userID"
        type="text"
        className="validate"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Link to={`/${roomId}`} onClick={userName ? onLogin : e => e.preventDefault(alert('Incorrect data'))}>
        <button
          className="waves-effect waves-light btn-large"
        >
          enter
        </button>
      </Link>
    </div>
  );
};

export default Login;
