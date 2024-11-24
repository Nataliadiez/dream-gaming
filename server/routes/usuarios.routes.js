const express = require("express");
const router = express.Router();
const UsuarioSequelize = require("../entity/usuario.entity.js");
const crypto = require("crypto");
const claveSecretaDelServer = process.env.CLAVE_SECRETA;
const algoritmo = "aes-256-cbc";

//encriptado de contraseña
const encriptar = (clave) => {
    const iv = crypto.randomBytes(16);
    const encriptador = crypto.createCipheriv(
        algoritmo,
        claveSecretaDelServer,
        iv
    );
    let encriptado = encriptador.update(clave, "utf8", "hex");
    encriptado += encriptador.final("hex");
    return { iv, encriptado };
}

// Función para desencriptar la contraseña
const desencriptar = (passEncriptada, iv) => {
    const decipher = crypto.createDecipheriv(
        algoritmo,
        Buffer.from(claveSecretaDelServer),
        Buffer.from(iv, "hex")
    );
    let desencriptado = decipher.update(passEncriptada, "hex", "utf8");
    desencriptado += decipher.final("utf8");
    return desencriptado;
};

const login = (pass, iv, passEncriptada) => {
    const encriptador = crypto.createCipheriv(
        algoritmo,
        claveSecretaDelServer,
        Buffer.from(iv,"hex")
    );

    let encriptado = encriptador.update(pass, "utf8", "hex");
    encriptado += encriptador.final("hex");
    return encriptado === passEncriptada;
}

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

//Obtener un usuario para inicio de sesión rápido
router.get("/inicio-rapido", async(req, res) => {
    try{
        const usuario = await UsuarioSequelize.findOne();
        if(!usuario){
            return res.status(404).json({success:false, message:"No hay usuarios disponibles para inicio rápido"})
        }
        const passwordDesencriptada = desencriptar(usuario.password, usuario.iv);

        res.status(200).json({
            success: true,
            email: usuario.email,
            password: passwordDesencriptada
        });

    }catch(error){
        console.error("Error en inicio rápido", error);
        res.status(500).json({success:false, message: "Error al obtener un usuario para inicio rápido"});
    }
});


// Registrar un usuario
//TODO: agregar un middleware para validar que todos los campos del body tengan contenido
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const { iv, encriptado } = encriptar(password);
    try {
        const usuarioExistente = await UsuarioSequelize.findOne({ where: { email } });

        if (usuarioExistente) {
            return res.status(400).json({ success: false, message: "El usuario ya está registrado" });
        }
        const nuevoUsuario = await UsuarioSequelize.create({ 
            email, 
            password: encriptado,
            iv: iv.toString("hex")
        });

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

        if (!usuario) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }
        const { iv, password:passwordEncriptada } = usuario;

        const esValida = login(password, iv, passwordEncriptada);

        if(!esValida){
            return res.status(401).json({ success: false, message: "Contraseña incorrecta." });
        }

        res.status(200).json({ success: true, message: "Usuario logueado exitosamente!" });
    } catch (error) {
        console.error("Error al loguear el usuario:", error);
        res.status(500).json({ success: false, message: "Error al loguear el usuario" });
    }
});


module.exports = router;
