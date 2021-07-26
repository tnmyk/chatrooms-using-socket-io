const app = require("express")();
const server = require("http").createServer(app);
const port = process.env.PORT || 8000;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
server.listen(port);

io.on("connection", (socket) => {
  console.log("Someone Connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    if (!io.sockets.adapter.rooms.get(room)) return;

    const clientsInRoom = io.sockets.adapter.rooms.get(room).size;
    io.to(room).emit("number", clientsInRoom);
  });

  socket.on('unsub',(room)=>{
    socket.leave(room)
    // const clientsInRoom = io.sockets.adapter.rooms.get(room).size;
    // io.to(room).emit("number", clientsInRoom)
  })
  socket.on('disconnecting',()=>{
      socket.rooms.forEach(room=>{
          console.log(io.sockets.adapter.rooms.get(room).size);
          const clientsInRoom = io.sockets.adapter.rooms.get(room).size-1;
          io.to(room).emit("number", clientsInRoom);
      })
  })
});

app.get("/", (req, res) => {
  res.send("Server is active!");
});
