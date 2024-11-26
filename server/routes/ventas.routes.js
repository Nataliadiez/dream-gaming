const express = require("express");
const router = express.Router();
const {
    obtenerTodasLasVentas,
    subirunaVenta,
    vistaTicket} = require("../controllers/ventas.controller.js");


//obtener todas las ventas
router.get("/", obtenerTodasLasVentas)

//subir una venta
router.post("/", subirunaVenta);

//renderizar la vista de ticket
router.post("/ticket", vistaTicket);

module.exports = router;