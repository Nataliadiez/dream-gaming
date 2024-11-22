import Usuario from './usuario.js';

const btnAccesoRapido = document.querySelector("#acceso-rapido");
const tituloForm = document.querySelector("#titulo-form");
const btnIngresar = document.querySelector("#btn-ingresar");
const btnLimpiar = document.querySelector("#limpiar");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");

const linkLogin = document.querySelector("#link-loguearse");
const linkRegister = document.querySelector("#link-registrarse");
const seccionLogin = document.querySelector("#section-login");

async function verificarAutenticacion() {
    const email = localStorage.getItem("usuarioLogueado");

    if (email) {
        seccionLogin.style.display = "none";//modificar luego para poder ingresar al panel de admin
    }
}
document.addEventListener("DOMContentLoaded", verificarAutenticacion);

const limpiarCampos = () => {
    emailInput.value = "";
    passwordInput.value = "";
}

const login = async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email !== "" && password !== "") {
        await Usuario.login(email, password);
        limpiarCampos();
    } else {
        alert("Los campos no pueden estar vacíos");
    }
};

const register = async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email !== "" && password !== "") {
        await Usuario.register(email, password);
        limpiarCampos();
    } else {
        alert("Los campos no pueden estar vacíos");
    }
};

const accederRapido = async () => {
    try {
        const usuarios = await Usuario.obtenerUsuarios();

        if (usuarios && usuarios.length > 0) {
            emailInput.value = usuarios[0].email;
            passwordInput.value = usuarios[0].password;
        } else {
            alert("No hay usuarios predeterminados disponibles");
        }
    } catch (error) {
        console.error("Error al obtener usuarios para acceso rápido:", error);
    }
};



btnIngresar.addEventListener("click", () => {
    if (tituloForm.innerHTML === "Formulario de Login") {
        login();
    } else {
        register();
    }
});

btnAccesoRapido.addEventListener("click", accederRapido);
btnLimpiar.addEventListener("click", limpiarCampos);

linkLogin.addEventListener("click", () => {
    tituloForm.innerHTML = "Formulario de Login";
});

linkRegister.addEventListener("click", () => {
    tituloForm.innerHTML = "Formulario de Registro";
});
