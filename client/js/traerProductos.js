const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");

const cargarProductos = async () => {
    try {
        let url = "http://localhost:3000/productos";
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

document.addEventListener("DOMContentLoaded", cargarProductos);
