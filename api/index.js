
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO).then((m)=>{
    console.log('DataBase Connected');
    // console.log(m);
}).catch((e)=>{
    console.log(e);
})

const app = express();



app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
})