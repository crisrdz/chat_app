import Message from "./models/Message.js";

const sockets = (io) => {
  io.on("connection", (socket) => {

    socket.on("client:joinchats", (chats) => {
      chats.forEach((chat) => {
        socket.join(`chat:${chat._id}`);
      });
    });

    socket.on("client:newmessage", async (message) => {
      const newMessage = new Message({
        body: message.body,
        chat: message.chat,
        user: message.user,
      });

      const messageSaved = await newMessage.save();

      socket.to(`chat:${message.chat}`).emit("server:newmessage", messageSaved);
    });

  });
};

export default sockets;
