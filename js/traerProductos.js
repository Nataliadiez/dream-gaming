
import Producto from "./producto.js";

const botonPrev = document.getElementById("prev");
const botonNext = document.getElementById("next");
const cardsContainer = document.getElementById("cards-container");    
const cardsPorPagina = 6;
let paginaActual = 0;
let contenidoCards = [];

const cargarProductos = async() => {
  try{
    const respuesta = await fetch("../JSON/procesadores.json");
    const data = await respuesta.json();
  
    contenidoCards = data.procesadores.map(prod => new Producto(
      prod.id,
      prod.imgSrc,
      prod.titulo,
      prod.precio,
      prod.descripcion,
      prod.link,
      prod.cantidad,
      prod.disponible
    ));
  }catch(error){
    console.log(error);
  }
}

const renderizarCards = () => {
  cardsContainer.innerHTML = "";
  const start = paginaActual * cardsPorPagina;
  const end = start + cardsPorPagina;
  const cardAmostrar = contenidoCards.slice(start, end)
  
  cardAmostrar.forEach(p => {
    cardsContainer.appendChild(p.mostrarCards());
  })
}

const cambiarPagina = () => {
  botonNext.addEventListener('click', () => {
    if ((paginaActual + 1) * cardsPorPagina < contenidoCards.length) {
      paginaActual++;
      renderizarCards();
    }
  });
  
  botonPrev.addEventListener('click', () => {
    if (paginaActual > 0) {
      paginaActual--;
      renderizarCards();
    }
  });
}

const deployarProductos = async() => {
  await cargarProductos();
  renderizarCards();
  cambiarPagina();
}

document.addEventListener("DOMContentLoaded", deployarProductos);