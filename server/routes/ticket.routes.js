const express = require("express");
const router = express.Router();

// Datos de ejemplo de productos
router.get("/", (req, res) => {
    res.render("productos", { arrayProductos });
});


router.get("/:id", (req, res) => {
    const productoId = parseInt(req.params.id);
    const producto = arrayProductos.find(p => p.id === productoId);
    if (producto) {
        res.render('detalleProducto', { producto });
    } else {
        res.status(404).send("Producto no encontrado");
    }
});


module.exports = router;
//Oscar
//carrito
//ticket de ejs


//descargar excel
//carga de imagenes 
//middlewares

//Natt
//contraseña encriptada
//crud del admin - lista de productos
