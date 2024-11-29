const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");
const linkProducto = `<link rel="stylesheet" href="./style/home.css" />`;
document.head.insertAdjacentHTML("beforeend", linkProducto);

const siguiente = document.getElementById("siguiente");
const anterior = document.getElementById("anterior");

let paginaActual = 1;
let totalPaginas = 1;

function PaginaSiguiente() {
    if (paginaActual < totalPaginas) {
        paginaActual += 1;
        cargarProductos(paginaActual);
    }
}

function PaginaAnterior() {
    if (paginaActual > 1) {
        paginaActual -= 1;
        cargarProductos(paginaActual);
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
        
        const totalPaginasElement = document.querySelector('#total-paginas');
        if (totalPaginasElement) {
            totalPaginas = parseInt(totalPaginasElement.value);
        }
        
        siguiente.disabled = paginaActual >= totalPaginas;
        anterior.disabled = paginaActual <= 1;
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};

siguiente.addEventListener("click", PaginaSiguiente);
anterior.addEventListener("click", PaginaAnterior);
document.addEventListener("DOMContentLoaded", () => cargarProductos(paginaActual));