const express = require("express");
const router = express.Router();
const productosRoutes = require("./productos.routes.js");
const ticketRoutes = require("./ticket.routes.js");

router.use("/productos", productosRoutes);
router.use("/ticketCompra", ticketRoutes)
//router.use("/admin", adminRoutes);
//router.use("/ventas", ventasRoutes);

module.exports = router;