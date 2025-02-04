import { Router } from "express";
import BlogModel from "../../../DB/model/blog.model.js";
import auth from "../../middleware/auth.js";
import UserModel from "../../../DB/model/user.model.js";
import { createBlog, getBlog } from "./blog.controller.js";

const router = Router();


router.get('/', getBlog)

router.post('/',auth(),createBlog)
export default router