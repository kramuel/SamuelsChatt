const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = 5000;

const app = express();

//fixar (backend)routes
//app.use(router);

//"startar server"
const server = app.listen(PORT, () =>
  console.log(`servern har startat på port: ${PORT} `)
);

//sockets!!
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

//använd dessa för build sen!!!
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

//får/ger en socket när eventet'connection' kommer
io.on("connect", function (socket) {
  socket.on("join", ({ name, room }, callback) => {
    //skickar in ett obj (som blir user), som antinen returnar user eller error(om error)
    const { error, user } = addUser({ id: socket.id, name:name, room:room });

    console.log("log i join socket" + name);
    //console.log(`${user.name} joinade precis! ${user.room}`);

    //om vi fick ett error från addUser, callbacka error obj
    if (error) return callback(error);

    socket.emit("message", {
      user: "ChatBot",
      text: `${user.name} har joinat rummet!`,
    });

    socket.join(user.room);

    //callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    //console.log(`${user.name} har disconnectat!`);
  });
});
