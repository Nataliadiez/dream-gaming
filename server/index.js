const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/apiRouter.js");
const path = require("path");

//parsea lo que llegue del body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//deshabilita cors
app.use(cors());
require("dotenv").config();

//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//rutas

app.get("/", (req, res)=> {
    res.send("pagina principal");
})

app.use("/", router);

const puerto = process.env.PORT;
app.listen(puerto, () => {
    console.log(`Servidor corriendo en puerto: ${puerto}`);
})