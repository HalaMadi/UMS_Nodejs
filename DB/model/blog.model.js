import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";



const BlogModel=sequelize.define('Blog',{
    title:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:true,
    },
    
        description:{
            type:DataTypes.TEXT,
            allowNull:false
        }
    
})
export default BlogModel;