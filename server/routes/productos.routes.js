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


router.get("/producto/:id", async(req, res) => {
    let tamano = 6; 
    const { id } = req.params;
    const { categoria } = req.query;
    let offset = (parseInt(id) - 1) * tamano;

    let whereClause = {};
    if (categoria) {
        whereClause = { categoria };
    }

    let totalProductos = await ProductoSequelize.count({where: whereClause});
    console.log(totalProductos);
    while(offset > totalProductos){
        offset -= tamano;
    }

    let productos = await ProductoSequelize.findAll({
        where: whereClause,
        limit: tamano,
        offset,
    });

    if(!productos){
        offset = (parseInt(id) - 2) * tamano;
        productos = await ProductoSequelize.findAll({
            where: whereClause,
            limit: tamano,
            offset,
        });
    }

    res.render("productos", { productos });
});



module.exports = router;