
document.getElementById("header-container").innerHTML= `
    <nav class="navbar navbar-expand-lg" id="navBar">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img id="img-logo" src="./img/Blue Illustration Game Presentation-Photoroom.png" alt=""></a>
            <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            id="togglerBar"
            >
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
                        <a class="nav-link" href="./procesadores.html">Placas de video</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./memorias.html">Memorias RAM</a>
                    </li>
                </ul>

                <form class="d-flex" role="search">
                    <input
                    class="form-control me-2"
                    type="search"
                    placeholder="placas de video"
                    aria-label="Search"
                    />
                    <button class="btn btn-outline-success" type="submit">
                    Buscar
                    </button>
                </form>
            </div>
        </div>
    </nav>
`