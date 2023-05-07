import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateUniqueEmailUsername, validateUserUpdateFields } from "../middlewares/userValidation.js";

const router = Router();

router.put("/visibility", [verifyToken], userController.changeVisibility);

router.get("/", [verifyToken], userController.getUsers);
router.get("/:id", [verifyToken], userController.getUser);
router.put("/:id", [verifyToken, validateUserUpdateFields, validateUniqueEmailUsername], userController.updateUser);
router.delete("/:id", [verifyToken], userController.deleteUser);

export default router;
