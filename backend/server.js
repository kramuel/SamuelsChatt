const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const fs = require("fs");

const date = new Date().toLocaleDateString();
const fileName = path.join(__dirname, "./textlogs/", date) + ".json";

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  timeStamp,
  logData,
} = require("./users.js");

const PORT = 5000;
const local_ip = ["192.168.10.131", "0.0.0.0"];

const app = express();

//"startar server"
const server = app.listen(PORT, local_ip[1], () =>
  console.log(`servern har startat på port: ${PORT} `)
);

//sockets!!
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

//API???
app.get("/api/:day/", (req, res) => {
  let file = path.join(__dirname, "./textlogs/", req.params.day) + ".json";
  fs.readFile(file, (err, data) => {
    if (err) return console.log(err);
    let jsonLog = JSON.parse(data).messages;
    res.send(jsonLog);
  });
});
app.get("/api/:day/:user", (req, res) => {
  let file = path.join(__dirname, "./textlogs/", req.params.day) + ".json";

  fs.readFile(file, (err, data) => {
    if (err) return console.log(err);

    let jsonLog = JSON.parse(data).messages;

    let a = jsonLog.filter((msg) => {
      return msg.user === req.params.user;
    });
    res.send(a);
  });
});

//använd dessa för build sen!!!
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

//får/ger en socket när eventet'connection' kommer
io.on("connect", function (socket) {
  socket.on("join", ({ name, room }, callback) => {
    //skickar in ett obj (som blir user), som antinen returnar user eller error(om error)
    const { error, user } = addUser({ id: socket.id, name: name, room: room });

    //om vi fick ett error från addUser, callbacka error obj
    if (error) return callback(error);

    //sorterar alla sockets i rooms
    socket.join(user.room);

    console.log(`${timeStamp()} -${user.name}- har joinat -${user.room}-!`);
    let msg = {
      user: "ChatBot",
      text: `${user.name} har joinat rum: ${user.room}!`,
      time: timeStamp(),
    };
    logData(fileName, msg);

    //join msg!!***!!
    io.to(user.room).emit("message", msg);

    io.to(user.room).emit("roomUsers", getUsersInRoom(user.room));

    //tom callback om allt gick bra
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    //får vilken unik socket som skickade eventet sendmessage
    const user = getUser(socket.id);

    console.log(`${timeStamp()} -${user.name}- wrote:  -${message}-!`);
    let msg = {
      user: user.name,
      text: message,
      time: timeStamp(),
    };
    logData(fileName, msg);
    //sckickar eventeten 'message' till user.room med obj. user,name (samma som message i chat.js)
    io.to(user.room).emit("message", msg);

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      console.log(
        `${timeStamp()} -${user.name}- har disconnectat från rum: ${user.room}!`
      );
      let msg = {
        user: "ChatBot",
        text: `${user.name} har disconnectat!`,
        time: timeStamp(),
      };
      logData(fileName, msg);
      io.to(user.room).emit("message", msg);

      io.to(user.room).emit("roomUsers", getUsersInRoom(user.room));
    }
  });
});
