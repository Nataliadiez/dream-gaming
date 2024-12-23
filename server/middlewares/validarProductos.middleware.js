const validarProductos = (req, res, next) => {
    const { titulo, descripcion, precio, categoria } = req.body;

    if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({ error: "El título del producto no puede estar vacío." });
    }

    if (!descripcion || typeof descripcion !== "string" || descripcion.trim() === "") {
        return res.status(400).json({ error: "La descripción del producto no puede estar vacía." });
    }

    if (precio === undefined || isNaN(precio) || precio <= 0) {
        return res.status(400).json({ error: "El precio debe ser un número mayor a 0." });
    }

    if (!categoria || typeof categoria !== "string" || categoria.trim() === "") {
        return res.status(400).json({ error: "La categoría del producto no puede estar vacía." });
    }

    next();
};


module.exports = validarProductos;
