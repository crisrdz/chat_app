import jwt from "jsonwebtoken";
import { newMessage } from "./sockets/messageSockets.js";
import { SECRET_KEY } from './config.js';

const sockets = (io) => {
  io.on("connection", (socket) => {
    let userId;

    socket.on("client:joinuser", (token) => {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        userId = decoded.userId;  
        socket.join(`user:${userId}`);
      } catch (error) {
        socket.emit("server:error", "Token inválido");
      }
    })

    socket.on("client:joinchats", (chats) => {
      chats.forEach((chat) => {
        socket.join(`chat:${chat._id}`);
      });
    });

    socket.on("client:newmessage", async (message) => {
      const messageSaved = await newMessage(message, userId);

      socket.to(`chat:${message.chat}`).emit("server:newmessage", messageSaved);
    });
  });
};

export default sockets;
