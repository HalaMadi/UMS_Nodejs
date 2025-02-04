import UserModel from "../../../DB/model/user.model.js";
import { sendEmail } from "../../utils/sendEmail.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    await UserModel.create({ userName, email, password: hashedPassword });
    const html = `<div>
        <h1>Hi ${userName}♥️</h1>
        </div>`;
    await sendEmail(email, "Hi there , this is Hala 👻", html)
    return res.status(201).json({ message: 'User Added Successfully' })
}
export const LogIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
        where: { email: email }
    })
    if (user == null) {
        return next(new AppError('User not fund', 404))
    }
    const checkPassword = await bcrypt.compareSync(password, user.password);
    if (checkPassword == false) {
        return next(new AppError('User not fund', 400))
    }
    const token = jwt.sign({ id: user.id, name: user.userName, role: user.role }, 'HalaMadi')
    return res.status(200).json({ message: "Success", token })
}