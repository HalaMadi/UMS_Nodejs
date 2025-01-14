import express from 'express'
import { connectDB } from './DB/connection.js';

const app = express()
connectDB();

app.listen(3000,()=>{
    console.log("Server Is Running... 3000");
    
})