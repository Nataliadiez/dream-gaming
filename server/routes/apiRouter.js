const express = require("express");
const router = express.Router();
const productosRoutes = require("./productos.routes.js");
const ticketRoutes = require("./ticket.routes.js");
const usuariosRoutes = require("./usuarios.routes.js");

router.use("/productos", productosRoutes);
router.use("/ticketCompra", ticketRoutes)
router.use("/usuarios", usuariosRoutes);
//router.use("/ventas", ventasRoutes);

module.exports = router;