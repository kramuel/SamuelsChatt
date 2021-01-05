const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = 5000;

const app = express();

//fixar (backend)routes
app.use(router);

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

let count = 0;

//får/ger en socket när eventet'connection' kommer
io.on("connection", (socket) => {
  count++;
  console.log(`ny connection!!!! ${count}`);

  socket.on("join", ({ name, room }, callback) => {
    const user = addUser(socket.id, name, room);
    console.log(`${user} joinade precis! ${user.room}`);
    //callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    count--;
    console.log(`${user} har disconnectat! ${count}`);
  });
});
