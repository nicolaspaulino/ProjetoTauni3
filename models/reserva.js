import { sequelize, DataTypes } from "../config/db.js";

const Res = sequelize.define('reserva', {
    id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
    },
   nome: {
       type: DataTypes.STRING,
       allowNull: false
    },
    E_mail: {
        type: DataTypes.STRING,
        allowNull: false
     },
    data: {
       type: DataTypes.DATE,
       allowNull: false
    },
    hora: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qnt:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
 })

    export default Res;