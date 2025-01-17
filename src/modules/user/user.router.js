import { Router } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import UserModel from "../../../DB/Model/user.model.js";

const router = Router();

// Get Users 
router.get('/', async (req, res) => {
    const users = await UserModel.findAll({
        attributes: ['id','userName', 'email']
    });
    return res.status(200).json({ message: "Success", users })
})
// delete User 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findByPk(id)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    await UserModel.destroy({
        where: {
            id
        }
    })
    return res.status(200).json({ message: "User deleted Successfully" })
})

// /* Register Endpoint */
// Add user
router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    await UserModel.create({ userName, email, password: hashedPassword })
    return res.status(201).json({ message: 'User Added Successfully' })
})

// /* Log In Endpoint */
router.post('/login', async (req, res) => {
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
    const token = jwt.sign({ id: user.id, name: user.userName }, 'HalaMadi')
    return res.status(200).json({ message: "Success", token })
})
export default router