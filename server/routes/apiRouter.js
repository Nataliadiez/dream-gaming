const express = require("express");
const router = express.Router();
const productosRoutes = require("./productos.routes.js");

router.use("/productos", productosRoutes);
//router.use("/admin", adminRoutes);
//router.use("/ventas", ventasRoutes);

module.exports = router;