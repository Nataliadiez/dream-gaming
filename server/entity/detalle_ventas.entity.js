const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");
const Venta = require("./ventas.entity.js");
const Producto = require("./producto.entity.js");

const DetalleVentaSequelize = sequelize.define("DetalleVenta", 
{
    id_detalle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Venta,
            key: "id_venta",
        },
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: "id_producto",
        },
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
},
{
    timestamps: false, // Desactiva createdAt y updatedAt
});

Venta.hasMany(DetalleVentaSequelize, { foreignKey: "id_venta" });
DetalleVentaSequelize.belongsTo(Venta, { foreignKey: "id_venta" });

Producto.hasMany(DetalleVentaSequelize, { foreignKey: "id_producto" });
DetalleVentaSequelize.belongsTo(Producto, { foreignKey: "id_producto" });

module.exports = DetalleVentaSequelize;
