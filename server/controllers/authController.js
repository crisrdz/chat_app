import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const signUp = async (req, res) => {
  try {
    const { email, username, passwordOne } = req.body;
    const role = await Role.findOne({role: "User"});

    const newUser = new User({
      email,
      username,
      password: await User.encryptPassword(passwordOne),
      roles: [role._id]
    });

    const userSaved = await newUser.save();

    const token = jwt.sign({ userId: userSaved._id }, SECRET_KEY, {
      expiresIn: 7 * 24 * 60 * 60,
    });

    return res.json({
      success: true,
      user: {
        username: userSaved.username,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      succes: false,
      message: "Error",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await User.comparePasswords(password, user?.password))) {
      return res.status(401).send({
        success: false,
        message: "Correo electrónico o contraseña incorrecta",
      });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: 7 * 24 * 60 * 60,
    });

    return res.send({
      success: true,
      user: {
        username: user.username,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Error",
    });
  }
};
