import React from "react";
import io from "socket.io-client";

let socket;

const Chat = () => {
  socket = io("localhost:5000");

  console.log(socket);
  return (
    <div className="chat-box">
      <h1>chat page!</h1>
      <p> asd</p>
    </div>
  );
};

export default Chat;
