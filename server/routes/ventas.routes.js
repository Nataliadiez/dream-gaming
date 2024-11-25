const express = require("express");
const router = express.Router();
const ClienteSequelize = require("../entity/cliente.entity.js");
const ProductoSequelize = require("../entity/producto.entity.js");
const VentaSequelize = require("../entity/ventas.entity.js");

//obtener todas las ventas
router.get("/", async(req,res)=> {
    try{
        const ventas = await VentaSequelize.findAll({
            include: [
                {
                    model: ClienteSequelize,
                    attributes: ["nombre"],
                },
                {
                    model: ProductoSequelize,
                    attributes: ["titulo", "precio"],
                }
            ],
            attributes: ["fecha_venta", "cantidad"],
            order: [["fecha_venta", "DESC"]],
            raw: true,
        });
        res.status(200).json(ventas);
        
    }catch(error){
        console.error(error);
        res.status(500).send({error: "Error del servidor"});
    }
})

router.post("/", async (req, res) => {
    try {
        if (!req.body.nombre_cliente) {
            return res.status(400).json({ error: "Nombre del cliente es requerido" });
        }
        const cliente = await ClienteSequelize.create({nombre: req.body.nombre_cliente});
        
        const obtenerCliente = await ClienteSequelize.findOne({
            where:{
                nombre: req.body.nombre_cliente,
            }
        });

        const carrito = req.body.carrito;

        const ventas = carrito.map(producto => ({
            id_cliente: obtenerCliente.id_cliente,
            id_producto: producto.id,
            cantidad: producto.cantidadElegida,
            fecha: Date.now()
        }));

        await VentaSequelize.bulkCreate(ventas);

        res.status(201).json({ message: "Ventas registradas" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar venta" });
    }
});

//renderizar la vista de ticket
router.post("/ticket", (req, res) => {
    const carrito = req.body.carrito || [];
    let totalCompra = 0;

    carrito.forEach(p => {
        totalCompra += (p.precio * p.cantidadElegida);
    });

    res.render("ticket", { carrito, totalCompra });
});

module.exports = router;