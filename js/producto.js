export default class Producto {
    id;
    img;
    titulo;
    precio;
    descripcion;
    cantidad;
    disponible;
    categoria;

    constructor(
        id,
        img,
        titulo,
        precio,
        descripcion,
        cantidad,
        disponible,
        categoria
    ) {
        this.id = id;
        this.img = img;
        this.titulo = titulo;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.disponible = disponible;
        this.categoria = categoria;
    }

    mostrarCards(eliminarCards) {
        const cardElement = document.createElement("div");
        cardElement.className = "col-md-4 mb-4 card-wrapper";
        const contenido = Producto.editarCards()? `
            <div class="card">
            <div id="contenedor-edit">
                <img src="${this.img}" class="card-img-top" alt="${this.titulo}">
                <span><button id="eliminarCard" class="edit"><i class="bi bi-trash"></i></button></span>
            </div>
                <div class="card-body">
                    <span><h5 class="card-title">${this.titulo}</h5><button class="edit"><i class="bi bi-pencil"></i></button></span>
                    <span><p class="card-text">$${this.precio}</p><button class="edit"><i class="bi bi-pencil"></i></button></span>
                    <a href="detalleProducto.html?id=${this.id}&categoria=${this.categoria}" class="btn btn-card">Ver más</a>
                </div>
            </div>`:
            `<div class="card">
                <img src="${this.img}" class="card-img-top" alt="${this.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${this.titulo}</h5>
                    <p class="card-text">$${this.precio}</p>
                    <a href="detalleProducto.html?id=${this.id}&categoria=${this.categoria}" class="btn btn-card">Ver más</a>
                </div>
            </div>`
        cardElement.insertAdjacentHTML("beforeend", contenido);
        const btnEliminar = cardElement.querySelector("#eliminarCard");
        btnEliminar.addEventListener("click", ()=> {
            eliminarCards(this);
        })
        return cardElement;
    }
    static editarCards(){
        let esAdmin = false;
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        if(usuarios.length > 0){
            esAdmin = true;
        }
        return esAdmin;
    }
}
