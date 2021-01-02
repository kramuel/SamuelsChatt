const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//får en socket när eventet'connection' kommer
io.on("connection", (socket) => {
  console.log("ny connection!!!!");

  socket.on("disconnect", () => {
    console.log("någon har disconnectat");
  });
});

//fixar routes(backend)
app.use(router);

//"startar server"
server.listen(PORT, () => console.log(`servern har startat på port: ${PORT} `));
