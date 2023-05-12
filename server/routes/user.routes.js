import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateUniqueEmailUsername, validateUserUpdateFields } from "../middlewares/userValidation.js";

const router = Router();

router.put("/visibility", [verifyToken], userController.changeVisibility);

router.get("/all", [verifyToken], userController.getUsers);
router.get("/publics", [verifyToken], userController.getPublicUsers);
router.get("/:username", [verifyToken], userController.getUserByUsername);
router.get("/", [verifyToken], userController.getUser);
router.put("/", [verifyToken, validateUserUpdateFields, validateUniqueEmailUsername], userController.updateUser);
router.delete("/", [verifyToken], userController.deleteUser);

export default router;
