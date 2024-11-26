const express = require("express");
const router = express.Router();
const {
    obtenerProductos,
    obtenerUnProducto,
    crearProducto,
    editarProducto,
    eliminarProductoLogicamente,
    obtenerVistaProducto,
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
router.put("/:id", upload.single("imagen"), editarProducto);

// Baja lógica del producto
router.delete("/:id", eliminarProductoLogicamente);

// Vista de productos con paginación
router.get("/producto/:id", obtenerVistaProducto);

module.exports = router;
