import jwt from "jsonwebtoken";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { SECRET_KEY } from "../config.js";

export async function newMessage(message) {
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

  return messageSaved;
}

