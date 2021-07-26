const app = require("express")();
const server = require("http").createServer(app);
const port = process.env.PORT || 8000;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
server.listen(port);
const users = {};
io.on("connection", (socket) => {

  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);

    users[socket.id] = username;
    if (!io.sockets.adapter.rooms.get(room)) return;

    const clientsInRoom = io.sockets.adapter.rooms.get(room).size;
    io.to(room).emit("number", clientsInRoom);
    io.to(room).emit("newMessage", {
      type: "userschange",
      action: "joined",
      username: users[socket.id],
    });
  });

  socket.on("message", ({ room, messageData }) => {
    io.to(room).emit("newMessage", messageData);
  });
  socket.on("unsub", ({ room, username }) => {
    socket.leave(room);
    if (!io.sockets.adapter.rooms.get(room)) return;
    const clientsInRoom = io.sockets.adapter.rooms.get(room).size;
    io.to(room).emit("number", clientsInRoom);
    io.to(room).emit("newMessage", { type: "left", username: username });
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach(async (room) => {
      const clientsInRoom = io.sockets.adapter.rooms.get(room).size - 1;
      io.to(room).emit("number", clientsInRoom);
      await io
        .to(room)
        .emit("newMessage", { type: "userschange",action:'left' ,username: users[socket.id] });
    });
    delete users[socket.id];
  });
});

app.get("/", (req, res) => {
  res.send("Server is active!");
});
