class Producto {
    id;
    img;
    titulo;
    precio;
    descripcion;
    cantidad;
    disponible;
    categoria;

    constructor(id, img, titulo, precio, descripcion, cantidad, disponible, categoria) {
        this.id = id;
        this.img = img;
        this.titulo = titulo;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.disponible = disponible;
        this.categoria = categoria;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

module.exports = Producto;
