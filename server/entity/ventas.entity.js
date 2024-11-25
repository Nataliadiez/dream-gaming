const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");
const Cliente = require("./cliente.entity.js");

const VentaSequelize = sequelize.define("Venta", 
{
    id_venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: "id_cliente",
        },
    },
    fecha_venta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
},
{
    timestamps: false, // Desactiva createdAt y updatedAt
});

Cliente.hasMany(VentaSequelize, { foreignKey: "id_cliente" });
VentaSequelize.belongsTo(Cliente, { foreignKey: "id_cliente" });

module.exports = VentaSequelize;
