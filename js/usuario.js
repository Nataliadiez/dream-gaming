class Usuario {
    email;
    password;
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static obtenerUsuarios() {
        return JSON.parse(localStorage.getItem("usuarios")) || [];
    }
    static crearUsuarioPredeterminado() {
        let usuarioCreado = false;
        if (this.obtenerUsuarios().length === 0) {
            const usuarioFijo = new Usuario("administrador123@gmail.com", "password123");
            const usuarios = [];
            usuarios.push(usuarioFijo);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            usuarioCreado = true;
        }
        return usuarioCreado;
    }
    static login(email, password) {
        const usuariosRegistrados = this.obtenerUsuarios();
        const usuarioEncontrado = usuariosRegistrados.find(user => user.email === email);

        if (!usuarioEncontrado) {
            return "Usuario no registrado";
        }

        if (usuarioEncontrado.password === password) {
            return "Verificado";
        } else {
            return "Error en los datos";
        }
    }
}

export default Usuario;
