const validarUsuario = (req, res, next) => {
    const { email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "El email es obligatorio y debe ser válido." });
    }

    if (!password || password.trim() === "") {
        return res.status(400).json({ message: "La contraseña es obligatoria." });
    }

    next();
}

module.exports = validarUsuario;