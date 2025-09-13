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
    bio:{
        type:String,
    },
    country:{
        type:String,
    },
    college:{
        type:String,
    },
    degree:{
        type:String,
    },
    branch:{
        type:String,
    },
    yearOfGraduation:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    github:{
        type:String,
    },
    instagram:{
        type:String,
    },
    resume:{
        type:String,
    },
    leetcode:{
        type:String,
    },
    codeforces:{
        type:String,
    },
    codechef:{
        type:String,
    },
    geekforgeeks:{
        type:String,
    },
    // Cached platform data for faster dashboard loading
    platformDataCache: {
        leetcode: {
            rating: { type: Number, default: 0 },
            rankingHistory: { type: Array, default: [] },
            problemsSolved: { type: Number, default: 0 },
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 },
            topics: { type: Array, default: [] }
        },
        codeforces: {
            rating: { type: Number, default: 0 },
            rankingHistory: { type: Array, default: [] },
            problemsSolved: { type: Number, default: 0 },
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 },
            topics: { type: Array, default: [] }
        },
        codechef: {
            rating: { type: Number, default: 0 },
            rankingHistory: { type: Array, default: [] },
            problemsSolved: { type: Number, default: 0 },
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 },
            topics: { type: Array, default: [] }
        },
        geekforgeeks: {
            rating: { type: Number, default: 0 },
            rankingHistory: { type: Array, default: [] },
            problemsSolved: { type: Number, default: 0 },
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 },
            topics: { type: Array, default: [] }
        },
        totalQuestions: { type: Number, default: 0 },
        totalContests: { type: Number, default: 0 },
        totalActiveDays: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: null },
        cacheExpiry: { type: Date, default: null }
    }
    // questions:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post',
    // }

},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User; 