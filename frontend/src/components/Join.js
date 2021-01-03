import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleRoomInput = (e) => {
    setRoom(e.target.value);
  };

  const handleLink = (e) => {};

  return (
    <div className="join-box">
      <h1 className="heading">Join Chat</h1>
      <div>
        <input
          placeholder="Namn.."
          className="JoinInput"
          type="text"
          onChange={handleNameInput}
        />
      </div>
      <div>
        <input
          placeholder="Rum.."
          className="JoinInput mt-20"
          type="text"
          onChange={handleRoomInput}
        />
      </div>
      <Link onClick={handleLink} to={`/chat?name=${name}&room=${room}`}>
        <button></button>
      </Link>
    </div>
  );
};

export default Join;
