const { Server } = require("socket.io");
module.exports = (httpsServer) => {
  const io = new Server(httpsServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("join_room", (data) => {
      const connectSockets = io.sockets.adapter.rooms.get(data.roomId);
      const socketRooms = Array.from(socket.rooms.values()).filter(
        (r) => r !== socket.id
      );
      if (
        socketRooms.length > 0 ||
        (connectSockets && connectSockets.size === 2)
      ) {
        socket.emit("room_joined", false);
      } else {
        socket.join(data.roomId);
        socket.emit("room_joined", true);
        if (io.sockets.adapter.rooms.get(data.roomId).size === 2) {
          socket.emit("start_game", { start: true, symbol: 1 });
          socket
            .to(data.roomId)
            .emit("start_game", { start: false, symbol: 2 });
        }
      }
    });
    socket.on("update_game", (message) => {
      const socketRooms = Array.from(socket.rooms.values()).filter(
        (r) => r !== socket.id
      );
      const gameRoom = socketRooms && socketRooms[0];
      socket.to(gameRoom).emit("on_game_update", message);
    });
  });

  return io;
};
