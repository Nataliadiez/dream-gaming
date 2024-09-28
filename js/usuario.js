class Usuario {
    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password; // Cambié de "clave" a "password"
    }

    static registrarUsuario(nombre, email, password) {
        const user = new Usuario(nombre, email, password);
        let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        listaUsuarios.push(user);
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
        alert("Usuario registrado exitosamente!");
    }

    static obtenerUsuarios() {
        return JSON.parse(localStorage.getItem("usuarios")) || [];
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
