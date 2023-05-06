import jwt from "jsonwebtoken";
import Chat from "../models/Chat.js";
import { SECRET_KEY } from "../config.js";

export async function newChat(chat) {
  const { userId } = jwt.verify(chat.user, SECRET_KEY);
  const friendId = chat.friend;

  const chat = await Chat.create({
    users: [userId, friendId],
  });

  await Chat.populate(chat, { path: "users", select: "username -_id" });

  return {
    _id: chat._id,
    users: chat.users,
    messages: chat.messages,
  };
}