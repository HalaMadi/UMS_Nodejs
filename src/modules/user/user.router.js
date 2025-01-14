import { Router } from "express"
import bcrypt from 'bcryptjs'
import UserModel from "../../../DB/Model/user.model.js";

const router = Router();

// /* Register Endpoint */
// Get Users 
router.get('/users', async (req, res) => {
    const users = await UserModel.findAll();
    return res.status(200).json({ message: "Success", users })
})

// Add user
router.post('/users', async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    await UserModel.create({ userName, email, password: hashedPassword })
    return res.status(201).json({ message: 'User Added Successfully' })
})

// /* Log In Endpoint */
router.post('/users', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
        where: { email: email }
    })
    if (user == null) {
        return res.status(404).json({ message: 'Invalid email' })
    }
    const checkPassword = await bcrypt.compareSync(password, user.password);
    if(checkPassword==false){
        return res.status(400).json({message:'Invalid Password'})
    }
    return res.status(200).json({message:"Success"})
})
export default router