import Usuario from './usuario.js';

const selectors = {
    btnAccesoRapido: document.querySelector("#acceso-rapido"),
    tituloForm: document.querySelector("#titulo-form"),
    btnIngresar: document.querySelector("#btn-ingresar"),
    btnLimpiar: document.querySelector("#limpiar"),
    emailInput: document.querySelector("#email"),
    passwordInput: document.querySelector("#password"),
    linkLogin: document.querySelector("#link-loguearse"),
    linkRegister: document.querySelector("#link-registrarse"),
    seccionLogin: document.querySelector("#section-login"),
    seccionProductos: document.querySelector("#section-productos")
};


async function verificarAutenticacion() {
    const email = localStorage.getItem("usuarioLogueado");

    if (email) {
        admin.mostrarPanelAdmin()
    }
}
document.addEventListener("DOMContentLoaded", verificarAutenticacion);

// Funciones de autenticación
const auth = {
    async verificarAutenticacion() {
        const email = localStorage.getItem("usuarioLogueado");
        if (email) {
            admin.mostrarPanelAdmin();
        }
    },

    async login() {
        const email = selectors.emailInput.value.trim();
        const password = selectors.passwordInput.value.trim();

        if (email && password) {
            await Usuario.login(email, password);
            this.limpiarCampos();
            location.reload();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Los campos no pueden estar vacíos',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    },

    async register() {
        const email = selectors.emailInput.value.trim();
        const password = selectors.passwordInput.value.trim();

        if (email && password) {
            await Usuario.register(email, password);
            this.limpiarCampos();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Los campos no pueden estar vacíos',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    },

    limpiarCampos() {
        selectors.emailInput.value = "";
        selectors.passwordInput.value = "";
    },

    cerrarSesion() {
        localStorage.removeItem("usuarioLogueado");
        location.reload();
    }
};

// Funciones del panel de administración
const admin = {
    mostrarPanelAdmin() {
        selectors.seccionLogin.innerHTML = `
            <h2>Panel de Administración</h2>
                <div class="admin-form">
                    <h4>Agregar/Editar Producto</h4>
                    <form id="form-producto" class="div-flex" >
                        <input type="hidden" id="id-producto">

                        <label for="titulo">Título del Producto</label>
                        <input id="titulo-producto" type="text" required>

                        <label for="precio">Precio</label>
                        <input id="precio-producto" type="number" step="0.01" required>

                        <label for="imagen">Imagen Actual</label>
                        <div id="imagen-actual-container">
                            <img id="imagen-actual" src="" alt="Imagen actual del producto" style="max-width: 100px;">
                        </div>

                        <label for="imagen">Nueva Imagen (opcional)</label>
                        <input id="imagen-producto" type="file" name="foto" accept="image/*">
                        
                        <label for="descripcion">Descripción</label>
                        <textarea id="descripcion-producto"></textarea>

                        <label for="categoria">Categoría</label>
                        <select id="categoria-producto" required>
                            <option value="procesadores">Procesadores</option>
                            <option value="placas">Placas de Video</option>
                            <option value="memorias">Memorias RAM</option>
                        </select>

                        <div class="form-check">
                            <input type="checkbox" id="disponible-producto" checked>
                            <label for="disponible">Disponible</label>
                        </div>

                        <div class="admin-buttons">
                            <button type="submit" class="btn-form-login" id="btn-guardar-producto">
                                Guardar Producto
                            </button>
                            <button type="button" class="btn-form-login" id="btn-limpiar-form">
                                Limpiar
                            </button>
                        </div>
                    </form>
                </div>
                <div class="div-flex-row">
                    <button class="btn-form-login" id="btn-cerrar-sesion">
                        Cerrar Sesión
                    </button>

                    <button class="btn-form-login" id="btn-descargar-ventas">
                        Descargar ventas
                    </button>
                </div>
                
        `;
        selectors.seccionProductos.innerHTML = `
                <div class="productos-list">
                    <h3>Listado de Productos</h3>
                    <div id="productos-container"></div>
                </div>`
        this.setupAdminEventListeners();
    },

    setupAdminEventListeners() {
        const formProducto = document.querySelector("#form-producto");
        const btnCerrarSesion = document.querySelector("#btn-cerrar-sesion");
        const btnLimpiarForm = document.querySelector("#btn-limpiar-form");

        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener("click", () => auth.cerrarSesion());
        }

        if (formProducto) {
            formProducto.addEventListener("submit", async (e) => {
                e.preventDefault();
                const producto = this.obtenerDatosProducto();
                await this.guardarProducto(producto);
                await this.cargarProductos();
                formProducto.reset();
            });
        }

        if (btnLimpiarForm) {
            btnLimpiarForm.addEventListener("click", () => formProducto.reset());
        }

        this.cargarProductos();
    },

    obtenerDatosProducto() {
        const imagenInput = document.querySelector("#imagen-producto");
        return {
            titulo: document.querySelector("#titulo-producto").value,
            precio: parseFloat(document.querySelector("#precio-producto").value),
            imagen: imagenInput.files[0],
            descripcion: document.querySelector("#descripcion-producto").value,
            categoria: document.querySelector("#categoria-producto").value,
            disponible: document.querySelector("#disponible-producto").checked ? 1 : 0
        };
    },

    async guardarProducto(producto) {
        const id = document.querySelector("#id-producto").value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:3000/productos/${id}` : 'http://localhost:3000/productos';
    
        const formData = new FormData();
        formData.append('titulo', producto.titulo);
        formData.append('precio', producto.precio);
        formData.append('descripcion', producto.descripcion);
        formData.append('categoria', producto.categoria);
        formData.append('disponible', producto.disponible);
        
        if (producto.imagen instanceof File) {
            formData.append('imagen', producto.imagen);
        }
    
        try {
            const response = await fetch(url, {
                method: method,
                body: formData
            });
    
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error al guardar el producto');
            }
            const data = await response.json();
            Swal.fire({
                title: 'Correcto!',
                text: data.mensaje,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    

    async cargarProductos() {
        try {
            const response = await fetch('http://localhost:3000/productos');
            const productos = await response.json();
            
            const productosContainer = document.querySelector("#productos-container");
            if (productosContainer) {
                productosContainer.innerHTML = productos.map(producto => `
                    <div class="producto-card">
                        <div class="producto-imagen">
                            <img src="${producto.imagen}" alt="${producto.titulo}">
                        </div>
                        <div class="producto-info">
                            <h4>${producto.titulo}</h4>
                            <p class="precio">Precio: $${producto.precio.toLocaleString('es-AR')}</p>
                            <p class="categoria">Categoría: ${producto.categoria}</p>
                            <p class="descripcion">${producto.descripcion || ''}</p>
                            <p class="disponibilidad">
                                Estado: <span class="${producto.disponible ? 'disponible' : 'no-disponible'}">
                                    ${producto.disponible ? 'Disponible' : 'No disponible'}
                                </span>
                            </p>
                            <div class="producto-buttons">
                                <button onclick="admin.editarProducto(${producto.id_producto})" class="btn-form-login">
                                    Editar
                                </button>
                                <button onclick="admin.eliminarProducto(${producto.id_producto})" class="btn-form-login">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    },

    async editarProducto(id) {
        try {
            const response = await fetch(`http://localhost:3000/productos/${id}`);
            const producto = await response.json();

            const idInput = document.querySelector("#id-producto") || "";
            const tituloInput = document.querySelector("#titulo-producto") || "";
            const precioInput = document.querySelector("#precio-producto") || 0;
            const descripcionInput = document.querySelector("#descripcion-producto") || "";
            const categoriaInput = document.querySelector("#categoria-producto") || "procesadores";
            const disponibleInput = document.querySelector("#disponible-producto");
            

            if (idInput) idInput.value = producto.id_producto;
            if (tituloInput) tituloInput.value = producto.titulo;
            if (precioInput) precioInput.value = producto.precio;
            //TODO: modificar para subir la imagen
            if (descripcionInput) descripcionInput.value = producto.descripcion || '';
            if (categoriaInput) categoriaInput.value = producto.categoria;
            if (disponibleInput) disponibleInput.checked = 1;

            const imagenActual = document.querySelector("#imagen-actual");
            if (imagenActual) {
                imagenActual.src = producto.imagen || "";
                imagenActual.alt = `Imagen de ${producto.titulo}`;
            }
        } catch (error) {
            console.error("Error al cargar el producto:", error);
        }
    },

    async eliminarProducto(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    await this.cargarProductos();
                    alert('Producto eliminado exitosamente');
                }
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert('Error al eliminar el producto');
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", () => auth.verificarAutenticacion());

selectors.btnIngresar.addEventListener("click", () => {
    if (selectors.tituloForm.innerHTML === "Formulario de Login") {
        auth.login();
    } else {
        auth.register();
    }
});

selectors.btnAccesoRapido.addEventListener("click", async () => {
    try {
        const usuarios = await Usuario.obtenerUsuarios();
        if (usuarios && usuarios.length > 0) {
            selectors.emailInput.value = usuarios[0].email;
            selectors.passwordInput.value = usuarios[0].password;
        } else {
            alert("No hay usuarios predeterminados disponibles");
        }
    } catch (error) {
        console.error("Error al obtener usuarios para acceso rápido:", error);
    }
});

selectors.btnLimpiar.addEventListener("click", () => auth.limpiarCampos());

selectors.linkLogin.addEventListener("click", () => {
    selectors.tituloForm.innerHTML = "Formulario de Login";
});

selectors.linkRegister.addEventListener("click", () => {
    selectors.tituloForm.innerHTML = "Formulario de Registro";
});

window.admin = admin;


