import { Router } from "express";
import * as friendController from "../controllers/friendController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", [verifyToken], friendController.getFriends);
router.put("/add", [verifyToken], friendController.addFriend);
router.put("/decline", [verifyToken], friendController.declineFriend);
router.put("/delete", [verifyToken], friendController.deleteFriend);

export default router;