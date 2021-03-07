import React, { useState } from "react";
import socket from "../../socket";
import "./chat-room.css";
import { v4 as uuidV4 } from "uuid";

const Chat = ({ users, userName, roomId, messages }) => {
  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    socket.emit("sendMessage", {
      messageText,
      userName,
      roomId,
    });

    setMessageText("");
  };

  return (
    <div className="chat">
      <div className="chat-users">
        <hr />
        <b>Online: {users.length}</b>
        <ul>
          {users.map((name) => {
            return <li key={uuidV4()}>{name}</li>;
          })}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
          {messages.map((messageData) => {
            return (
              messageData.userName === userName ? <div className="message my-message">
              <p>{messageData.messageText}</p>
              <div><span>You</span>
              </div>
            </div> : 
              <div className="message">
              <p>{messageData.messageText}</p>
              <div><span>{messageData.userName}</span>
              </div>
            </div>
            );
          })}
        </div>
        <form>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="form-control"
            rows="3"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          ></textarea>
          <button
            onClick={sendMessage}
            type="button"
            className="btn btn-primary"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
