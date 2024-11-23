const contenedorCarrito = document.querySelector("#contenedor-carrito");
const btnComprar = document.querySelector("#btn-comprar");
const stockSpan = document.querySelector("#stockDisponible");
const btnEliminar = document.querySelector("#confirmarEliminar");
const btnConfirmarCompra = document.querySelector("#confirmarComprar");

let productoAEliminar;

const linkCarrito = `<link rel="stylesheet" href="./style/carrito.css">`;
document.head.insertAdjacentHTML("beforeend", linkCarrito);

btnEliminar.addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== productoAEliminar);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
    const modal = bootstrap.Modal.getInstance(document.querySelector('#modalEliminar'));
    modal.hide();
});


const cargarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
        btnComprar.classList.add("btn-comprar-oculto");
        btnComprar.classList.remove("btn-comprar");
        return;
    }else{
        btnComprar.classList.add("btn-comprar");
        btnComprar.classList.remove("btn-comprar-oculto");
    }

    carrito.forEach(producto => {
        const contenido = `
        <div class="unidadCompra">
            <img class="imgProducto" src="${producto.imagen}" alt="">
            <div class="div-col">
                <h5 id="tituloProducto">${producto.titulo}</h5>
            </div>

            <div class="div-flex contenedorCantidad">
                <button class="btn btn-primary" id="decremento" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                <input type="number" class="inputCantidad" value="${producto.cantidadElegida}" onchange="actualizarCantidad(${producto.id}, this.value)">
                <button class="btn btn-primary" id="incremento" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
            </div>

            <div class="div-flex">
                <button id="btn-borrar-item" onclick="eliminarDelCarrito(${producto.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>

            <div class="div-flex div-precio">
                <p id="precio">Precio: $${producto.precio * producto.cantidadElegida}</p>
            </div>
        </div>
        `;
        contenedorCarrito.insertAdjacentHTML("beforeend", contenido);
    });
};

const cambiarCantidad = (idProducto, monto) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = carrito.find(item => item.id === idProducto);

    if (producto) {
        let nuevaCantidad = producto.cantidadElegida + monto;

        if (nuevaCantidad > producto.stockDisponible) {
            stockSpan.textContent = producto.stockDisponible;
            const modalStock = new bootstrap.Modal(document.querySelector("#modalStock"));
            modalStock.show();
            return;
        }

        if (nuevaCantidad < 1) {
            nuevaCantidad = 1;
        }

        producto.cantidadElegida = nuevaCantidad;

        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }
};

const actualizarCantidad = (idProducto, cantidad) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = carrito.find(item => item.id === idProducto);

    if (producto) {
        const nuevaCantidad = Math.max(1, parseInt(cantidad));

        if (nuevaCantidad > producto.stockDisponible) {
            alert(`Solo hay ${producto.stockDisponible} unidades disponibles.`);
            return;
        }

        producto.cantidadElegida = nuevaCantidad;

        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }
};

const eliminarDelCarrito = (idProducto) => {
    productoAEliminar = idProducto;
    const producto = JSON.parse(localStorage.getItem("carrito")).find(item => item.id === productoAEliminar);
    const nombreProducto = document.querySelector("#nombreProducto");
    nombreProducto.textContent = producto.titulo;

    const modal = new bootstrap.Modal(document.querySelector('#modalEliminar'));
    modal.show();
};

const comprarCarrito = () => {
    const modalConfirmarCompra = new bootstrap.Modal(document.querySelector("#modalComprar"))
    modalConfirmarCompra.show();
    btnConfirmarCompra.addEventListener("click", ()=> {
    window.location.href = "ticketCompra.html";
    })
}


document.addEventListener("DOMContentLoaded", cargarCarrito);
btnComprar.addEventListener("click", comprarCarrito)