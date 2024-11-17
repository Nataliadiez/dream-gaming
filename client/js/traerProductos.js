const cargarProductos = async () => {
  try {
      const url = "http://localhost:3000/productos";
      const respuesta = await fetch(url);
      const html = await respuesta.text();

      const container = document.querySelector("#cards-container");
      container.insertAdjacentHTML("beforebegin", html);
  } catch (error) {
      console.error("Error al cargar los productos:", error);
  }
};
document.addEventListener("DOMContentLoaded", cargarProductos);
