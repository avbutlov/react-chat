import React, { useState, useEffect, useRef } from "react";
import socket from "../../socket";
import "./chat-room.css";

const ChatRoom = ({ users, userName, roomId, messages }) => {
  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    socket.emit("sendMessage", {
      messageText,
      userName,
      roomId,
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }); 

    setMessageText("");
  };


  return (
   <React.Fragment> 
    <span className='invite'>To invite your friend send him this link: <b>{window.location.href}</b></span>
    <div className="chat-room">
      <div className="messages-wrapper">
        <div className="messages">
          {messages.map((messageData, ind) => {
            return (
              messageData.userName === userName ? <div className="message my-message" key={`${messageData.userName}${ind}`}>
              <span>{`${messageData.hours}:${messageData.minutes}`}</span>
              <p>{messageData.messageText}</p>
              <div><span>You</span>
              </div>
            </div> : 
              <div className="message" key={`${messageData.userName}${ind}`}>
              <p>{messageData.messageText}</p>
              <span>{`${messageData.hours}:${messageData.minutes}`}</span>
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
      <div className="online">
        <b>Online: {users.length}</b>
        <ul>
          {users.map((name, ind) => {
            return <li key={`${name}${ind}`}>{name}</li>;
          })}
        </ul>
      </div>
    </div>
    </React.Fragment>
  );
};

export default ChatRoom;
