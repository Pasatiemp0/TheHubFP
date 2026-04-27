// tienda.js - Logica de la pagina de tienda (index.html)

// Cuantos juegos llevamos mostrando
var juegosMostrados = 0;

// Modo de vista actual ("cards" o "list")
var vistaActual = "cards";

document.addEventListener("DOMContentLoaded", async function () {
    await inicializarComun();

    // Leemos el modo de vista de la configuracion YAML
    vistaActual = configDisplay("view_mode", "cards");

    // Rellenamos el filtro de genero con las categorias del YAML
    rellenarFiltroGenero();

    // Ponemos activo el boton de vista correcto
    actualizarBotonesVista();

    // Mostramos todos los juegos
    mostrarJuegos(datosJuegos);

    // Listener del filtro de genero
    document.getElementById("filtro-genero").addEventListener("change", function () {
        filtrarJuegos(this.value);
    });

    // Listener boton vista tarjetas
    document.getElementById("btn-vista-cards").addEventListener("click", function () {
        vistaActual = "cards";
        actualizarBotonesVista();
        filtrarJuegos(document.getElementById("filtro-genero").value);
    });

    // Listener boton vista lista
    document.getElementById("btn-vista-list").addEventListener("click", function () {
        vistaActual = "list";
        actualizarBotonesVista();
        filtrarJuegos(document.getElementById("filtro-genero").value);
    });
});

// Rellena el select de genero con las categorias del YAML
function rellenarFiltroGenero() {
    var select = document.getElementById("filtro-genero");
    select.innerHTML = "";

    if (configuracion.categories) {
        for (var i = 0; i < configuracion.categories.length; i++) {
            var cat = configuracion.categories[i];
            var opcion = document.createElement("option");
            opcion.value = cat.id;
            opcion.textContent = labelCategoria(cat);
            select.appendChild(opcion);
        }
    }
}

// Actualiza que boton de vista esta activo
function actualizarBotonesVista() {
    var btnCards = document.getElementById("btn-vista-cards");
    var btnList = document.getElementById("btn-vista-list");

    if (vistaActual === "cards") {
        btnCards.className = "btn btn-primary";
        btnList.className = "btn btn-outline-primary";
    } else {
        btnCards.className = "btn btn-outline-primary";
        btnList.className = "btn btn-primary";
    }
}

// Filtra los juegos por genero y los muestra
function filtrarJuegos(genero) {
    if (genero === "all") {
        mostrarJuegos(datosJuegos);
    } else {
        var filtrados = [];
        for (var i = 0; i < datosJuegos.length; i++) {
            if (datosJuegos[i].genre === genero) {
                filtrados.push(datosJuegos[i]);
            }
        }
        mostrarJuegos(filtrados);
    }
}

// Muestra los juegos en el contenedor con paginacion
function mostrarJuegos(juegos) {
    var contenedor = document.getElementById("lista-juegos");
    var porPagina = configDisplay("items_per_page", 6);

    // Reiniciamos la paginacion
    juegosMostrados = 0;

    // Cogemos los primeros juegos
    var juegosPagina = juegos.slice(0, porPagina);
    juegosMostrados = juegosPagina.length;

    // Generamos el HTML segun la vista
    if (vistaActual === "cards") {
        contenedor.innerHTML = '<div class="row g-3">' + generarCardsHTML(juegosPagina) + '</div>';
    } else {
        contenedor.innerHTML = '<ul class="list-group">' + generarListaHTML(juegosPagina) + '</ul>';
    }

    // Boton "Cargar mas" si quedan juegos
    var paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";

    if (juegosMostrados < juegos.length) {
        paginacion.innerHTML = '<button id="btn-cargar-mas" class="btn btn-outline-light">' + t("cargarMas") + '</button>';

        document.getElementById("btn-cargar-mas").addEventListener("click", function () {
            cargarMasJuegos(juegos, porPagina);
        });
    }
}

// Carga mas juegos (redibuja todos hasta el nuevo limite)
function cargarMasJuegos(juegos, porPagina) {
    juegosMostrados += porPagina;
    if (juegosMostrados > juegos.length) {
        juegosMostrados = juegos.length;
    }

    var contenedor = document.getElementById("lista-juegos");
    var juegosPagina = juegos.slice(0, juegosMostrados);

    if (vistaActual === "cards") {
        contenedor.innerHTML = '<div class="row g-3">' + generarCardsHTML(juegosPagina) + '</div>';
    } else {
        contenedor.innerHTML = '<ul class="list-group">' + generarListaHTML(juegosPagina) + '</ul>';
    }

    // Si ya mostramos todos, quitamos el boton
    if (juegosMostrados >= juegos.length) {
        document.getElementById("paginacion").innerHTML = "";
    }
}

// Genera el HTML de las tarjetas
function generarCardsHTML(juegos) {
    var html = "";

    for (var i = 0; i < juegos.length; i++) {
        var juego = juegos[i];
        var oferta = juego.onSale ? '<span class="badge bg-success ms-2">OFERTA</span>' : "";

        html += '<div class="col-md-4 col-lg-3">' +
            '<div class="card bg-secondary text-light h-100">' +
                generarImagenPlaceholder(juego.title) +
                '<div class="card-body d-flex flex-column">' +
                    '<h5 class="card-title">' + juego.title + oferta + '</h5>' +
                    '<p class="card-text text-warning">' + generarEstrellas(juego.rating) + '</p>' +
                    '<p class="card-text"><small>' + juego.genre + '</small></p>' +
                    '<p class="card-text fw-bold mt-auto">$' + juego.price + '</p>' +
                    '<a href="detalle.html?id=' + juego.id + '" class="btn btn-sm btn-outline-light">' + t("verDetalles") + '</a>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    return html;
}

// Genera el HTML de la vista lista
function generarListaHTML(juegos) {
    var html = "";

    for (var i = 0; i < juegos.length; i++) {
        var juego = juegos[i];
        var oferta = juego.onSale ? '<span class="badge bg-success ms-2">OFERTA</span>' : "";

        html += '<li class="list-group-item bg-secondary text-light d-flex align-items-center">' +
            '<div class="flex-grow-1">' +
                '<h6 class="mb-1">' + juego.title + oferta + '</h6>' +
                '<small>' + juego.genre + ' · <span class="text-warning">' + generarEstrellas(juego.rating) + '</span></small>' +
            '</div>' +
            '<span class="fw-bold me-3">$' + juego.price + '</span>' +
            '<a href="detalle.html?id=' + juego.id + '" class="btn btn-sm btn-outline-light">' + t("verDetalles") + '</a>' +
        '</li>';
    }

    return html;
}
