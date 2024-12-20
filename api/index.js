
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO).then((m)=>{
    console.log('DataBase Connected');
    // console.log(m);
}).catch((e)=>{
    console.log(e);
})

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

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