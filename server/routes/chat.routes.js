import { Router } from "express";
import * as chatController from "../controllers/chatController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", [verifyToken], chatController.getChats);
router.get("/:id", [verifyToken], chatController.getChat);
router.post("/", [verifyToken], chatController.createChat);
router.put("/:id", [verifyToken], chatController.updateChat);
router.delete("/:id", [verifyToken], chatController.deleteChat);

export default router;