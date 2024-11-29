const ProductoSequelize = require("../models/producto.entity.js");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

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
        const uniqueName = `${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await ProductoSequelize.findAll({
            order: [['id_producto', 'DESC']]
        });
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error del servidor" });
    }
};


// Obtener un producto
const obtenerUnProducto = async (req, res) => {
    const productoId = parseInt(req.params.id);
    try {
        const producto = await ProductoSequelize.findByPk(productoId);
        if (producto) {
            return res.json(producto);
        } else {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error del servidor" });
    }
};


// Subir producto nuevo
const crearProducto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se ha subido ninguna imagen." });
        }

        const imagenPath = `${req.file.filename}`;
        const nuevoProducto = await ProductoSequelize.create({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: parseFloat(req.body.precio),
            categoria: req.body.categoria,
            disponible: true,
            imagen: imagenPath
        });

        res.status(201).json({
            mensaje: "Producto creado exitosamente",
            producto: nuevoProducto
        });
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

// Editar un producto
const editarProducto = async (req, res) => {
    try {
        const productoExistente = await ProductoSequelize.findByPk(req.params.id);
        if (!productoExistente) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        let imagenPath = productoExistente.imagen;
        if (req.file) {
            imagenPath = `${req.file.filename}`;
            const oldImagePath = path.join(__dirname, '..', productoExistente.imagen);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const actualizacion = {
            titulo: req.body.titulo || productoExistente.titulo,
            descripcion: req.body.descripcion || productoExistente.descripcion,
            precio: req.body.precio ? parseFloat(req.body.precio) : productoExistente.precio,
            categoria: req.body.categoria || productoExistente.categoria,
            disponible: req.body.disponible !== undefined ? req.body.disponible === "true" : productoExistente.disponible,
            imagen: imagenPath
        };

        const resultado = await ProductoSequelize.update(actualizacion, {
            where: {
                id_producto: req.params.id
            }
        });

        if (resultado[0] > 0) {
            res.status(200).json({
                mensaje: "Producto actualizado exitosamente",
                producto: actualizacion
            });
        } else {
            res.status(400).json({ error: "No se pudo actualizar el producto" });
        }
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};


// Baja lógica del producto
const eliminarProductoLogicamente = async (req, res) => {
    try {
        const productoEliminadoLogico = await ProductoSequelize.update({
            disponible: false
        }, {
            where: {
                id_producto: req.params.id
            }
        });

        if (productoEliminadoLogico) {
            return res.send({ mensaje: "Producto desactivado exitosamente" });
        } else {
            return res.status(404).json({ error: "Producto no modificado" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error del servidor" });
    }
};

const reactivarProductoLogicamente = async (req, res) => {
    try {
        const productoReactivado = await ProductoSequelize.update({
            disponible: true
        }, {
            where: {
                id_producto: req.params.id
            }
        });

        if (productoReactivado) {
            return res.send({ mensaje: "Producto reactivado exitosamente" });
        } else {
            return res.status(404).json({ error: "Producto no modificado" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error del servidor" });
    }
};

// Vista de productos con paginación
const obtenerVistaProducto = async (req, res) => {
    const tamano = 6;
    const { id } = req.params;
    const { categoria } = req.query;
    
    let paginaActual = Math.max(1, parseInt(id));
    
    let whereClause = { disponible: true };
    if (categoria) {
        whereClause.categoria = categoria;
    }

    const totalProductos = await ProductoSequelize.count({ where: whereClause });
    const totalPaginas = Math.ceil(totalProductos / tamano);
    paginaActual = Math.min(paginaActual, totalPaginas);
    const offset = (paginaActual - 1) * tamano;
    
    const productos = await ProductoSequelize.findAll({
        where: whereClause,
        limit: tamano,
        offset: offset,
    });
    
    res.render("productos", { 
        productos, 
        paginaActual, 
        totalPaginas 
    });
};


module.exports = {
    obtenerProductos,
    obtenerUnProducto,
    crearProducto,
    editarProducto,
    eliminarProductoLogicamente,
    obtenerVistaProducto,
    reactivarProductoLogicamente,
    upload
};
