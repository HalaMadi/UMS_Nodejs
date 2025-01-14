import { Router } from "express"
import bcrypt from 'bcryptjs'
import UserModel from "../../../DB/Model/user.model.js";

const router=Router();

// Get Users 
router.get('/users',async(req,res)=>{
    const users =await UserModel.findAll();
    return res.status(200).json({message:"Success",users})
})

// Add user
router.post('/users',async(req,res)=>{
    const {userName,email,password}=req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    await UserModel.create({userName,email,password:hashedPassword})
    return res.status(201).json({message:'User Added Successfully'})
})
export default router