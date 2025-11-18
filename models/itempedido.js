import { sequelize, DataTypes } from "../config/db.js";
import Pedido from "./pedido.js";

const ItemPedido = sequelize.define("ItemPedido", {
  produto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

Pedido.hasMany(ItemPedido, {
  foreignKey: "pedidoId",
  onDelete: "CASCADE"
});

ItemPedido.belongsTo(Pedido, {
  foreignKey: "pedidoId"
});

export default ItemPedido;
