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

    static async login(email, password) {
        try {
            const response = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
    
                // Guarda el email del usuario como identificador
                localStorage.setItem("usuarioLogueado", email);
            } else {
                const result = await response.json();
                alert(result.message);
            }
        } catch (error) {
            console.error("Error al realizar el login:", error);
            alert("Error en el servidor. Inténtelo nuevamente más tarde.");
        }
    }

    
    static async register(email, password) {
        try {
            const response = await fetch('http://localhost:3000/usuarios/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();

            if (result.success) {
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error al realizar el login:", error);
        }
    }
}

export default Usuario;
