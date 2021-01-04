import React from "react";
import io from "socket.io-client";

import "./Chat.css";

let socket;

const Chat = () => {
  socket = io("localhost:5000");
  let room;

  console.log(socket);
  return (
    <div className="chatBox">
      <div className="chatInnerBox">
        <div className="infoBar">
          <p>{room}</p>
        </div>
        <div className="messages">
          <p className="message">test message</p>
        </div>
        <div className="input">
          <input type="text" className="test" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
