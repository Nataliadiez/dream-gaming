const express = require("express");
const router = express.Router();

// Datos de ejemplo de productos
const productos = [
    {
        "id": 1,
        "imagen": "https://ultimainformatica.com/1282154-thickbox_default/team-group-delta-rgb-32gb-2x16gb-5600mhz-cl32-ddr5-negra.jpg",
        "titulo": "Team Group Delta RGB 32GB (2x16GB) 5600MHz CL32 DDR5 Negra",
        "precio": 580000,
        "descripcion": "MODULO MEMORIA RAM DDR5 32GB 2X16GB 5600MHz TEAMGROUP DELTA RGB BLACK RGB BLACK CL 32 1.2V",
        "estado": true,
        "categoria": "memorias"
    },
    {
        "id": 2,
        "imagen": "https://ultimainformatica.com/2853711-thickbox_default/kingston-technology-fury-beast-rgb-modulo-de-memoria-16-gb-1-x-16-gb-ddr4-3200-mhz.jpg",
        "titulo": "Kingston Technology Fury Beast RGB 16GB (1x16GB) 3200MHz CL16 DDR4 Negra",
        "precio": 450000,
        "descripcion": "Kingston Technology FURY Beast RGB. Componente para: PC/servidor, Memoria interna: 16 GB, Diseño de memoria (módulos x tamaño): 1 x 16 GB, Tipo de memoria interna: DDR4, Velocidad de memoria del reloj: 3200 MHz, Forma de factor de memoria: 288-pin DIMM, Latencia CAS: 16",
        "estado": true,
        "categoria": "memorias"
    },
    {
        "id": 3,
        "imagen": "https://ultimainformatica.com/1394776-thickbox_default/crucial-ct8g4dfra32a-modulo-de-memoria-8-gb-1-x-8-gb-ddr4-3200-mhz-189338-189339-189340-189341-189342.jpg",
        "titulo": "Crucial CT8G4DFRA32A 8GB 3200MHZ DDR4",
        "precio": 750000,
        "descripcion": "Crucial CT8G4DFRA32A. Componente para: PC/servidor, Memoria interna: 8 GB, Diseño de memoria (módulos x tamaño): 1 x 8 GB, Tipo de memoria interna: DDR4, Velocidad de memoria del reloj: 3200 MHz, Latencia CAS: 22",
        "estado": true,
        "categoria": "memorias"
    },
    {
        "id": 4,
        "imagen": "https://ultimainformatica.com/2865970-thickbox_default/kingston-technology-fury-beast-rgb-modulo-de-memoria-32-gb-2-x-16-gb-ddr5.jpg",
        "titulo": "Kingston Technology Fury Beast RGB 32GB (2x16GB) 4800MHz CL38 DDR5 Negra",
        "precio": 650000,
        "descripcion": "Kingston Technology FURY Beast RGB. Componente para: PC/servidor, Memoria interna: 32 GB, Diseño de memoria (módulos x tamaño): 2 x 16 GB, Tipo de memoria interna: DDR5, Forma de factor de memoria: 288-pin DIMM, Latencia CAS: 38",
        "estado": true,
        "categoria": "memorias"
    },
    {
        "id": 5,
        "imagen": "https://ultimainformatica.com/998815-thickbox_default/crucial-ct16g4sfra32a-modulo-de-memoria-16-gb-1-x-16-gb-ddr4-3200-mhz-222178-222179-222180-222181-222182.jpg",
        "titulo": "Crucial 16GB (1x16GB) 3200MHz DDR4",
        "precio": 700000,
        "descripcion": "Crucial CT16G4SFRA32A. Componente para: Portátil, Memoria interna: 16 GB, Diseño de memoria (módulos x tamaño): 1 x 16 GB, Tipo de memoria interna: DDR4, Velocidad de memoria del reloj: 3200 MHz, Latencia CAS: 22",
        "estado": true,
        "categoria": "memorias"
    },
    {
        "id": 6,
        "imagen": "https://ultimainformatica.com/2879721-thickbox_default/dahua-technology-ddr-c600urw32g36d-modulo-de-memoria-32-gb-2-x-16-gb-ddr4-3600-mhz.jpg",
        "titulo": "DDR4 DAHUA 2X16GB 3600 C600 RGB BLANCO",
        "precio": 1150000,
        "descripcion": "Dahua Technology DDR-C600URW32G36D. Componente para: PC, Memoria interna: 32 GB, Diseño de memoria (módulos x tamaño): 2 x 16 GB, Tipo de memoria interna: DDR4, Velocidad de memoria del reloj: 3600 MHz, Forma de factor de memoria: 288-pin DIMM, Latencia CAS: 18",
        "estado": true,
        "categoria": "memorias"
    },
    {
        "id": 7,
        "imagen": "https://ultimainformatica.com/3090541-thickbox_default/modulo-memoria-ram-ddr4-32gb-2x16gb-3600mhz-teamgroup-vulca.jpg",
        "titulo": "Team Group Vulcan 32GB (2x16GB) 3600MHz CL18 DDR4",
        "precio": 1800000,
        "descripcion": "MODULO MEMORIA RAM DDR4 32GB 2X16GB 3600MHz TEAMGROUP VULCAN Z RED CL 18 1.35V",
        "estado": true,
        "categoria": "memorias"
    },
    {
        "id": 8,
        "imagen": "https://ultimainformatica.com/2879889-thickbox_default/dahua-technology-ddr-c600urg32g36d-modulo-de-memoria-32-gb-2-x-16-gb-ddr4-3600-mhz.jpg",
        "titulo": "DDR4 DAHUA 2X16GB 3600 C600 RGB GRIS",
        "precio": 520000,
        "descripcion": "Dahua Technology DDR-C600URG32G36D. Componente para: PC, Memoria interna: 32 GB, Diseño de memoria (módulos x tamaño): 2 x 16 GB, Tipo de memoria interna: DDR4, Velocidad de memoria del reloj: 3600 MHz, Forma de factor de memoria: 288-pin DIMM, Latencia CAS: 18",
        "estado": true,
        "categoria": "memorias"
    },
    {
        "id": 9,
        "imagen": "https://ultimainformatica.com/2867222-thickbox_default/kingston-technology-fury-beast-modulo-de-memoria-32-gb-2-x-16-gb-ddr4.jpg",
        "titulo": "HyperX Fury Beast 32GB (2x16GB) 3200MHz CL16 DDR4 Negra",
        "precio": 2000000,
        "descripcion": "Kingston Technology FURY Beast. Componente para: PC/servidor, Memoria interna: 32 GB, Diseño de memoria (módulos x tamaño): 2 x 16 GB, Tipo de memoria interna: DDR4, Forma de factor de memoria: 288-pin DIMM, Latencia CAS: 16",
        "estado": true,
        "categoria": "memorias"
    },
    {
        "id": 10,
        "imagen": "https://ultimainformatica.com/2879951-thickbox_default/dahua-technology-ddr-c600uhw16g36-modulo-de-memoria-16-gb-1-x-16-gb-ddr4-3600-mhz.jpg",
        "titulo": "DDR4 DAHUA 16GB 3600 C600 BLANCO",
        "precio": 450000,
        "descripcion": "Dahua Technology DDR-C600UHW16G36. Componente para: PC, Memoria interna: 16 GB, Diseño de memoria (módulos x tamaño): 1 x 16 GB, Tipo de memoria interna: DDR4, Velocidad de memoria del reloj: 3600 MHz, Forma de factor de memoria: 288-pin DIMM, Latencia CAS: 18",
        "estado": true,
        "categoria": "memorias"
    }
];


router.get("/", (req, res) => {
    res.render("productos", { productos });
});


router.get("/:id", (req, res) => {
    const producto = productos.find((p) => p.id === parseInt(req.params.id));
    if (producto) {
        res.send(`Producto: ${producto.nombre}, Precio: $${producto.precio}`);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

module.exports = router;