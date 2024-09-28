const contenedorNav = document.getElementById("header-container");
const navHTML = `
          <nav class="navbar navbar-expand-lg" id="navBar">
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
                <span class="navbar-toggler-icon"></span>
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



