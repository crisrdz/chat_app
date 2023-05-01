import User from "../models/User.js";
import {userCreateSchema, userUpdateSchema} from "../validations/userSchema.js";

export const validateUniqueEmailUsername = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }], _id: {$ne: req.userId}  });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Correo electrónico o nombre de usuario en uso",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const validateUserCreateFields = (req, res, next) => {
  try {
    const { email, username, passwordOne, passwordTwo } = req.body;
    const { value, error } = userCreateSchema.validate({
      email,
      username,
      passwordOne,
      passwordTwo,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const validateUserUpdateFields = (req, res, next) => {
  try {
    const { email, username, passwordOne, passwordTwo, passwordOld } = req.body;
    const { value, error } = userUpdateSchema.validate({
      email,
      username,
      passwordOne,
      passwordTwo,
      passwordOld
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Correo electrónico y contraseña no deben estar vacíos",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
