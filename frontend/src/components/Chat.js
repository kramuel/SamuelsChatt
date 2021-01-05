import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import querystring from "query-string";

import "./Chat.css";

let socket;

//location =property från React Router
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  const handleSendMessage = (e) => {
    console.log(e.target.value);
  };

  //körs när chat laddas
  useEffect(() => {
    //ta query-datan
    const { name, room } = querystring.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    //skickar (name och room) med eventet (join)
    socket.emit("join", { name, room });

    //unmounting/disconnect!!!
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

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
        <div className="mainBox">
          <ScrollToBottom className="messages">
            <div className="messageRow">
              <div className="sender"></div>
              <div className="message"></div>
            </div>
          </ScrollToBottom>
          <div className="usersBox">
            <p>{name}</p>
          </div>
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
    </div>
  );
};

export default Chat;
