
//new URLSearchParams es una interfaz que permite trabajar con lo que viaja por parámetros en la URL.
//son los que aparecen luego de ?
//windows.location.search es la barra de búsqueda
// .get es un método de los parámetros para obtener el valor de la clave entre paréntesis
const params = new URLSearchParams(window.location.search);
const productoId = params.get('id'); //1, 2, 3, etc.
const contenedorDetalleProducto = document.querySelector("#contenedor-producto");
const categoria = params.get('categoria'); //procesadores, placas, memorias
const contenedorModal = document.querySelector('#modalAgregadoCarrito');
let cantidadMaxima;


const obtenerJsonSegunCategoria = () => {
    let jsonArchivo = "";
    if (categoria === "procesadores") {
        jsonArchivo = "../JSON/procesadores.json";
    } else if (categoria === "placas") {
        jsonArchivo = "../JSON/placas.json";
    } else if (categoria === "memorias") {
        jsonArchivo = "../JSON/memorias.json";
    }
    return jsonArchivo;
};


const cambiarCantidad = (monto) => {
    const input = document.querySelector("#cantidadProducto"); // Mover aquí para asegurarse de que esté disponible
    let valorActual = parseInt(input.value);
    let nuevoValor = valorActual + monto;

    if (nuevoValor >= 1 && nuevoValor <= cantidadMaxima) {
        input.value = nuevoValor;
    }
}

const cargarProductoDetalle = async () => {
    try {
        const jsonURL = obtenerJsonSegunCategoria();
        const respuesta = await fetch(jsonURL);
        const data = await respuesta.json();

        let productos = [];
        if (categoria === "procesadores") {
            productos = data.procesadores;
        } else if (categoria === "placas") {
            productos = data.placas;
        } else if (categoria === "memorias") {
            productos = data.memorias;
        }


        const producto = productos.find(p => p.id === parseInt(productoId));

        if (producto) {
            cantidadMaxima = producto.cantidad;
            const contenido = `
            <div class="card mb-3 contenido-producto">
                <div class="row g-0 contenido-reducido">
                    <div class="col-md-4">
                        <img src="${producto.imgSrc}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">${producto.titulo}</h5>
                            <p class="card-text parrafo-descripcion">${producto.descripcion}</p>
                            
                            <p class="card-text text-success h5">Precio: $${producto.precio}</p>
                            <p class="card-text"><i class="bi bi-truck"></i> Envío gratis a todo el país</p>
                            
                            <button class="btn btn-card" id="agregarCarrito">Agregar al carrito</button>
                            <p class="card-text"><small class="text-white-50">Stock: ${producto.cantidad}</small></p>
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
        } else {
            console.log("Producto no encontrado");
        }
    } catch (error) {
        console.error("Error al cargar el producto:", error);
    }
};

const agregarAlCarrito = (producto) => {
    const cantidad = parseInt(document.querySelector("#cantidadProducto").value);
    const productoCarrito = {
        id: producto.id,
        titulo: producto.titulo,
        precio: producto.precio,
        cantidadElegida: cantidad,
        stockDisponible: producto.cantidad,
        img: producto.imgSrc,
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(item => item.id === productoCarrito.id);
    if (productoExistente) {
        const nuevaCantidad = productoExistente.cantidadElegida + cantidad;


        if (nuevaCantidad > productoCarrito.stockDisponible) {
            alert(`Solo hay ${productoCarrito.stockDisponible} unidades disponibles.`);
            return;
        }
        
        productoExistente.cantidadElegida = nuevaCantidad;
    } else {
        carrito.push(productoCarrito);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    const modalAgregadoCarrito = new bootstrap.Modal(contenedorModal);
    modalAgregadoCarrito.show();
};


document.addEventListener("DOMContentLoaded", cargarProductoDetalle);

