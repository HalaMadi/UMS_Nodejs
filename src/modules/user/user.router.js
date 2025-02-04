import { Router } from "express"
import auth from "../../middleware/auth.js";
import uploadFile from "../../utils/multer.js";
import cloudinary from "../../utils/cloudinary.js";
import UserModel from "../../../DB/model/user.model.js";
import { deleteUser, getUsers } from "./user.controller.js";

const router = Router();

// Get Users 
router.get('/', auth(), getUsers)

// delete User 
router.delete('/:id', auth(), deleteUser)

// Upload file
router.put('/:id', uploadFile().single('image'), uploadFile)
export default router