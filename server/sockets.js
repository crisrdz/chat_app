import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config.js";
import Chat from "./models/Chat.js";
import Message from "./models/Message.js";

const sockets = (io) => {
  io.on("connection", (socket) => {
    socket.on("client:joinchats", (chats) => {
      chats.forEach((chat) => {
        socket.join(`chat:${chat._id}`);
      });
    });

    socket.on("client:newmessage", async (message) => {
      const { userId } = jwt.verify(message.userToken, SECRET_KEY);

      const newMessage = new Message({
        body: message.body,
        chat: message.chat,
        user: userId,
      });

      const messageSaved = await newMessage.save();
      const chat = await Chat.findById(messageSaved.chat);

      const messages = chat.messages;
      messages.unshift(messageSaved._id);

      chat.messages = messages;
      await chat.save();

      socket.to(`chat:${message.chat}`).emit("server:newmessage", messageSaved);
    });
  });
};

export default sockets;
