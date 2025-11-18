import { sequelize, DataTypes } from "../config/db.js";

const Pedido = sequelize.define("Pedido", {
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pendente"
  }
});



export default Pedido;
