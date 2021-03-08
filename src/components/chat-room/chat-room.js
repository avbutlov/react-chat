import React from "react";
import MessageForm from "../message-form/message-form";
import Messages from "../messages/messages";
import OnlineUsers from "../online-users/online-users";
import "./chat-room.css";

const ChatRoom = ({ users, userName, roomId, messages }) => {
  return (
    <React.Fragment>
      <span className="invite">
        To invite your friends send them this link:{" "}
        <b>{window.location.href}</b>
      </span>
      <div className="chat-room">
        <div className="messages-wrapper">
          <Messages messages={messages} userName={userName} />
          <MessageForm roomId={roomId} userName={userName} />
        </div>
        <OnlineUsers users={users} />
      </div>
    </React.Fragment>
  );
};

export default ChatRoom;
