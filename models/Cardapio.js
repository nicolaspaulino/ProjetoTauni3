import { sequelize, DataTypes } from "../config/db.js";
const Cardapio = sequelize.define('cardapio', {
    id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
     },
    produto: {
       type: DataTypes.STRING,
       allowNull: false
    },
    preco: {
        type: DataTypes.DOUBLE,
        allowNull: false
     },
 })
 

    export default Cardapio;