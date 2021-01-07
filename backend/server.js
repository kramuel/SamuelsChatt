const express = require("express");
const socketio = require("socket.io");
const path = require("path");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = 5000;

const app = express();

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
    const { error, user } = addUser({ id: socket.id, name: name, room: room });

    //om vi fick ett error från addUser, callbacka error obj
    if (error) return callback(error);

    //join msg
    socket.emit("message", {
      user: "ChatBot",
      text: `${user.name} har joinat rummet!`,
    });

    //sorterar alla sockets i rooms
    socket.join(user.room);

    //tom callback om allt gick bra
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    //får vilken unik socket som skickade eventet sendmessage
    const user = getUser(socket.id);
    console.log(user.name, "sent msg:", message, "to room: ", user.room);
    //sckickar eventeten 'message' till user.room med obj. user,name (samma som message i chat.js)
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      console.log(`${user.name} har disconnectat!`);
    }
  });
});
