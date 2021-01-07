import React, { useState, useEffect } from "react";
import * as io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import querystring from "query-string";

import "./Chat.css";

let socket;

//location =property från React Router
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ENDPOINT = "192.168.10.131:5000";

  //körs när chat laddas
  useEffect(() => {
    //ta query-datan
    const { name, room } = querystring.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    //skickar (name och room) med eventet (join) /får error från callback
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    //unmounting/disconnect!!!
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  //för att hantera inkommande meddelanden
  useEffect(() => {
    socket.on("message", (incMsg) => {
      setMessages([...messages, incMsg]); //lägger till inkommande meddelande, sist i arrayen
    });

    //unsubscribar socketen från eventet(så att inte fler o fler bara skapas och sparas)
    return () => {
      socket.off();
    };
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    //om det finns ett message
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage(""); //clear message
      });
    }
  };

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
            {messages.map((msg, i) => (
              <div key={i}>{msg.text}</div>
            ))}
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
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? handleSendMessage(event) : null
            }
          />
          <button className="sendButton" onClick={(e) => handleSendMessage(e)}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
