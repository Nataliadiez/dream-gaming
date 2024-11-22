const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");


const linkProducto = `<link rel="stylesheet" href="./style/home.css" />`;
document.head.insertAdjacentHTML("beforeend", linkProducto);

const siguiente = document.getElementById("siguiente");
const anterior = document.getElementById("anterior");

let pagina = 1;

function PaginaSiguiente(){
    pagina += 1;
    cargarProductos(pagina);
}

function PaginaAnterior(){
    if(pagina > 1){
        pagina -= 1;
        cargarProductos(pagina);
    }

}

const cargarProductos = async (num) => {
    try {
        let url = `http://localhost:3000/productos/producto/${num}`;
        if (categoria) {
            url += `?categoria=${categoria}`;
        }
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const html = await respuesta.text();
        const container = document.querySelector("#cards-container");

        container.innerHTML = "";
        container.insertAdjacentHTML("beforeend", html);

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};

siguiente.addEventListener("click", PaginaSiguiente);
anterior.addEventListener("click", PaginaAnterior);
document.addEventListener("DOMContentLoaded", () => cargarProductos(pagina));
