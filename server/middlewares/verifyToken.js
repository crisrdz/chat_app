import jwt from "jsonwebtoken";
import { SECRET_KEY } from '../config.js';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, SECRET_KEY);

    req.userId = decoded.userId;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido"
    });
  }
}