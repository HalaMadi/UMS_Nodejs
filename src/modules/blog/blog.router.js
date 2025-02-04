import { Router } from "express";
import BlogModel from "../../../DB/model/blog.model.js";
import auth from "../../middleware/auth.js";
import UserModel from "../../../DB/model/user.model.js";

const router = Router();


router.get('/', async (req, res) => {
    const blogs = await BlogModel.findAll({
        attributes:['id','title'],
        include:{
            model:UserModel,
            attributes:['id','userName']
        }
    })
    return res.status(200).json({message:'Success',blogs})
})

router.post('/',auth(),async(req,res)=>{
    const {title,description}=req.body;
    const blog=await BlogModel.create({title,description,UserId:req.id});
    return res.status(201).json({message:'Blog added successfully...',blog})
})
export default router