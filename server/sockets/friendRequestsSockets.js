import User from "../models/User.js";

export async function newFriendRequest(username, userId) {
  const user = await User.findOne({ username });

  if (user.friends.some((friendId) => friendId.toString() === userId.toString())) {
    return {
      success: false,
      message: "Este usuario ya es tu amigo"
    }
  }

  if (user.friendRequests.some((friendId) => friendId.toString() === userId.toString())) {
    return {
      success: false,
      message: "Ya enviaste una solicitud a este usuario"
    }
  }

  user.friendRequests.push(userId);
  await user.save();

  return {
    success: true,
    user
  };
}
