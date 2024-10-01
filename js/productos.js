document.addEventListener('DOMContentLoaded', function () {
    //esto luego se renderiza desde la api
    const cardsData = [
      {
        imgSrc: "https://ultimainformatica.com/2032466-thickbox_default/gigabyte-radeon-rx-6500-xt-eagle-4g-amd-4-gb-gddr6.jpg",
        title: "Gigabyte Radeon RX 6500 XT",
        text: "Familia de procesadores de gráficos: AMD, Procesador gráfico: Radeon RX 6500 XT. Capacidad memoria de adaptador gráfico: 4 GB, Tipo de memoria de adaptador gráfico: GDDR6, Ancho de datos: 64 bit, Velocidad de memoria del reloj: 18000 MHz. Máxima resolución: 7680 x 4320 Pixeles. Versión DirectX: 1‎2 Ultimate, Versión OpenGL: 4.6. Tipo de interfaz: PCI Express 4.0. Tipo de enfriamiento: Activo, Número de ventiladores: 3 Ventilador(es)",
        link: "#"
      },
      {
        imgSrc: "https://ultimainformatica.com/1303926-thickbox_default/amd-ryzen-5-5600x-procesador-37-ghz-32-mb-l3-caja-1.jpg",
        title: "AMD Ryzen 5 5600X",
        text: "Familia de procesador: AMD Ryzen™ 5, Socket de procesador: Zócalo AM4, Litografía del procesador: 7 nm. Tipos de memoria que admite el procesador: DDR4-SDRAM, Velocidad de reloj de memoria que admite el procesador: 3200 MHz. Segmento de mercado: Escritorio",
        link: "#"
      },
      // Añade más objetos para cada tarjeta aquí
      {
        imgSrc: "https://ultimainformatica.com/1304957-thickbox_default/amd-ryzen-5-5600-procesador-35-ghz-32-mb-l3-caja.jpg",
        title: "AMD Ryzen 5 5600",
        text: "Familia de procesador: AMD Ryzen™ 5, Socket de procesador: Zócalo AM4, Litografía del procesador: 7 nm. Canales de memoria: Dual-channel, Tipos de memoria que admite el procesador: DDR4-SDRAM, Velocidad de reloj de memoria que admite el procesador: 2667,2933,3200 MHz. Segmento de mercado: Escritorio",
        link: "#"
      },
      {
        imgSrc: "https://ultimainformatica.com/2766517-thickbox_default/intel-core-i3-13100f-procesador-12-mb-smart-cache-caja.jpg",
        title: "Intel Core i3 13100F",
        text: "Intel Core i3-13100F. Familia de procesador: Intel® Core™ i3, Socket de procesador: LGA 1700, Fabricante de procesador: Intel. Canales de memoria: Doble canal, Memoria interna máxima que admite el procesador: 192 GB, Tipos de memoria que admite el procesador: DDR4-SDRAM, DDR5-SDRAM. Segmento de mercado: Escritorio, Condiciones de uso: PC/Client/Tablet, Versión de entradas de PCI Express: 5.0, 4.0. Tipo de embalaje: Caja para distribución. Tamaño del CPU: 45 x 37.5 mm",
        link: "#"
      },
      {
        imgSrc: "https://ultimainformatica.com/2767938-thickbox_default/intel-core-i7-12700f-procesador-25-mb-smart-cache-caja.jpg",
        title: "Intel Core i7 12700F",
        text: "Familia de procesador: Intel® Core™ i7, Socket de procesador: LGA 1700, Fabricante de procesador: Intel. Canales de memoria: Doble canal, Memoria interna máxima que admite el procesador: 128 GB, Tipos de memoria que admite el procesador: DDR4-SDRAM, DDR5-SDRAM. Segmento de mercado: Escritorio, Condiciones de uso: PC/Client/Tablet, Versión de entradas de PCI Express: 5.0, 4.0. Intel® Turbo Boost Max Technology 3.0 frequency: 4,9 GHz.",
        link: "#"
      },
      {
        imgSrc: "https://ultimainformatica.com/1095581-thickbox_default/amd-ryzen-5-pro-5650g-procesador-39-ghz-16-mb-l3.jpg",
        title: "AMD Ryzen 5 PRO 5650G procesador 3,9 GHz 16 MB L3",
        text: "Familia de procesador: AMD Ryzen 5 PRO, Socket de procesador: Zócalo AM4, Componente para: PC. Canales de memoria: Dual-channel, Tipos de memoria que admite el procesador: DDR4-SDRAM, Velocidad de reloj de memoria que admite el procesador: 3200 MHz. Modelo de adaptador gráfico incorporado: AMD Radeon Graphics, Frecuencia base de gráficos incorporada: 1900 MHz.",
        link: "#"
      },
      {
        imgSrc: "https://ultimainformatica.com/1387356-thickbox_default/amd-ryzen-7-7700x-procesador-45-ghz-32-mb-l3-caja.jpg",
        title: "AMD Ryzen 7 7700X",
        text: "Familia de procesador: AMD Ryzen™ 7, Socket de procesador: Socket AM5, Fabricante de procesador: AMD. Canales de memoria: Dual-channel, Memoria interna máxima que admite el procesador: 128 GB, Velocidad de reloj de memoria que admite el procesador: 3600,5200 MHz. Modelo de adaptador gráfico incorporado: AMD Radeon Graphics, Frecuencia base de gráficos incorporada: 400 MHz, Frecuencia dinámica (máx) de adaptador gráfico incorporado: 2200 MHz. Sistemas operativos compatibles: Windows 11 - 64-Bit, Windows 10 - 64-Bit, RHEL x86 64-Bit, Ubuntu x86 64-Bit. Versión USB: 2.0/3.2 Gen 2 (3.1 Gen 2)",
        link: "#"
      },
      {
        imgSrc: "https://ultimainformatica.com/2340764-thickbox_default/intel-core-i9-11900k-procesador-35-ghz-16-mb-smart-cache-caja.jpg",
        title: "Intel Core i9 11900K",
        text: "Familia de procesador: Intel® Core™ i9, Socket de procesador: LGA 1200 (Socket H5), Litografía del procesador: 14 nm. Canales de memoria: Doble canal, Memoria interna máxima que admite el procesador: 128 GB, Tipos de memoria que admite el procesador: DDR4-SDRAM. Modelo de adaptador gráfico incorporado: Intel UHD Graphics 750, Memoria máxima de adaptador de gráfico incorporado: 64 GB, Frecuencia base de gráficos incorporada: 350 MHz. Segmento de mercado: Escritorio, Condiciones de uso: PC/Client/Tablet, Configuraciones PCI Express: 1x16+1x4, 2x8+1x4, 1x8+3x4. Intel® Turbo Boost Max Technology 3.0 frequency: 5,2 GHz, Intel® Turbo Boost Technology 2.0 frequency: 5,1 GHz, Intel® Thermal Velocity Boost Temperature: 70 °C",
        link: "#"
      },
      {
        imgSrc: "https://ultimainformatica.com/2826535-thickbox_default/cpu-amd-ryzen-5-8500g.jpg",
        title: "CPU AMD RYZEN 5 8500G",
        text: "Familia de procesador: AMD Ryzen? 5, Socket de procesador: Zócalo AM5, Litografía del procesador: 4 nm. Canales de memoria: Doble canal, Tipos de memoria que admite el procesador: DDR5-SDRAM, Velocidad de reloj de memoria que admite el procesador: 3600,5200 MHz. Modelo de adaptador gráfico incorporado: AMD Radeon 740M, Frecuencia base de gráficos incorporada: 2800 MHz. Segmento de mercado: Escritorio, Sistemas operativos compatibles: Windows 11/10 x64, RHEL x86 64-bit, Ubuntu x86 64-bit",
        link: "#"
      },
      {
        imgSrc: "https://ultimainformatica.com/2826537-thickbox_default/cpu-amd-ryzen-5-8600g.jpg",
        title: "CPU AMD RYZEN 5 8600G",
        text: "Familia de procesador: AMD Ryzen? 5, Socket de procesador: Zócalo AM5, Litografía del procesador: 4 nm. Canales de memoria: Doble canal, Tipos de memoria que admite el procesador: DDR5-SDRAM, Velocidad de reloj de memoria que admite el procesador: 3600,5200 MHz. Modelo de adaptador gráfico incorporado: AMD Radeon 760M, Frecuencia base de gráficos incorporada: 2800 MHz. Segmento de mercado: Escritorio, Sistemas operativos compatibles: Windows 11/10 x64, RHEL x86 64-bit, Ubuntu x86 64-bit",
        link: "#"
      },
    ];

    const cardsContainer = document.getElementById('cards-container');
      const cardsPorPagina = 6;
      let paginaActual = 0;

      function renderCards() {
        cardsContainer.innerHTML = ''; // Limpiar el contenedor
        const start = paginaActual * cardsPorPagina;
        const end = start + cardsPorPagina;
        const currentCards = cardsData.slice(start, end);

        currentCards.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.className = 'col-md-4 mb-4 card-wrapper';
          cardElement.innerHTML = `
            <div class="card">
              <img src="${card.imgSrc}" class="card-img-top" alt="${card.title}">
              <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.text}</p>
                <a href="${card.link}" class="btn btn-primary">Ver más</a>
              </div>
            </div>
          `;
          cardsContainer.appendChild(cardElement);
        });
      }

      
      // Manejadores para los botones de siguiente y anterior
      document.getElementById('next').addEventListener('click', function () {
        if ((paginaActual + 1) * cardsPorPagina < cardsData.length) {
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