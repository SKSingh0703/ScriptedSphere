import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username:{
        type:"String",
        required:true,
        unique:true,
    },
    email:{
        type:"String",
        required:true,
        unique:true,
    },
    password:{
        type:"String",
        required:true,
    },
    firstname:{
        type:"String",
    },
    lastname:{
        type:"String",
    },
    about:{
        type:"String",
    },
    profilePicture:{
        type:String,
        default:"../../client/public/profile.png"
    }

},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;