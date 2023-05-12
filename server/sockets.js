import jwt from "jsonwebtoken";
import { newMessage } from "./sockets/messageSockets.js";
import { SECRET_KEY } from './config.js';
import { newFriendRequest } from "./sockets/friendRequestsSockets.js";

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
      try {
        const messageSaved = await newMessage(message, userId);
        socket.to(`chat:${message.chat}`).emit("server:newmessage", messageSaved);
      } catch (error) {
        socket.emit("server:error", "Error al enviar mensaje");
      }
    });

    socket.on("client:newfriendrequest", async (username) => {
      try {
        const result = await newFriendRequest(username, userId);

        if(!result.success) {
          throw result
        }

        io.to(`user:${result.user._id.toString()}`).emit("server:newfriendrequest", username);
      } catch (error) {
        if(error?.success === false) {
          socket.emit("server:newfriendrequest_error", error.message);
        } else {
          socket.emit("server:newfriendrequest_error", "Error al enviar solicitud de amistad");
        }
      }
    })
  });
};

export default sockets;
