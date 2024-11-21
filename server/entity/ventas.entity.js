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
            model: Cliente, // Referencia al modelo Cliente
            key: "id_cliente", // Columna referenciada en Cliente
        },
        allowNull: false,
    },
    id_producto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Producto, // Referencia al modelo Producto
            key: "id_producto", // Columna referenciada en Producto
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