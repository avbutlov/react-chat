import axios from "axios";
import io from 'socket.io-client'
import React, { useState, useEffect } from "react";
import socket from "../../socket";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { v4 as uuidV4 } from 'uuid';

const Login = ({ roomLink }) => {
  const [userName, setUserName] = useState("");
  const roomId = roomLink || uuidV4();

  const onLogin =  () => {
    if (!userName) {
      return alert("Incorrect data");
    }
        if (!roomLink) {
    socket.emit("roomCreate", userName, roomId);
        } else {
    socket.emit("roomJoin", userName, roomId);
        }
  };


  return (
    <div className="input-field">
      <h5>To {roomLink ? "to join this" : "create new"} room type your name</h5>
      <input
        placeholder="userName"
        id="userID"
        type="text"
        className="validate"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Link to={`/${roomId}`}>
        <button
          className="waves-effect waves-light btn-large"
          onClick={onLogin}
        >
          enter
        </button>
      </Link>
    </div>
  );
};

export default Login;
