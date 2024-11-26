const validarProductos = (req, res, next) => {
    const { nombre, descripcion, precio, categoria } = req.body;

    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre del producto no puede estar vacío." });
    }

    if (!descripcion || typeof descripcion !== "string" || descripcion.trim() === "") {
        return res.status(400).json({ error: "La descripción del producto no puede estar vacía." });
    }

    if (precio === undefined || typeof precio !== "number" || precio <= 0) {
        return res.status(400).json({ error: "El precio del producto no puede estar vacío y debe ser un número mayor a 0" });
    }

    if (!categoria || typeof categoria !== "string" || categoria.trim() === "") {
        return res.status(400).json({ error: "La categoría del producto no puede estar vacía." });
    }
    next();
};

module.exports = validarProductos;
