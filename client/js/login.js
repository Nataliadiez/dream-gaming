import Usuario from './usuario.js';

const btnAccesoRapido = document.querySelector("#acceso-rapido");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const tituloForm = document.querySelector("#titulo-form");
const btnLogin = document.querySelector("#btn-login");
const btnRegister = document.querySelector("#btn-login");


const validacionInputs = () => {
    const validos = false;
    if (email.value !== "" && password.value !== "") {
        validos = true;
    }
    return validos;
};

const login = async (email, password) => {
    tituloForm.innerHTML = "";
    tituloForm.innerHTML = "Formulario de Login";
    if(validacionInputs()){
        const resultado = await Usuario.login(email, password);
        if (resultado === "Verificado") {
            alert("Bienvenido, " + email);
        } else {
            alert(resultado);
        }
    }
};

const register = async(email, password) => {
    tituloForm.innerHTML = "";
    tituloForm.innerHTML = "Formulario de Registro";
    if(validacionInputs()){
        console.log("Registro")
        if (resultado === "Registrado") {
            alert("Bienvenido, " + email);
        } else {
            alert(resultado);
        }
    }


}

const accederRapido = async () => {
    const usuarioCreado = await Usuario.crearUsuarioPredeterminado();
    if (usuarioCreado) {
        const usuarioPredeterminado = await Usuario.obtenerUsuarios();
        email.value = usuarioPredeterminado[0].email;
        password.value = usuarioPredeterminado[0].password;
        login(email.value, password.value);
    }
}

btnLogin.addEventListener("click", login);
btnAccesoRapido.addEventListener("click", accederRapido);
btnRegister.addEventListener("click", register);
