const express = require("express");
const router = express.Router();
const UsuarioSequelize = require("../entity/usuario.entity.js");

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await UsuarioSequelize.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error al obtener usuarios" });
    }
});

// Registrar un usuario
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuarioExistente = await UsuarioSequelize.findOne({ where: { email } });

        if (usuarioExistente) {
            return res.status(400).json({ success: false, message: "El usuario ya está registrado" });
        }
        const nuevoUsuario = await UsuarioSequelize.create({ email, password });
        res.status(201).json({ success: true, message: `Usuario creado exitosamente!: ${nuevoUsuario.email}` });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ success: false, message: "Error al registrar el usuario" });
    }
});

// Loguear un usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await UsuarioSequelize.findOne({ where: { email } });

        if (!usuario || usuario.password !== password) {
            return res.status(404).json({ success: false, message: "Usuario o contraseña incorrectos" });
        }

        res.status(200).json({ success: true, message: "Usuario logueado exitosamente!" });
    } catch (error) {
        console.error("Error al loguear el usuario:", error);
        res.status(500).json({ success: false, message: "Error al loguear el usuario" });
    }
});


module.exports = router;
