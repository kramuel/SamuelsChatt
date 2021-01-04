import React from "react";
import io from "socket.io-client";

import "./Chat.css";

let socket;

const Chat = () => {
  socket = io("localhost:5000");
  let room = "example";

  const handleSendMessage = (e) => {
    console.log(e.target.value);
  };

  console.log(socket);
  return (
    <div className="chatBox">
      <div className="chatInnerBox">
        <div className="infoBar">
          <div className="infoBarLeft">
            <p>{room}</p>
          </div>
          <div className="infoBarRight">
            <a href="/" className="exit">
              X
            </a>
          </div>
        </div>
        <div className="messages">
          <p className="message">test message</p>
        </div>

        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Skriv ett meddelande..."
          />
          <button className="sendButton" onClick={handleSendMessage}>
            Send
          </button>
        </form>
      </div>
      <div className="userBox"></div>
    </div>
  );
};

export default Chat;
