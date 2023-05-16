import User from "../models/User.js";
import { defaultError } from "../constants.js";

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.userId, { friends: 1 }).populate({
      path: "friends",
      select: "-_id username",
    }).lean();

    return res.json({
      success: true,
      user: {
        friends: user.friends,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const addFriend = async (req, res) => {
  try {
    const { username } = req.body;

    const friend = await User.findOne({ username });

    if (!friend) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const user = await User.findById(req.userId);

    if (user.friends.some((friendId) => friendId.toString() === friend._id.toString())) {
      return res.status(400).json({
        success: false,
        message: "Amigo ya agregado",
      });
    }

    if(user.friends.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Límite de amigos alcanzado",
      });
    }

    for(let i = 0; i < user.friendRequests.length; i++) {
      if(user.friendRequests[i].toString() === friend._id.toString()) {
        user.friendRequests.splice(i, 1);
        break;
      }
    }

    user.friends.push(friend._id);
    friend.friends.push(user._id);

    const io = req.app.get("io");

    io.to(`user:${friend._id.toString()}`).emit("server:newfriend", user.username);

    await user.save();
    await friend.save();

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const declineFriend = async (req, res) => {
  try {
    const { username } = req.body;

    const friend = await User.findOne({ username }).lean();
    const user = await User.findById(req.userId);

    for(let i = 0; i < user.friendRequests.length; i++) {
      console.log(user.friendRequests[i] + " - " + friend._id.toString());
      if(user.friendRequests[i].toString() === friend._id.toString()) {
        user.friendRequests.splice(i, 1);
        break;
      }
    }

    await user.save();

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const deleteFriend = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findById(req.userId).populate("friends");
    const friend = await User.findOne({username});

    let isDeleted = [false, false];

    for (let i = 0; i < user.friends.length; i++) {
      if (username === user.friends[i].username) {
        user.friends.splice(i, 1);
        isDeleted[0] = true;
        break;
      }
    }

    for (let i = 0; i < friend.friends.length; i++) {
      if (user._id.toString() === friend.friends[i].toString()) {
        friend.friends.splice(i, 1);
        isDeleted[1] = true;
        break;
      }
    }

    if (!isDeleted[0] || !isDeleted[1]) {
      return res.status(404).json({
        success: false,
        message: "Error al eliminar: amigo no encontrado.",
      });
    }

    await user.save();
    await friend.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};
