import { sequelize, DataTypes } from "../config/db.js";

const Fale = sequelize.define('faleConosco', {
    id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
    },
   nome: {
       type: DataTypes.STRING,
       allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
     },
    comentario: {
       type: DataTypes.TEXT,
       allowNull: false
    }
 })
 
    export default Fale;