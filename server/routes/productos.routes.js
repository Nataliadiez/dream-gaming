const express = require("express");
const router = express.Router();

router.get("/", (req, res)=> {
    res.send("Todos los productos")
});

router.get("/:id", (req, res)=> {
    res.send(`Obtener producto con id: ${req.params.id}`);
});

module.exports = router;