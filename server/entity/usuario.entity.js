const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");

const UsuarioSequelize = sequelize.define("Usuario", {
    id_usuario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps: false, // Desactiva createdAt y updatedAt
}
);

module.exports = UsuarioSequelize;