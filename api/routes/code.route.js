import express from "express"
import { getContests } from "../controllers/code.controller.js";

const router = express.Router();

router.get("/getcontests",getContests);

export default router;