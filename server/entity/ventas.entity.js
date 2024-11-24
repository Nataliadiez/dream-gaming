const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");
const Cliente = require("./cliente.entity.js");
const Producto = require("./producto.entity.js");

const VentasSequelize = sequelize.define("Ventas", 
{
    id_cliente:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Cliente,
            key: "id_cliente",
        },
        allowNull: false,
    },
    id_producto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Producto,
            key: "id_producto",
        },
        allowNull: false,
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    timestamps: false, // Desactiva createdAt y updatedAt
}
);

Cliente.hasMany(VentasSequelize, { foreignKey: "id_cliente" });
VentasSequelize.belongsTo(Cliente, { foreignKey: "id_cliente", targetKey: "id_cliente" });

Producto.hasMany(VentasSequelize, { foreignKey: "id_producto" });
VentasSequelize.belongsTo(Producto, { foreignKey: "id_producto", targetKey: "id_producto"  });

module.exports = VentasSequelize;