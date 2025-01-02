import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    about:{
        type:String,
    },
    profilePicture:{
        type:String,
        default:"../../public/profile.png"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    // questions:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post',
    // }

},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User; 