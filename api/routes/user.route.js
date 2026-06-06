import express from "express";
import { deleteUser, getUsers, signOutUser, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test',test);
router.put('/update/:userId',updateUser); 
router.delete('/delete/:userId',deleteUser);
router.post('/signout',signOutUser);
router.get('/getusers',getUsers);

export default router;