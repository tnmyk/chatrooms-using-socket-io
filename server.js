const fs = require('fs')
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
const rooms = {};
const usersInRoom = {};
io.on("connection", (socket) => {
  io.emit("rooms", rooms);
  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);
    if (!usersInRoom[room]) usersInRoom[room] = [socket.id];
    else usersInRoom[room].push(socket.id);

    users[socket.id] = username;
    io.to(room).emit(
      "usersInRoom",
      usersInRoom[room].map((x) => {
        return users[x];
      })
    );
    if (!io.sockets.adapter.rooms.get(room)) return;

    const clientsInRoom = io.sockets.adapter.rooms.get(room).size;
    io.to(room).emit("number", clientsInRoom);
    rooms[room] = clientsInRoom;
    io.emit("rooms", rooms);
    io.to(room).emit("newMessage", {
      type: "userschange",
      action: "joined",
      username: users[socket.id],
    });
  });

  socket.on("message", async ({ room, messageData }) => {
    if(messageData.type==='image'){
      // console.log('yes')
      //  const buffer = Buffer.from(messageData.message, "base64");
      //  await fs.writeFile("/tmp/images", buffer).catch(console.error);
      return io.to(room).emit('newMessage',{...messageData,['message']:messageData.message})
    }

    io.to(room).emit("newMessage", messageData);
  });
  socket.on("unsub", ({ room, username }) => {
    if (!io.sockets.adapter.rooms.get(room)) return;
    usersInRoom[room] = usersInRoom[room].filter(
      (userInRoom) => userInRoom !== socket.id
    );
    io.to(room).emit(
      "usersInRoom",
      usersInRoom[room].map((x) => {
        return users[x];
      })
    );
    const clientsInRoom = io.sockets.adapter.rooms.get(room).size - 1;
    socket.leave(room);
    rooms[room] = clientsInRoom;
    if (rooms[room] <= 0) delete rooms[room];
    io.emit("rooms", rooms);
    io.to(room).emit("number", clientsInRoom);
    io.to(room).emit("newMessage", {
      type: "userschange",
      action: "left",
      username: username,
    });
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach(async (room) => {
      const clientsInRoom = io.sockets.adapter.rooms.get(room).size - 1;
      if (usersInRoom[room]) {
        usersInRoom[room] = usersInRoom[room].filter(
          (userInRoom) => userInRoom !== socket.id
        );

        io.to(room).emit(
          "usersInRoom",
          usersInRoom[room].map((x) => {
            return users[x];
          })
        );
      }
      io.to(room).emit("number", clientsInRoom);
      rooms[room] = clientsInRoom;
      if (rooms[room] <= 0) delete rooms[room];
      io.emit("rooms", rooms);
      await io.to(room).emit("newMessage", {
        type: "userschange",
        action: "left",
        username: users[socket.id],
      });
    });
    delete users[socket.id];
  });
});

app.get("/", (req, res) => {
  res.send("Server is active!");
});
