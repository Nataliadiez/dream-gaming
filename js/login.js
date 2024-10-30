import Usuario from './usuario.js';

const btnAccesoRapido = document.querySelector("#acceso-rapido");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const validacionInputs = () => {
    if (email.value !== "" && password.value !== "") {
        login(email.value, password.value);
    } else {
        alert("Los campos no pueden estar vacíos");
    }
};

const login = (email, password) => {
    const resultado = Usuario.login(email, password);
    if (resultado === "Verificado") {
        alert("Bienvenido, " + email);
    } else {
        alert(resultado);
    }
};

const accederRapido = () => {
    Usuario.crearUsuarioPredeterminado();
    const usuarioPredeterminado = Usuario.obtenerUsuarios()[0];
    email.value = usuarioPredeterminado.email;
    password.value = usuarioPredeterminado.password;
    login(email.value, password.value);
}

document.getElementById("login").addEventListener("click", validacionInputs);
btnAccesoRapido.addEventListener("click", accederRapido)
