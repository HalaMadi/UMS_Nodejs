import { Router } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import UserModel from "../../../DB/Model/user.model.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import validation from "../../middleware/validation.js";
import { sendEmail } from "../../utils/sendEmail.js";
const router = Router();

// /* Register Endpoint */
router.post('/register', validation(registerSchema), async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        await UserModel.create({ userName, email, password: hashedPassword });
        const html = `<div>
        <h1>Hi ${userName}♥️</h1>
        </div>`;
        await sendEmail(email, "Hi there , this is Hala 👻", html)
        return res.status(201).json({ message: 'User Added Successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.stack })
    }
})

// /* Log In Endpoint */
router.post('/login', validation(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({
            where: { email: email }
        })
        if (user == null) {
            return res.status(404).json({ message: 'Invalid email' })
        }
        const checkPassword = await bcrypt.compareSync(password, user.password);
        if (checkPassword == false) {
            return res.status(400).json({ message: 'Invalid Password' })
        }
        const token = jwt.sign({ id: user.id, name: user.userName, role: user.role }, 'HalaMadi')
        return res.status(200).json({ message: "Success", token })
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error })
    }
})

export default router