import User from "../models/User.js";
import userValidationSchema from "../validations/userValidationSchema.js";

export const validateNewUser = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(401).json({
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

export const validateUser = (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const { value, error } = userValidationSchema.validate({
      email,
      username,
      password,
    });

    if (error) {
      return res.status(401).json({
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
