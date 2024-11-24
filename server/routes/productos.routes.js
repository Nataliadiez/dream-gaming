const express = require("express");
const router = express.Router();
const ProductoSequelize = require("../entity/producto.entity.js");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const validarProductos = require("../middlewares/validarProductos.middleware.js");

// Crear el directorio de uploads si no existe
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

//Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        let productos;
        productos = await ProductoSequelize.findAll();
        res.json(productos);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error del servidor" });
    }
});

//obtener un producto
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

//subir producto nuevo
router.post("/", upload.single("imagen"), validarProductos, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se ha subido ninguna imagen" });
        }

        const imagenPath = `../../server/uploads/${req.file.filename}`;
        
        const nuevoProducto = await ProductoSequelize.create({
            ...req.body,
            imagen: imagenPath
        });

        if (nuevoProducto) {
            res.status(201).json({ 
                mensaje: "Producto creado exitosamente",
                producto: nuevoProducto
            });
        } else {
            return res.status(400).json({ error: "No se pudo crear el producto" });
        }
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
});

//editar un producto
router.put("/:id", upload.single("imagen"), async (req, res) => {
    try {
        const productoExistente = await ProductoSequelize.findByPk(req.params.id);
        if (!productoExistente) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        let imagenPath = productoExistente.imagen;
        if (req.file) {
            imagenPath = `../../server/uploads/${req.file.filename}`;
            
            if (productoExistente.imagen) {
                const oldImagePath = path.join(__dirname, '..', productoExistente.imagen);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const productoModificado = await ProductoSequelize.update({
            ...req.body,
            imagen: imagenPath
        }, {
            where: {
                id_producto: req.params.id
            }
        });

        if (productoModificado[0] > 0) {
            res.status(200).json({ 
                mensaje: "Producto actualizado exitosamente",
                imagen: imagenPath
            });
        } else {
            return res.status(400).json({ error: "No se pudo actualizar el producto" });
        }
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

//baja lógica del producto
router.delete("/:id", async(req, res) => {
    const producto = req.body;
    try{
        const productoEliminadoLogico = await ProductoSequelize.update({
            disponible: false
        },
        {
            where:{
                id_producto: req.params.id
            }
        }
    );
        if (productoEliminadoLogico) {
            return res.send(producto);
        } else {
            return res.status(404).json({ error: "Producto no modificado" });
        }
    } catch(error){
        res.status(500).send({error: "Error del servidor"});
    }
})

//obtener la vista de productos de EJS
router.get("/producto/:id", async(req, res) => {
    let tamano = 6; 
    const { id } = req.params;
    const { categoria } = req.query;
    let offset = (parseInt(id) - 1) * tamano;

    let whereClause = { disponible: true };
    if (categoria) {
        whereClause.categoria = categoria;
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