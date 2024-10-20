
//new URLSearchParams es una interfaz que permite trabajar con lo que viaja por parámetros en la URL.
//son los que aparecen luego de ?
//windows.location.search es la barra de búsqueda
// .get es un método de los parámetros para obtener el valor de la clave entre paréntesis
const params = new URLSearchParams(window.location.search);
const productoId = params.get('id');//esto va a ser 1, 2, 3, etc.
const contenedorDetalleProducto = document.querySelector("#contenedor-producto");


const cargarProductoDetalle = async () => {
    try {
        const respuesta = await fetch("../JSON/procesadores.json");
        const data = await respuesta.json();
        const producto = data.procesadores.find(p => p.id === parseInt(productoId));

        if (producto) {
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
                            
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <p class="card-text"><i class="bi bi-truck"></i> Envío gratis a todo el país</p>
                            
                            <button class="btn btn-primary">Agregar al carrito</button>
                            <p class="card-text"><small class="text-body-secondary">Stock: ${producto.cantidad}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            `
            contenedorDetalleProducto.insertAdjacentHTML("beforeend", contenido);
        } else {
            console.log("Producto no encontrado");
        }
    } catch (error) {
        console.error("Error al cargar el producto:", error);
    }
};

document.addEventListener("DOMContentLoaded", cargarProductoDetalle);

