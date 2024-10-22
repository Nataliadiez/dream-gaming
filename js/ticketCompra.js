const contenedorTicket = document.querySelector("#contenedorTicket")

const pintarTicket = () => {
    const contenidoTicket = `
            <div class="col-12 col-md-6 col-lg-4 bg-light p-4 rounded shadow ticket-container">
            <h1 class="text-center mb-4">Ticket de Compra</h1>

            <div class="ticket-header mb-3">
                <p><strong>Fecha:</strong> 21/10/2024</p>
                <p><strong>Número de Orden:</strong> #12345</p>
                <p><strong>Cliente:</strong> Juan Pérez</p>
            </div>

            <table class="table table-bordered">
                <thead class="table-light">
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="ticket-items">
                    <tr>
                        <td>Producto 1</td>
                        <td>2</td>
                        <td>$10.00</td>
                        <td>$20.00</td>
                    </tr>
                    <tr>
                        <td>Producto 2</td>
                        <td>1</td>
                        <td>$15.00</td>
                        <td>$15.00</td>
                    </tr>
                </tbody>
            </table>

            <div class="ticket-totals mt-3 text-end">
                <p class="total fs-5"><strong>Total:</strong> $42.35</p>
            </div>

            <div class="ticket-footer text-center mt-4">
                <p>Gracias por su compra</p>
                <p><strong>www.dreamgaming.com.ar</strong></p>
            </div>
            <div class="container div-btn">
                <button class="btn btn-primary">Volver a comprar</button>
                <button class="btn btn-primary">Imprimir ticket</button>
            </div>
        </div>
    `
    contenedorTicket.insertAdjacentHTML("beforeend", contenidoTicket);
}

document.addEventListener("DOMContentLoaded", pintarTicket);