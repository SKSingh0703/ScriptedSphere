
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then((m)=>{
    console.log('DataBase Connected');
}).catch((e)=>{
    console.log(e);
})

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
})

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,message
    }); 
})