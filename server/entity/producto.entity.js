const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");

const ProductoSequelize = sequelize.define("Producto", {
    id:{
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
    img:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: true,
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
})

module.exports = ProductoSequelize;