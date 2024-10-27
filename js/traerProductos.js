
import Producto from "./producto.js";

const botonPrev = document.querySelector("#anterior");
const botonNext = document.querySelector("#siguiente");
const cardsContainer = document.querySelector("#cards-container");    
const cardsPorPagina = 6;
let paginaActual = 0;
let contenidoCards = [];

const path = new URLSearchParams(window.location.search);
const categoria = path.get("categoria");

const cargarProductos = async() => {
  try{
    const jsonURL = `../JSON/${categoria}.json`;
    const respuesta = await fetch(jsonURL);
    const data = await respuesta.json();

    const productos = data[categoria];
    contenidoCards = productos.map(prod => new Producto(
      prod.id,
      prod.imgSrc,
      prod.titulo,
      prod.precio,
      prod.descripcion,
      prod.link,
      prod.cantidad,
      prod.disponible
    ));
    contenidoCards.forEach(p => {
      p.categoria = categoria;
    })
    
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