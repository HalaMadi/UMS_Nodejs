import { Sequelize } from "sequelize";
export const sequelize = new Sequelize('ums', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export const connectDB = () => {
    sequelize.sync().then(() => {
        console.log('Database connect successfully');
    }).catch(error => {
        console.log('Unable to connect... ' + error);
    })
}