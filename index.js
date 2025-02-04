import express from 'express'
import { connectDB } from './DB/connection.js';
import userRouter from './src/modules/user/user.router.js'
import authRouter from './src/modules/authentication/auth.router.js'
import blogRouter from './src/modules/blog/blog.router.js'
const app = express();
app.use(express.json())
connectDB();

app.use('/users',userRouter)
app.use('/auth',authRouter)
app.use('/blogs',blogRouter)

app.listen(3000,()=>{
    console.log("Server Is Running... 3000");
    
})