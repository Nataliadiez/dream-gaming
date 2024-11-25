const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConnection.js");
const Cliente = require("./cliente.entity.js");
const Producto = require("./producto.entity.js");

//PK compuesta con id cliente y id producto y fecha
const VentaSequelize = sequelize.define("Ventas", 
{
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Cliente,
            key: "id_cliente",
        },
    },
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Producto,
            key: "id_producto",
        },
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_venta: {
        type: DataTypes.DATE,
        primaryKey: true,
        defaultValue: DataTypes.NOW,
    },

},
{
    timestamps: false, // Desactiva createdAt y updatedAt
});

Cliente.hasMany(VentaSequelize, { foreignKey: "id_cliente" });
VentaSequelize.belongsTo(Cliente, { foreignKey: "id_cliente" });

Producto.hasMany(VentaSequelize, { foreignKey: "id_producto" });
VentaSequelize.belongsTo(Producto, { foreignKey: "id_producto" });


module.exports = VentaSequelize;
