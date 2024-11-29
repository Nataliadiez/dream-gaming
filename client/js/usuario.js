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
                localStorage.setItem("usuarioLogueado", email);
                await Swal.fire({
                    title: 'Exito!',
                    text: `Usuario logueado correctamente ${email}`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            } else {
                const result = await response.json();
                await Swal.fire({
                    title: 'Error!',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (error) {
            console.error("Error al realizar el login:", error);
            await Swal.fire({
                title: 'Error!',
                text: "Error en el servidor. Inténtelo nuevamente más tarde.",
                icon: 'error',
                confirmButtonText: 'Ok'
            })
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
                await Swal.fire({
                    title: 'correcto!',
                    text: result.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            } else {
                await Swal.fire({
                    title: 'Error!',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (error) {
            console.error("Error al realizar el login:", error);
        }
    }
}

export default Usuario;
