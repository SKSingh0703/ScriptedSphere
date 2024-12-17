import User from "../models/user.model.js";
import bcrypty from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next) =>{
    const {username,email,password} = req.body;

    if(!username || !email || !password || username==='' || email==='' || password===''){
        return next(errorHandler(400,"All fields are required"));
    }
    const hashedPassword = bcrypty.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        res.json("Success!!!");
    } catch (error) {
        next(error);
    }
};