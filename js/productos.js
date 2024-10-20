
import { contenidoCards } from "./objetos.js";
const botonPrev = document.getElementById("prev");
const botonNext = document.getElementById("next");

document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.getElementById("cards-container");
      const cardsPorPagina = 6;
      let paginaActual = 0;

      const renderizarCards = () => {
        cardsContainer.innerHTML = ""; // Limpiar el contenedor
        const start = paginaActual * cardsPorPagina;
        const end = start + cardsPorPagina;
        const cardActual = contenidoCards.slice(start, end);

        cardActual.forEach(card => {
          const cardElement = document.createElement("div");
          cardElement.className = "col-md-4 mb-4 card-wrapper";
          cardElement.innerHTML = `
            <div class="card">
              <img src="${card.imgSrc}" class="card-img-top" alt="${card.titulo}">
              <div class="card-body">
                <h5 class="card-title">${card.titulo}</h5>
                <p class="card-text">$${card.precio}</p>
                <a href="detalle.html?id=${card.id}" class="btn btn-card">Ver más</a>
              </div>
            </div>
          `;
          cardsContainer.appendChild(cardElement);
        });
      }
      
      // Manejadores para los botones de siguiente y anterior
      botonNext.addEventListener('click', async () => {
        if ((paginaActual + 1) * cardsPorPagina < contenidoCards.length) {
          paginaActual++;
          await renderizarCards();
        }
      });

      botonPrev.addEventListener('click', async () => {
        if (paginaActual > 0) {
          paginaActual--;
          await renderizarCards();
        }
      });

      // Renderizar la primera página al cargar
      renderizarCards();
    });