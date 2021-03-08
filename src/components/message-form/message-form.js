import React, { useState } from 'react'
import socket from '../../socket';
import './message-form.css'

const MessageForm = ({userName, roomId}) => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = () => {
    if (messageText.length > 0) {
      socket.emit("sendMessage", {
        messageText,
        userName,
        roomId,
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
      });
  
      setMessageText("");
    }
    };
    
    return (
        <form>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
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
    )
}

export default MessageForm;