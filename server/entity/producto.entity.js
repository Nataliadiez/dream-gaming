const { DataTYpes, DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");

const ProductoSequelize = sequelize.define("Producto", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    img:{

    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    cantidad:{
        type: DataTypes.INTEGER,
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
})

module.exports = ProductoSequelize;