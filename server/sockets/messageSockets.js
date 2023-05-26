import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export async function newMessage(message, userId) {
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

  const messageSavedJSON = messageSaved.toJSON();

  return {
    body: messageSavedJSON.body,
    user: messageSavedJSON.user,
    chat: messageSavedJSON.chat,
    createdAt: messageSavedJSON.createdAt,
  };
}

