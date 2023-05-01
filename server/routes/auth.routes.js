import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { validateLogin, validateUserCreateFields, validateUniqueEmailUsername } from "../middlewares/userValidation.js";

const router = Router();

router.post("/signup", [validateUserCreateFields, validateUniqueEmailUsername], authController.signUp);
router.post("/signin", [validateLogin], authController.signIn);

export default router;