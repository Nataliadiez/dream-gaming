const express = require("express");
const router = express.Router();
const {
    obtenerProductos,
    obtenerUnProducto,
    crearProducto,
    editarProducto,
    eliminarProductoLogicamente,
    obtenerVistaProducto,
    reactivarProductoLogicamente,
    upload
} = require("../controllers/productos.controller.js");
const validarProductos = require("../middlewares/validarProductos.middleware.js");

// Obtener todos los productos
router.get("/", obtenerProductos);

// Obtener un producto
router.get("/:id", obtenerUnProducto);

// Subir producto nuevo
router.post("/", upload.single("imagen"), validarProductos, crearProducto);

// Editar un producto
router.put("/:id", upload.single("imagen"), validarProductos, editarProducto);

// Baja lógica del producto
router.delete("/:id", eliminarProductoLogicamente);

//Reactivación lógida del producto
router.patch("/:id", reactivarProductoLogicamente)

// Vista de productos con paginación
router.get("/producto/:id", obtenerVistaProducto);

module.exports = router;
