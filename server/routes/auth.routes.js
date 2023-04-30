import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { validateNewUser, validateUser } from "../middlewares/userValidation.js";

const router = Router();

router.post("/signup", [validateUser, validateNewUser], authController.signUp);
router.post("/signin", authController.signIn);

export default router;