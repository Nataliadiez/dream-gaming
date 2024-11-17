const express = require("express");
const router = express.Router();

router.get("/", (req, res)=> {
    res.send("Todos los productos")
});

router.get("/:id", (req, res)=> {
    res.send(`Obtener producto con id: ${req.params.id}`);
})

// router.put("/:id", (req, res)=> {
//     const {id} = req.params;
//     res.send(`Modificar producto con id: ${id}`);
// })

// router.post("/:id", (req, res)=> {
//     const {id} = req.params;
//     res.send(`Agregar producto con id: ${id}`);
// })

// router.delete("/:id", (req, res)=> {
//     const {id} = req.params;
//     res.send(`Borrar producto con id: ${id}`);
// })

module.exports = router;