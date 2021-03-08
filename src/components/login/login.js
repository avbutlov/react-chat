import React, { useState } from "react";
import socket from "../../socket";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import './login.css';

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

  // socket.on("reservedName", userName => {
  //   alert(`Sorry, but name ${userName} has already taken`);
  // })

  return (
    <div className="input-field">
      <span className='login-info'>
        To {roomLink ? <b>join this</b> : <b>create new</b>} room, please, type your name
      </span>
      <input
        placeholder="Your name"
        id="userID"
        type="text"
        className="validate"
        required={true}
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
