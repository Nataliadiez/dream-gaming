const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");

const ProductoSequelize = sequelize.define("Producto", {
    id_producto:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    disponible:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    categoria:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    timestamps: false, // Desactiva createdAt y updatedAt
}
);

module.exports = ProductoSequelize;