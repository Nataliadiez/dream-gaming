const express = require("express");
const router = express.Router();
const VentaSequelize = require("../entity/ventas.entity.js");

//ver si uso multer para manejar el excel

//obtener todas las ventas
router.get("/", async(req,res)=> {
    try{
        const ventas = await VentaSequelize.findAll();
        res.status(200).json({ventas})
        
    }catch(error){
        console.error(error);
        res.status(500).send({error: "Error del servidor"});
    }
})

//subir el carrito a ventas
router.post("/", async (req, res) => {
    try {
        const carrito = req.body.carrito || [];
        for (const producto of carrito) {
            await VentaSequelize.create({
                id_cliente: req.body.id_cliente,
                id_producto: producto.id_producto,
                cantidad: producto.cantidadElegida,
            });
        }

        res.status(201).json({ mensaje: "Venta registrada correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar la venta." });
    }
});

//renderizar la vista de ticket
router.post("/ticket", (req, res) => {
    const carrito = req.body.carrito || [];
    let totalCompra = 0;

    carrito.forEach(p => {
        totalCompra += p.precio * p.cantidadElegida;
    });

    res.render("ticket", { carrito, totalCompra });
});

module.exports = router;