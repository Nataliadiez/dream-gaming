export default class Producto {
    id;
    img;
    titulo;
    precio;
    descripcion;
    link;
    cantidad;
    disponible;
    categoria;

    constructor(
        id,
        img,
        titulo,
        precio,
        descripcion,
        link,
        cantidad,
        disponible,
        categoria
    ) {
        this.id = id;
        this.img = img;
        this.titulo = titulo;
        this.precio = precio;
        this.descripcion = descripcion;
        this.link = link;
        this.cantidad = cantidad;
        this.disponible = disponible;
        this.categoria = categoria;
    }

    mostrarCards() {
        const cardElement = document.createElement("div");
        cardElement.className = "col-md-4 mb-4 card-wrapper";
        const contenido = `
        <div class="card">
            <img src="${this.img}" class="card-img-top" alt="${this.titulo}">
            <div class="card-body">
                <h5 class="card-title">${this.titulo}</h5>
                <p class="card-text">$${this.precio}</p>
                <a href="detalleProducto.html?id=${this.id}&categoria=${this.categoria}" class="btn btn-card">Ver más</a>
            </div>
        </div>
        `;
        cardElement.insertAdjacentHTML("beforeend", contenido);
        return cardElement;
    }
}
