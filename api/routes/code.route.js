import express from "express"
import { getContests } from "../controllers/code.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getAllData, getCachedPlatformData, refreshUserPlatformData } from "../controllers/platform.controller.js";

const router = express.Router();

router.get("/getcontests",getContests);
router.get("/platformData/:id",getAllData);
router.get("/cachedPlatformData/:id",getCachedPlatformData);
router.post("/refreshPlatformData",refreshUserPlatformData);

export default router;