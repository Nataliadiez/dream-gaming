class Usuario {
    email;
    password;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static async obtenerUsuarios() {
        try {
            const response = await fetch('http://localhost:3000/usuarios');
            const usuarios = await response.json();
            return usuarios;
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            return [];
        }
    }

    static async crearUsuarioPredeterminado() {
        let usuarioCreado = false;
        const usuarios = await this.obtenerUsuarios();
        if (usuarios.length === 0) {
            const usuarioFijo = new Usuario("administrador123@gmail.com", "password123");
            try {
                const response = await fetch('http://localhost:3000/usuarios/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(usuarioFijo),
                });
                const data = await response.json();
                if (data.success) {
                    usuarioCreado = true;
                } else {
                    console.error("Error al registrar el usuario predeterminado:", data.message);
                }
            } catch (error) {
                console.error("Error al crear el usuario predeterminado:", error);
            }
        }
        return usuarioCreado;
    }

    static async login(email, password) {
        try {
            const response = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();

            if (result.success) {
                return "Verificado";
            } else {
                return result.message || "Error en los datos";
            }
        } catch (error) {
            console.error("Error al realizar el login:", error);
            return "Error de conexión al servidor";
        }
    }
}

export default Usuario;
