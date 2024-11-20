const express = require("express");
const router = express.Router();

// Simula una base de datos
let usuarios = [
{ email: "administrador123@gmail.com", password: "password123" }
];

//obtener todos los usuarios
router.get('/', (req, res) => {
    res.json(usuarios);
});

//registrar un usuario
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    usuarios.push({ email, password });
    res.json({ success: true });
});

//loguear un usuario
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const usuario = usuarios.find(u => u.email === email);
    
    if (usuario && usuario.password === password) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});



module.exports = router;