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
                <i class="fa-solid fa-bars" id="toggle-bars"></i>
            </button>
    
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="listNavBar">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./procesadores.html">Procesadores</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./placas.html">Placas de video</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./memorias.html">Memorias RAM</a>
                    </li>
                </ul>
                <button class="btn" type="button" id="loginButton"><a href="./login.html">Login</a></button>
                
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="placas de video" aria-label="Search" />
                    <button class="btn btn-outline-success me-2" type="submit" id="buscarBtn">Buscar</button>
                </form>
            </div>
        </div>
    </nav>
`;

contenedorNav.insertAdjacentHTML('afterbegin', navHTML);

//INSERCIÓN DINÁMICA DE FOOTER
const contenedorFooter = document.querySelector("footer");
const footer = `
    <div class="copyright">
        <p>Copyright © Todos los derechos reservados | Osnat 2024</p>
    </div>

    <div class="social-icons">
        <a href="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://www.facebook.com/?locale=es_LA" target="_blank"><i class="fa-brands fa-square-facebook"></i></a>
        <a href="https://www.tiktok.com/" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
        <a href="https://x.com/home?lang=es" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
    </div>`

    contenedorFooter.insertAdjacentHTML("afterbegin", footer);

    const modalRegistroNombre = `
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
        </div>`

    const contenedorModal = document.getElementById("nameRegisterModal");

    document.addEventListener('DOMContentLoaded', () => {
        const name = localStorage.getItem('userName');
        contenedorModal.insertAdjacentHTML("afterbegin", modalRegistroNombre);
        
        const nameRegisterModal = new bootstrap.Modal(document.getElementById('nameRegisterModal'));
    
        if (!name) {
            nameRegisterModal.show();
        }
    
        document.getElementById('nameForm').addEventListener('submit', (event) => {
            event.preventDefault();
            const userName = document.getElementById('name').value.trim();
    
            if (userName) {
                // Guardamos el nombre en localStorage
                localStorage.setItem('userName', userName);
                // Ocultamos el modal
                nameRegisterModal.hide();
            }
        });
    
        document.querySelectorAll('a.nav-link, #img-productos a').forEach(link => {
            link.addEventListener('click', (event) => {
                if (!localStorage.getItem('userName')) {
                    event.preventDefault();
                    nameRegisterModal.show();
                }
            });
        });
    });
    
