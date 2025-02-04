import { Router } from "express"
import auth from "../../middleware/auth.js";
import uploadFile from "../../utils/multer.js";
import cloudinary from "../../utils/cloudinary.js";
import UserModel from "../../../DB/model/user.model.js";

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
    try {
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
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error })
    }
})
// Upload file
router.put('/:id',uploadFile().single('image'),async(req,res)=>{
    const { id } = req.params;
    const user = await UserModel.findByPk(id)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    const {secure_url}=await cloudinary.uploader.upload(req.file.path);
    user.profilePic=secure_url;
    await user.save();

    return res.status(200).json({message:'success'})
})
export default router