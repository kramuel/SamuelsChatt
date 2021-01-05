import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleRoomInput = (e) => {
    setRoom(e.target.value);
  };

  const handleLink = (e) => {
    if (!name || !room) {
      e.preventDefault();
    }
  };

  return (
    <div className="joinBox">
      <div className="joinInnerBox">
        <h3 className="heading">Samuels Chatt!</h3>
        <div>
          <input
            placeholder="Namn.."
            className="joinInput"
            type="text"
            onChange={handleNameInput}
          />
        </div>
        <div>
          <input
            placeholder="Rum.."
            className="joinInput mt-20"
            type="text"
            onChange={handleRoomInput}
          />
        </div>
        <Link onClick={handleLink} to={`/chat?name=${name}&room=${room}`}>
          <button className={"button mt-20"} type="submit">
            Logga in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
