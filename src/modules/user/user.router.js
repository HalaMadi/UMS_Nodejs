import { Router } from "express"
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
export default router