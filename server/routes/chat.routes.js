import { Router } from "express";
import * as chatController from "../controllers/chatController.js";

const router = Router();

router.get("/", chatController.getChats);
router.get("/:id", chatController.getChat);
router.post("/", chatController.createChat);
router.put("/:id", chatController.updateChat);
router.delete("/:id", chatController.deleteChat);

export default router;