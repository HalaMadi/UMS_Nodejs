import express from 'express'
import { connectDB } from './DB/connection.js';
import userRouter from './src/modules/user/user.router.js'
const app = express();
app.use(express.json())
connectDB();

app.use(userRouter)
app.listen(3000,()=>{
    console.log("Server Is Running... 3000");
    
})