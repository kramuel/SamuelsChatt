//håller koll på users! -lägger till tar bort osv
const fs = require("fs");
const users = [];

//new user(socket instans)
const addUser = ({ id, name, room }) => {
  //save usernames in lowercase+trimed
  //Samuel Karlström ->samuelkarlström
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // check if user already exist ( same username)
  const existingUser = users.find(function (user) {
    return user.room === room && user.name === name;
  });

  if (existingUser) {
    return { error: "Upptaget användarnamn" };
  }

  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex(function (user) {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find(function (user) {
    return user.id === id;
  });
};

const getUsersInRoom = (room) =>
  users.filter(function (user) {
    return user.room === room;
  });

const timeStamp = () => {
  let time = new Date();
  let timeStamp = time.toLocaleTimeString("sv-SE", {
    hour: "numeric",
    minute: "numeric",
  });
  return timeStamp;
};

const logData = (fileName, msg) => {
  if (fs.existsSync(fileName)) {
    fs.readFile(fileName, (err, data) => {
      if (err) return console.log(err);
      let jsonLog = JSON.parse(data);
      jsonLog["messages"].push(msg);
      fs.writeFile(
        fileName,
        JSON.stringify(jsonLog, null, 2),
        function writeJSON(err) {
          if (err) return console.log(err);
          console.log("writing to log file");
        }
      );
    });
  } else {
    let obj = {
      messages: [],
    };
    obj.messages.push({
      user: "SERVER",
      text: "SERVER STARTED",
      time: timeStamp(),
    });
    fs.writeFile(
      fileName,
      JSON.stringify(obj, null, 2),
      function writeJSON(err) {
        if (err) return console.log(err);
        console.log("writing to " + msg.time + ".json");
      }
    );
  }
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  timeStamp,
  logData,
};
