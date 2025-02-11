import { connectDB } from '../DB/connection.js';
import userRouter from './modules/user/user.router.js'
import authRouter from './modules/authentication/auth.router.js'
import blogRouter from './modules/blog/blog.router.js'
const initApp = (app, express) => {
    connectDB();
    app.use(express.json())
    app.use('/users', userRouter)
    app.use('/auth', authRouter)
    app.use('/blogs', blogRouter)
    app.use((err, req, res, next) => {
        return res.status(404).json({ err: err.message })
    })

}
export default initApp