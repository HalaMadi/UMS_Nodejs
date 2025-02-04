import { Router } from "express";
import BlogModel from "../../../DB/model/blog.model.js";
const router = Router();


router.get('/', async (req, res) => {
    const blogs = await BlogModel.findAll({})
    return res.status(200).json({message:'Success',blogs})
})
router.post('/',async(req,res)=>{
    const {title,description}=req.body;
    const blog=await BlogModel.create({title,description});
    return res.status(201).json({message:'Blog added successfully...',blog})
})
export default router