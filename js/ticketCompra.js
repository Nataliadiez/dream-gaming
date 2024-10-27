
const contenedorTicket = document.querySelector("#contenedorTicket");
const { jsPDF } = window.jspdf;

const traerContenidoCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    return carrito || [];
}

const pintarTicket = () => {
    const carrito = traerContenidoCarrito();
    let totalCompra = 0;
    const filas = carrito.map(p => {
        const precioProducto = p.precio * p.cantidadElegida;
        totalCompra += precioProducto;
        return `
            <tr>
                <th scope="row">${p.titulo}</th>
                <td>${p.cantidadElegida}</td>
                <td>${precioProducto}</td>
            </tr>
        `
    }).join("")
    const contenidoTicket = `
    <h1>Ticket de compra</h1>
        <p>Compra número #15462313</p>
        <div class="container">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td>Total: ${totalCompra}</td>
                    </tr>
                </tbody>
            </table>

            <div id="div-flex">
                <p>Gracias por su compra!</p>
                <p>www.dreaming-game.com.ar</p>
            </div>

            <div id="contenedor-botones">
                <button class="btn btn-primary" id="comprarDeNuevo">Comprar nuevamente</button>
                <button class="btn btn-primary" id="imprimirTicket">Imprimir ticket</button>
            </div>
        </div>
    `
    contenedorTicket.insertAdjacentHTML("beforeend", contenidoTicket);
    const btnImprimirTicket = document.querySelector("#imprimirTicket");
    const btnNuevaCompra = document.querySelector("#comprarDeNuevo")
    btnImprimirTicket.addEventListener("click", imprimirTicket)
    btnNuevaCompra.addEventListener("click", comprarNuevamente);
}

const imprimirTicket = () => {
    html2canvas(contenedorTicket)
    .then(canvas => {
        //convierte el canva en una imagen
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("ticketDeCompra.pdf");
    });
}
const comprarNuevamente = () => {
    localStorage.clear();
    alert("Se borró correctamente!");
    window.location.href = "index.html"
}


document.addEventListener("DOMContentLoaded", pintarTicket);