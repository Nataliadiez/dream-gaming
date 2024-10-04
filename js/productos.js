
import { contenidoCards } from "./objetos.js";

document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
      const cardsPorPagina = 6;
      let paginaActual = 0;

      function renderCards() {
        cardsContainer.innerHTML = ''; // Limpiar el contenedor
        const start = paginaActual * cardsPorPagina;
        const end = start + cardsPorPagina;
        const cardActual = contenidoCards.slice(start, end);

        cardActual.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.className = 'col-md-4 mb-4 card-wrapper';
          cardElement.innerHTML = `
            <div class="card">
              <img src="${card.imgSrc}" class="card-img-top" alt="${card.titulo}">
              <div class="card-body">
                <h5 class="card-title">${card.titulo}</h5>
                <p class="card-text">$${card.precio}</p>
                <a href="${card.link}" class="btn btn-card">Ver más</a>
              </div>
            </div>
          `;
          cardsContainer.appendChild(cardElement);
        });
      }

      
      // Manejadores para los botones de siguiente y anterior
      document.getElementById('next').addEventListener('click', function () {
        if ((paginaActual + 1) * cardsPorPagina < contenidoCards.length) {
          paginaActual++;
          renderCards();
        }
      });

      document.getElementById('prev').addEventListener('click', function () {
        if (paginaActual > 0) {
          paginaActual--;
          renderCards();
        }
      });

      // Renderizar la primera página al cargar
      renderCards();
    });