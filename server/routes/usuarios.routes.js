const express = require("express");
const router = express.Router();

const {
    obtenerUsuarios,
    inicioSesionRapido,
    registroDeUsuario,
    loguearUsuario
} = require("../controllers/usuarios.controller.js");

// Obtener todos los usuarios
router.get('/', obtenerUsuarios);

//Obtener un usuario para inicio de sesión rápido
router.get("/inicio-rapido", inicioSesionRapido);

// Registrar un usuario
router.post('/register', registroDeUsuario);

// Loguear un usuario
router.post('/login', loguearUsuario);


module.exports = router;
