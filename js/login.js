import Usuario from './usuario.js';

let tituloFormulario = document.getElementById("titulo-form");
let lblNombre = document.getElementById("lbl-nombre");
let inputNombre = document.getElementById("nombre");

const login = () => {
    tituloFormulario.innerHTML = "Formulario de logueo";
    lblNombre.style.display = "none";
    inputNombre .style.display = "none";
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email !== "" && password !== "") {
        logueo(email, password);
    } else {
        alert("Los campos no pueden estar vacíos");
    }
};

const register = () => {
    tituloFormulario.innerHTML = "Formulario de registro";
    lblNombre.style.display = "block";
    inputNombre .style.display = "block";
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (nombre !== "" && email !== "" && password !== "") {
        Usuario.registrarUsuario(nombre, email, password);
    } else {
        alert("Los campos no pueden estar vacíos");
    }
};

const logueo = (email, password) => {
    const resultado = Usuario.login(email, password);

    if (resultado === "Verificado") {
        alert("Bienvenido, " + email);
    } else {
        alert(resultado);
    }
};




document.getElementById("login").addEventListener("click", login);
document.getElementById("register").addEventListener("click", register);
