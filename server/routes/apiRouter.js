const express = require("express");
const router = express.Router();
const productosRoutes = require("./productos.routes.js");
const usuariosRoutes = require("./usuarios.routes.js");
const ventasRoutes = require("./ventas.routes.js");

router.use("/productos", productosRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/ventas", ventasRoutes);

module.exports = router;
