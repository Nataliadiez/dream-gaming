const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/apiRouter.js");
const path = require('path');

const sequelize = require("./db/sequelizeConnection.js");

const ProductoSequelize = require("./entity/producto.entity.js");
const ClienteSequelize = require("./entity/cliente.entity.js");
const VentasSequelize = require("./entity/ventas.entity.js");
const UsuarioSequelize = require("./entity/usuario.entity.js");

//parsea lo que llegue del body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//deshabilita cors
app.use(cors());
require("dotenv").config();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//rutas

app.get("/", async (req, res)=> {
    await sequelize.sync({force: true});
    res.send("pagina principal");

})

app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
})