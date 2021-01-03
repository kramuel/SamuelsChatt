const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const router = require("./router");

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

//får en socket när eventet'connection' kommer
io.on("connection", (socket) => {
  console.log("ny connection!!!!");

  socket.on("disconnect", () => {
    console.log("någon har disconnectat");
  });
});
