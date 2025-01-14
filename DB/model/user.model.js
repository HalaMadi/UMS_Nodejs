import { DataTypes } from "sequelize";
import { sequelize } from "../connection";



const UserModel = sequelize({force:true}).define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: true
    }
})
export default UserModel