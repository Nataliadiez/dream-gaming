const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('dream_gaming', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

module.exports = sequelize;