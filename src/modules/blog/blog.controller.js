import BlogModel from "../../../DB/model/blog.model.js"
import UserModel from "../../../DB/model/user.model.js"

export const getBlog=async (req, res) => {
    const blogs = await BlogModel.findAll({
        attributes:['id','title'],
        include:{
            model:UserModel,
            attributes:['id','userName']
        }
    })
    return res.status(200).json({message:'Success',blogs})
}
export const createBlog=async(req,res)=>{
    const {title,description}=req.body;
    const blog=await BlogModel.create({title,description,UserId:req.id});
    return res.status(201).json({message:'Blog added successfully...',blog})
}