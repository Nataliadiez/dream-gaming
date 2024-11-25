
const contenedorTicket = document.querySelector("#contenedorTicket");
const { jsPDF } = window.jspdf;

const traerContenidoCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    return carrito || [];
}

const pintarTicket = async() => {
    const carrito = traerContenidoCarrito();
    const cliente = localStorage.getItem("nombreUsuario");
    const contenidoTicket = `
    <h1>Ticket de compra</h1>
        <p>Compra número #15462313</p>
        <div class="container" id="contenedorParaTicket">
            <div id="contenedor-botones">
                <button class="btn btn-primary" id="comprarDeNuevo">Comprar nuevamente</button>
                <button class="btn btn-primary" id="imprimirTicket">Imprimir ticket</button>
            </div>
        </div>
    `
    contenedorTicket.insertAdjacentHTML("beforeend", contenidoTicket);
    const contenedor = document.querySelector("#contenedorParaTicket");

    const response = await fetch("http://localhost:3000/ventas/ticket", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carrito }),
    });

    const contenidoTicketEJS = await response.text();
    contenedor.insertAdjacentHTML("beforebegin", contenidoTicketEJS);
    
    const btnImprimirTicket = document.querySelector("#imprimirTicket");
    const btnNuevaCompra = document.querySelector("#comprarDeNuevo")
    btnImprimirTicket.addEventListener("click", imprimirTicket)
    btnNuevaCompra.addEventListener("click", comprarNuevamente);

    const response_venta = await fetch("http://localhost:3000/ventas", {
        method: "POST",
        header:{
            'Content-Type': 'application/json',
        },
        body:{
            carrito: JSON.stringify({ carrito }), 
            nombre_cliente: "Natt",
        }
    });

    console.log(response_venta.json());

}

const imprimirTicket = () => {
    html2canvas(contenedorTicket)
    .then(canvas => {
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