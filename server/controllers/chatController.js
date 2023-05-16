import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { defaultError } from "../constants.js";
import { isValidObjectId } from 'mongoose'

export const getChats = async (req, res) => {
  try {
    const page = isNaN(req.query.page) ? 1 : req.query.page;
    const limit = 10;
    const skip = limit * (page - 1);

    const chats = await Chat.find(
      { users: req.userId },
      {
        id: 1,
        users: 1,
        messages: 1,
      },
      {
        limit,
        skip,
        sort: "-updatedAt",
      }
    )
      .populate({ path: "users", select: "-_id username" })
      .populate({
        path: "messages",
        select: "-_id body user createdAt",
        options: {
          sort: "-createdAt",
          limit: 1,
        },
        populate: {
          path: "user",
          select: "-_id username",
        },
      })
      .lean();

    return res.json({
      success: true,
      chats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const getChat = async (req, res) => {
  try {
    const chatId = req.params.id;

    if(!isValidObjectId(chatId)){
      return res.status(400).json({
        success: false,
        message: "Chat no válido",
      });
    }

    const chat = await Chat.findById(chatId, { id: 1, users: 1, messages: 1 })
      .populate({ path: "users", select: "username -_id" })
      .populate({
        path: "messages",
        select: "-_id body user createdAt",
        options: { sort: "-createdAt" },
        populate: {
          path: "user",
          select: "-_id username",
        },
      })
      .lean();

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat no encontrado",
      });
    }

    return res.json({
      success: true,
      chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const createChat = async (req, res) => {
  try {
    const { username } = req.body;
    const mate = await User.findOne({ username })

    const chats = await Chat.findOne({users: {$all: [req.userId, mate._id]}});

    if(chats) {
      return res.status(400).json({
        success: false,
        messagge: "Ya tienes un chat con este usuario",
      });
    }

    const chat = await Chat.create({
      users: [req.userId, mate._id],
    });

    await Chat.populate(chat, { path: "users", select: "username -_id" });

    const chatCleaned = {
      _id: chat._id,
      users: chat.users,
      messages: chat.messages,
    };

    const io = req.app.get("io");
    io.to(`user:${mate._id}`).emit("server:newchat", chatCleaned);

    return res.json({
      success: true,
      chat: chatCleaned,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findByIdAndDelete(chatId).lean();

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat no encontrado",
      });
    }

    const io = req.app.get("io");
    const friendId = chat.users
      .find((user) => user.toString() !== req.userId)
      ?.toString();

    if (friendId) {
      io.to(`user:${friendId}`).emit("server:deletechat", chatId);
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};
