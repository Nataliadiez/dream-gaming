const express = require("express");
const router = express.Router();
const ProductoSequelize = require("../entity/producto.entity.js");

router.get("/", async (req, res) => {
    try {
        const { categoria } = req.query;
        console.log(categoria);
        let productos;

        if (categoria) {
            productos = await ProductoSequelize.findAll({
                where: { categoria }
            });
        } else {
            productos = await ProductoSequelize.findAll();
        }
        console.log(productos);
        res.render("productos", { productos });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error del servidor" });
    }
});

router.get("/:id", async(req, res) => {
    const productoId = parseInt(req.params.id);
    try{
        const producto = await ProductoSequelize.findByPk(productoId);
        if (producto) {
            return res.json(producto);
        } else {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch(error){
        res.status(500).send({error: "Error del servidor"});
    }
});



module.exports = router;