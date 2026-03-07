const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/apiRouter.js");
const path = require("path");
const mysql = require("mysql2/promise");

const sequelize = require("./db/sequelizeConnection.js");

const ProductoSequelize = require("./models/producto.entity.js");
const ClienteSequelize = require("./models/cliente.entity.js");
const VentasSequelize = require("./models/ventas.entity.js");
const UsuarioSequelize = require("./models/usuario.entity.js");

require("dotenv").config();

// parsea lo que llegue del body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// habilita cors
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// rutas
app.get("/", (req, res) => {
    res.send("Pagina principal");
});

app.use("/", router);

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
    });

    await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DB}\`;`
    );

    await connection.end();

    await sequelize.sync({ alter: true });
    console.log("Base de datos y tablas listas");
}

initializeDatabase()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al inicializar la base de datos:", error);
    });