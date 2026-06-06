import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateProgress, getProgress, getProgressStats } from "../controllers/progress.controller.js";

const router = express.Router();

router.post('/update', verifyToken, updateProgress);
router.get('/get', verifyToken, getProgress);
router.get('/stats', verifyToken, getProgressStats);

export default router;
