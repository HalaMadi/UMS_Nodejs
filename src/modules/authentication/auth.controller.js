import UserModel from "../../../DB/model/user.model.js";
import { sendEmail } from "../../utils/sendEmail.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
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
}
export const LogIn = async (req, res) => {
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
        return res.status(500).json({ message: 'Server Error', error:error.stack })
    }
}