import React, {useRef, useEffect} from "react";
import './messages.css'

const Messages = ({ messages, userName }) => {

    const newMessage = useRef(null);

// this useEffect hook provides chat scroll down on new messages
    useEffect(() => {
        if (newMessage) {
          newMessage.current.addEventListener("DOMNodeInserted", (e) => {
            const { currentTarget: target } = e;
            target.scroll({ top: target.scrollHeight, behavior: "smooth" });
          });
        }
      }, []);

  return (
    <div className="messages" ref={newMessage}>
      {messages.map((messageData, ind) => {
        return messageData.userName === userName ? (
          <div
            className="message my-message"
            key={`${messageData.userName}${ind}`}
          >
            <span>{`${messageData.hours}:${messageData.minutes}`}</span>
            <p>{messageData.messageText}</p>
            <div>
              <span>You</span>
            </div>
          </div>
        ) : (
          <div className="message" key={`${messageData.userName}${ind}`}>
            <p>{messageData.messageText}</p>
            <span>{`${messageData.hours}:${messageData.minutes}`}</span>
            <div>
              <span>{messageData.userName}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
