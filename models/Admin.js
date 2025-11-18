import { sequelize, DataTypes } from "../config/db.js";

const Adm = sequelize.define('Admin', {
    id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
    },
    name: {
       type: DataTypes.STRING,
       allowNull: false
    },
    password: {
       type: DataTypes.STRING,
       allowNull: false
    }
});

export default Adm;
