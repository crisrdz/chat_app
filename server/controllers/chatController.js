import Chat from "../models/Chat.js";
import { defaultError } from "../constants.js";

export const getChats = async (req, res) => {
  try {
    const page = isNaN(req.query.page) ? 1 : req.query.page;
    const limit = 10;
    const skip = limit * (page - 1);

    const chats = await Chat.find({ users: req.userId }, null, {
      limit,
      skip,
    })
      .populate({ path: "users", select: "_id username" })
      .populate({
        path: "messages",
        select: "body",
        options: {
          sort: "-createdAt",
          limit: 1,
        },
      });

    return res.json({
      success: true,
      data: {
        userId: req.userId,
        chats,
      }
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
    const chat = await Chat.findById(chatId).populate("messages").populate({path: "users", select: "username _id"});

    return res.json({
      success: true,
      data: {
        userId: req.userId,
        chat,
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const createChat = async (req, res) => {
  try {
    const { friendId } = req.body;

    const chat = new Chat({
      users: [req.userId, friendId],
    });

    const chatSaved = await chat.save();

    return res.json({
      success: true,
      chat: chatSaved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const updateChat = async (req, res) => {
  res.send("updateChat");
};

export const deleteChat = async (req, res) => {
  res.send("deleteChat");
};
