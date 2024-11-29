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
    seccionProductos: document.querySelector("#section-productos"),
    btnDescargarVentas: document.querySelector("#btn-descargar-ventas"),
};

const verificarAutenticacion = async() => {
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
            
            await location.reload();
            
        } else {
            await Swal.fire({
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
            await Swal.fire({
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
                        <textarea id="descripcion-producto" required></textarea>

                        <label for="categoria">Categoría</label>
                        <select id="categoria-producto" required>
                            <option value="procesadores">Procesadores</option>
                            <option value="placas">Placas de Video</option>
                            <option value="memorias">Memorias RAM</option>
                        </select>

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
                    <button class="btn btn-primary" id="btn-placas">placas</button>
                    <button class="btn btn-primary" id="btn-memorias">memorias</button>
                    <button class="btn btn-primary" id="btn-procesadores">procesadores</button>
                    <div id="productos-container"></div>
                </div>`
        this.setupAdminEventListeners();
    },

    setupAdminEventListeners() {
        const formProducto = document.querySelector("#form-producto");
        const btnCerrarSesion = document.querySelector("#btn-cerrar-sesion");
        const btnLimpiarForm = document.querySelector("#btn-limpiar-form");
        const btnDescargarVentas = document.querySelector("#btn-descargar-ventas");
        const btnMemorias = document.querySelector("#btn-memorias");
        const btnPlacas = document.querySelector("#btn-placas");
        const btnProcesadores = document.querySelector("#btn-procesadores");
        
        btnDescargarVentas.addEventListener("click", async () => {
            try {
                const respuesta = await fetch("http://localhost:3000/ventas");
        
                if (!respuesta.ok) {
                    throw new Error('Error al obtener las ventas');
                }
        
                const data = await respuesta.json();
                console.log(data);
        
                const ventas = data.map((venta) => ({
                    Cliente: venta["Cliente.nombre"],
                    Producto: venta["Producto.titulo"],
                    Precio: venta["Producto.precio"],
                    Cantidad: venta.cantidad,
                    FechaVenta: venta.fecha_venta
                }));
        
                if (ventas.length === 0) {
                    throw new Error('No hay datos de ventas para agregar a la hoja');
                }
        
                const hojaCalculo = XLSX.utils.json_to_sheet(ventas);
        
                const libroTrabajo = XLSX.utils.book_new();
        
                XLSX.utils.book_append_sheet(libroTrabajo, hojaCalculo, "Ventas");
        
                XLSX.writeFile(libroTrabajo, "ventas.xlsx");
        
            } catch (error) {
                console.error('Hubo un error en la solicitud:', error);
            }
        });
        
        btnMemorias.addEventListener("click", ()=>{
            this.cargarProductos("memorias");
        })
        btnProcesadores.addEventListener("click", ()=>{
            this.cargarProductos("procesadores");
        })
        btnPlacas.addEventListener("click", ()=>{
            this.cargarProductos("placas");
        })

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
                await Swal.fire({
                    title: 'Error al guardar el producto',
                    text: await error.error,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                throw new Error(error.error || 'Error al guardar el producto');
                
            }
            const data = await response.json();
            await Swal.fire({
                title: 'Correcto!',
                text: await data.mensaje,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async traerProductos() {
        try {
            const response = await fetch('http://localhost:3000/productos');
            const productos = await response.json();
            return productos;
        } catch (error) {
            console.error("Error al traerproductos:", error);
        }
    },
    async cargarProductos(categoria) {
        try {
            const productos = await this.traerProductos();
            const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
            
            const productosContainer = document.querySelector("#productos-container");
            if (productosContainer) {
                productosContainer.innerHTML = productosFiltrados.map(producto => `
                    <div class="producto-card">
                        <div class="producto-imagen">
                            <img src="/server/uploads/${producto.imagen}" alt="${producto.titulo}">
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
                                <button onclick="admin.reactivarProducto(${producto.id_producto})" class="btn-form-login">
                                    Reactivar
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
            

            if (idInput) idInput.value = producto.id_producto;
            if (tituloInput) tituloInput.value = producto.titulo;
            if (precioInput) precioInput.value = producto.precio;
            if (descripcionInput) descripcionInput.value = producto.descripcion || '';
            if (categoriaInput) categoriaInput.value = producto.categoria;

            const imagenActual = document.querySelector("#imagen-actual");
            if (imagenActual) {
                imagenActual.src = `/server/uploads/${producto.imagen}` || "";
                imagenActual.alt = `Imagen de ${producto.titulo}`;
            }
        } catch (error) {
            console.error("Error al cargar el producto:", error);
        }
    },

    async eliminarProducto(id) {
        const resultado = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        });
    
        if (resultado.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`, {
                    method: 'DELETE'
                });
    
                if (response.ok) {
                    await this.cargarProductos();
                    await Swal.fire({
                        title: '¡Eliminado!',
                        text: 'Producto eliminado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    throw new Error('Respuesta no OK');
                }
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                await Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el producto.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        } else {
            // Opción de cancelar, no se hace nada.
            console.log('El usuario canceló la eliminación.');
        }
    },
    async reactivarProducto(id) {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`, {
                    method: 'PATCH'
                });
    
                if (response.ok) {
                    await this.cargarProductos();
                    await Swal.fire({
                        title: 'Reactivado!',
                        text: 'Producto activo',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    throw new Error('Respuesta no OK');
                }
            } catch (error) {
                console.error("Error al reactivar el producto:", error);
                await Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al reactivar el producto.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
    },
    
    
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
        const response = await fetch("http://localhost:3000/usuarios/inicio-rapido");
        const data = await response.json();

        if (data.success) {
            selectors.emailInput.value = data.email;
            selectors.passwordInput.value = data.password;
        } else {
            await Swal.fire({
                title: 'Error en acceso rápido',
                text: await data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    } catch (error) {
        console.error("Error en acceso rápido:", error);
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
