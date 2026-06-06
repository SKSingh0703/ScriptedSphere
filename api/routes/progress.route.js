import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateProgress, getProgress, getProgressStats } from "../controllers/progress.controller.js";

const router = express.Router();

router.post('/update' , updateProgress);
router.get('/get', getProgress);
router.get('/stats', getProgressStats);

export default router;
