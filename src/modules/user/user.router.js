import { Router } from "express"
import UserModel from "../../../DB/Model/user.model.js";
import auth from "../../middleware/auth.js";

const router = Router();

// Get Users 
router.get('/', auth(), async (req, res) => {
    try {
        const users = await UserModel.findAll({
            attributes: ['id', 'userName', 'email']
        });
        return res.status(200).json({ message: "Success", users })
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error })
    }
})
// delete User 
router.delete('/:id', auth(), async (req, res) => {
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