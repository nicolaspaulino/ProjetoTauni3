import { sequelize, DataTypes } from "../config/db.js";

const User = sequelize.define('Usuario', {
    id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
    },
   nome: {
       type: DataTypes.STRING,
       allowNull: false
    },
   senha: {
        type: DataTypes.STRING,
        allowNull: false
     }
 })
    export default User;