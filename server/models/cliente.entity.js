const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");

const ClienteSequelize = sequelize.define("Cliente", {
    id_cliente:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    timestamps: false, // Desactiva createdAt y updatedAt
});

module.exports = ClienteSequelize;