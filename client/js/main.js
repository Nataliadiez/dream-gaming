const contenedorNav = document.getElementById("header-container");
const navHTML = `
    <nav class="navbar navbar-expand-xl" id="navBar">
        <div class="container-fluid">
            <a class="navbar-brand" href="./index.html"><img id="img-logo" src="./img/Blue Illustration Game Presentation-Photoroom.png" alt=""></a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                id="togglerBar">
                <i class="bi bi-list" id="toggle-bars"></i>
            </button>
    
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="listNavBar">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="productos.html">Procesadores</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="productos.html">Placas de video</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="productos.html">Memorias RAM</a>
                    </li>
                </ul>

                <input id="prueba" type="checkbox" style="display: none">
                <button id="btn-modo" class="btn"><i class="bi bi-brightness-high"></i></button>
                <a href="./login.html" class="btn" type="button" id="loginButton">Login</a>
                <a id="link-carrito" href="carrito.html"><i class="bi bi-cart2"></i></a>

                <!--barra de busqueda comentada por el momento-->
                <!-- <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="placas de video" aria-label="Search" />
                    <button class="btn btn-outline-success me-2" type="submit" id="buscarBtn">Buscar</button>
                </form>-->
            </div>
        </div>
    </nav>
`;

//verificar estado null en la siguientes paginas
const contenedorBtnSection = document.querySelector("#img-productos");

const btnSectionsDark = `
    <a href="./productos.html?categoria=memorias"><img class="btn-sections" src="./img/Memorias ram.png" alt=""></a>
    <a href="./productos.html?categoria=placas"><img class="btn-sections" src="./img/PLACAS.png" alt=""></a>
    <a href="./productos.html?categoria=procesadores"><img class="btn-sections" src="./img/PROCESADORES.png" alt=""></a>`;

const btnSectionsLight = `
    <a href="./productos.html?categoria=memorias"><img class="btn-sections" src="img/MEMORIAS-CLARO.png" alt=""></a>
    <a href="./productos.html?categoria=placas"><img class="btn-sections" src="img/PLACAS-CLARO.png" alt=""></a>
    <a href="./productos.html?categoria=procesadores"><img class="btn-sections" src="img/PROCESADORES-CLARO.png" alt=""></a>`;



const linksCDN = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
    />
    <link rel="icon" type="image/png" href="./img/favicon.png">
    <link rel="stylesheet" href="./style/style.css"/>
    <link id="linkthemeStyle" rel="stylesheet" href="./style/modoOscuro.css"/> 
    `

const contenedorFooter = document.querySelector("footer");
const footer = `
    <div class="copyright">
        <p>Copyright © Todos los derechos reservados | Osnat 2024</p>
    </div>

    <div class="social-icons">
        <a href="https://www.instagram.com/" target="_blank"><i class="bi bi-instagram"></i></a>
        <a href="https://www.facebook.com/?locale=es_LA" target="_blank"><i class="bi bi-facebook"></i></a>
        <a href="https://www.tiktok.com/" target="_blank"><i class="bi bi-tiktok"></i></a>
        <a href="https://x.com/home?lang=es" target="_blank"><i class="bi bi-twitter-x"></i></a>
    </div>`

// INSERCIÓN DINÁMICA DE TODOS LOS COMPONENTES
contenedorNav.insertAdjacentHTML('afterbegin', navHTML);
document.head.insertAdjacentHTML("afterbegin", linksCDN);
contenedorFooter.insertAdjacentHTML("afterbegin", footer);

const modalRegistroNombre = `
    <div class="modal fade" id="nameRegisterModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">¡Bienvenido!</h1>
                </div>
                <div class="modal-body">
                    <p>Ingrese su nombre para ver nuestros productos 💻</p>
                    <form id="nameForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="name" required>
                            <div id="textHelp" class="form-text">Este campo no puede estar vacío</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>`

const preguntarNombre = () => {
    document.body.insertAdjacentHTML("afterbegin", modalRegistroNombre);

    const name = localStorage.getItem('nombreUsuario');
    const modal = new bootstrap.Modal(document.querySelector("#nameRegisterModal"));

    if (!name) {
        modal.show();
    }
    const formNombre = document.querySelector("#nameForm");
    formNombre.addEventListener("submit", () => {
        const userName = document.querySelector("#name").value;
    
        if (userName) {
            localStorage.setItem('nombreUsuario', userName);
            modal.hide();
        }
    });
    
    document.querySelectorAll('a.nav-link, #img-productos a, #link-carrito, #loginButton').forEach(link => {
        link.addEventListener('click', (event) => {
            if (!name) {
                event.preventDefault();
                modal.show();
            }
        });
    });

    if(contenedorBtnSection){
        contenedorBtnSection.insertAdjacentHTML("beforeend", btnSectionsDark)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preguntarNombre();
});


const contenedorImgLogo = document.querySelector("#img-logo");

function actualizarEstadoTema(){


    //CAMBIO EN BOTONES
    if(contenedorBtnSection)
    {
        contenedorBtnSection.innerHTML = '';
    }

    //CAMBIO EN FONDO
    let linkEstiloTema = document.querySelector("#linkthemeStyle");

    if(!miprueba.checked){
        miprueba.checked = true;
        if(contenedorBtnSection)
        {
            contenedorBtnSection.insertAdjacentHTML('beforeend', btnSectionsLight);
        }
        linkEstiloTema.setAttribute("href", "style/modoClaro.css");
        contenedorImgLogo.setAttribute("src", "img/Blue_Illustration_Game_Presentation_1.png")

    }
    else{
        miprueba.checked = false;
        if(contenedorBtnSection)
        {
            contenedorBtnSection.insertAdjacentHTML('beforeend', btnSectionsDark);
        }

        linkEstiloTema.setAttribute("href", "style/modoOscuro.css")
        contenedorImgLogo.setAttribute("src", "img/Blue Illustration Game Presentation-Photoroom.png")
    }
}

const miprueba = document.querySelector("#prueba");
const btnCambioTema = document.querySelector("#btn-modo");
const contenedorCards = document.querySelector("#cards-container");

btnCambioTema.addEventListener('click', actualizarEstadoTema);

