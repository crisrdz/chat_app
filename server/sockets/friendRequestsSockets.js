import User from "../models/User.js";

export async function newFriendRequest(username, userId) {
  const friend = await User.findOne({ username });
  const user = await User.findById(userId).lean();

  if (friend.friends.length >= 50 || user.friends.length >= 50) {
    return {
      success: false,
      message: "Límite de amigos alcanzado",
    }
  }

  if (friend.friends.some((friendId) => friendId.toString() === userId.toString())) {
    return {
      success: false,
      message: "Este usuario ya es tu amigo",
    };
  }

  if (friend.friendRequests.some((friendId) => friendId.toString() === userId.toString())) {
    return {
      success: false,
      message: "Ya enviaste una solicitud a este usuario",
    };
  }

  friend.friendRequests.push(userId);
  await friend.save();

  return {
    success: true,
    user: friend,
    username: user.username
  };
}
