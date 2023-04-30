import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import User from "../models/User.js";

export const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const newUser = new User({
      email,
      username,
      password: await User.encryptPassword(password),
    });

    const userSaved = await newUser.save();

    const token = jwt.sign({ userId: userSaved._id }, SECRET_KEY, {
      expiresIn: 24 * 60,
    });

    return res.json({
      success: true,
      token,
    });

  } catch (error) {
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

    console.log(user)

    if (! await User.comparePasswords(password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Correo electrónico o contraseña incorrecta"
      })
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: 24 * 60,
    });
    
    return res.send({
      success: true,
      token
    });

  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Error",
    });
  }
};
