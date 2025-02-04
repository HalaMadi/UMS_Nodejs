import UserModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";

// Get Users
export const getUsers = async (req, res) => {
    const users = await UserModel.findAll({
        attributes: ['id', 'userName', 'email']
    });
    return res.status(200).json({ message: "Success", users })
}

// delete User 
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await UserModel.findByPk(id)
    if (!user) {
        return next(new AppError('User not fund', 404))
    }
    await UserModel.destroy({
        where: {
            id
        }
    })
    return res.status(200).json({ message: "User deleted Successfully" })
}

// Upload file
export const uploadFile = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findByPk(id)
    if (!user) {
        return next(new AppError('User not fund', 404))
    }
    const { secure_url } = await cloudinary.uploader.upload(req.file.path);
    user.profilePic = secure_url;
    await user.save();
    return res.status(200).json({ message: 'success' })
}