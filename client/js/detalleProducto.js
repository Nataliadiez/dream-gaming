
const params = new URLSearchParams(window.location.search);
const productoId = params.get("id"); //1, 2, 3, etc.
const contenedorDetalleProducto = document.querySelector("#contenedor-producto");
const contenedorModal = document.querySelector('#modalAgregadoCarrito');

const cambiarCantidad = (monto) => {
    const input = document.querySelector("#cantidadProducto");

    let valorActual = parseInt(input.value);
    let nuevoValor = valorActual + monto;

    if (nuevoValor >= 1) {
        input.value = nuevoValor;
    }
}
const cargarProductoDetalle = async () => {
    try {
        const respuesta = await fetch(`http://localhost:3000/productos/${productoId}`);
        const producto = await respuesta.json();
        console.log(producto)

        const contenido = `
        <div class="card mb-3 contenido-producto">
            <div class="row g-0 contenido-reducido">
                <div class="col-md-4">
                    <img src="${producto.imagen}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text parrafo-descripcion">${producto.descripcion}</p>
                        
                        <p class="card-text text-success h5">Precio: $${producto.precio}</p>
                        <p class="card-text"><i class="bi bi-truck"></i> Envío gratis a todo el país</p>
                        
                        <button class="btn btn-card" id="agregarCarrito">Agregar al carrito</button>
                        <div class="div-flex contenedorCantidad">
                            <button id="decremento" class="btn btn-primary" onclick="cambiarCantidad(-1)">-</button>
                            <input disabled type="number" id="cantidadProducto" class="inputCantidad" value="1">
                            <button id="incremento" class="btn btn-primary" onclick="cambiarCantidad(1)">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        contenedorDetalleProducto.insertAdjacentHTML("beforeend", contenido);
        const btnAgregarCarrito = document.querySelector("#agregarCarrito");
        btnAgregarCarrito.addEventListener("click", () => agregarAlCarrito(producto));

    } catch (error) {
        console.error("Error al cargar el producto:", error);
    }
};

const agregarAlCarrito = (producto) => {
    const cantidad = parseInt(document.querySelector("#cantidadProducto").value);
    console.log(producto.id)
    const productoCarrito = {
        id: producto.id,
        titulo: producto.titulo,
        precio: producto.precio,
        cantidadElegida: cantidad,
        imagen: producto.imagen,
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(item => item.id === productoCarrito.id);
    if (productoExistente) {
        productoExistente.cantidadElegida += cantidad;
    } else {
        carrito.push(productoCarrito);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const modalAgregadoCarrito = new bootstrap.Modal(contenedorModal);
    modalAgregadoCarrito.show();
};

document.addEventListener("DOMContentLoaded", cargarProductoDetalle);
