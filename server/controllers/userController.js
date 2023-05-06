import User from "../models/User.js";
import { defaultError } from "../constants.js";

export const getUsers = async (req, res) => {
  try {
    const page = isNaN(req.query.page) ? 1 : req.query.page;

    const limit = 10;
    const skip = limit * (page - 1);

    const users = await User.find({}, { password: 0 }, { limit, skip });

    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const { username, passwordOne, passwordOld } = req.body;

    const passwordsMatch = await User.comparePasswords(
      passwordOld,
      user.password
    );

    if (!passwordsMatch) {
      return res.status(400).json({
        success: false,
        message: "Contraseña anterior no coincide",
      });
    }

    user.username = username;
    user.password = await User.encryptPassword(passwordOne);

    const userUpdated = await user.save();

    return res.json({
      success: true,
      user: {
        _id: userUpdated._id,
        email: userUpdated.email,
        username: userUpdated.username,
        createdAt: userUpdated.createdAt,
        updatedAt: userUpdated.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
};

export const changeVisibility = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    console.log(user);

    return res.json({
      success: true,
      user: {
        _id: userUpdated._id,
        email: userUpdated.email,
        username: userUpdated.username,
        createdAt: userUpdated.createdAt,
        updatedAt: userUpdated.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: defaultError,
    });
  }
}
