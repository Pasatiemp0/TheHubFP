// tienda.js - Lógica específica de la página de tienda (index.html)

// Variable para controlar la paginación (cuántos juegos se muestran actualmente)
let juegosMostrados = 0;

// Variable para guardar el modo de vista actual ("cards" o "list")
let vistaActual = "cards";

// ===================== INICIALIZACIÓN =====================

/**
 * Se ejecuta cuando el DOM está listo.
 * Inicializa los datos comunes, traduce textos, rellena filtros y muestra los juegos.
 */
document.addEventListener("DOMContentLoaded", async function () {
    // 1. Inicializamos todo lo compartido (datos, tema, idioma, navbar)
    await inicializarComun();

    // 2. Leemos el modo de vista desde la configuración YAML
    vistaActual = configDisplay("view_mode", "cards");

    // 3. Traducimos los textos estáticos de la página
    traducirTextosTienda();

    // 4. Rellenamos el select de filtro con las categorías del YAML
    rellenarFiltroGenero();

    // 5. Actualizamos los estilos de los botones de vista según vistaActual
    actualizarBotonesVista();

    // 6. Mostramos todos los juegos
    mostrarJuegos(datosJuegos);

    // 7. Configuramos los listeners de los controles
    configurarListeners();
});

// ===================== TRADUCCIÓN DE TEXTOS =====================

/**
 * Traduce los textos estáticos de la página (banner, botones).
 */
function traducirTextosTienda() {
    // Banner de bienvenida
    document.getElementById("banner-titulo").textContent = t("bienvenida");
    document.getElementById("banner-subtitulo").textContent = t("subtituloBanner");

    // Botones de vista
    document.getElementById("btn-vista-cards").textContent = t("vistaCards");
    document.getElementById("btn-vista-list").textContent = t("vistaLista");
}

// ===================== FILTRO DE GÉNERO =====================

/**
 * Rellena el select de filtro con las categorías definidas en config.yaml.
 * Usa labelCategoria() para mostrar el texto en el idioma actual.
 */
function rellenarFiltroGenero() {
    const select = document.getElementById("filtro-genero");

    // Limpiamos las opciones actuales
    select.innerHTML = "";

    // Añadimos las categorías del YAML
    if (configuracion.categories) {
        configuracion.categories.forEach(function (categoria) {
            const opcion = document.createElement("option");
            opcion.value = categoria.id;
            opcion.textContent = labelCategoria(categoria);
            select.appendChild(opcion);
        });
    }
}

// ===================== BOTONES DE VISTA =====================

/**
 * Actualiza las clases CSS de los botones de vista según el modo actual.
 */
function actualizarBotonesVista() {
    const btnCards = document.getElementById("btn-vista-cards");
    const btnList = document.getElementById("btn-vista-list");

    if (vistaActual === "cards") {
        btnCards.className = "btn btn-primary";
        btnList.className = "btn btn-outline-primary";
    } else {
        btnCards.className = "btn btn-outline-primary";
        btnList.className = "btn btn-primary";
    }
}

// ===================== LISTENERS =====================

/**
 * Configura los listeners del filtro de género y los botones de vista.
 */
function configurarListeners() {
    // Listener del select de género
    document.getElementById("filtro-genero").addEventListener("change", function () {
        filtrarJuegos(this.value);
    });

    // Listener del botón vista tarjetas
    document.getElementById("btn-vista-cards").addEventListener("click", function () {
        vistaActual = "cards";
        actualizarBotonesVista();
        filtrarJuegos(document.getElementById("filtro-genero").value);
    });

    // Listener del botón vista lista
    document.getElementById("btn-vista-list").addEventListener("click", function () {
        vistaActual = "list";
        actualizarBotonesVista();
        filtrarJuegos(document.getElementById("filtro-genero").value);
    });
}

// ===================== FILTRAR JUEGOS =====================

/**
 * Filtra los juegos por género y los muestra.
 * Si el género es "all", muestra todos los juegos.
 */
function filtrarJuegos(genero) {
    if (genero === "all") {
        mostrarJuegos(datosJuegos);
    } else {
        mostrarJuegos(datosJuegos.filter(function (juego) {
            return juego.genre === genero;
        }));
    }
}

// ===================== MOSTRAR JUEGOS =====================

/**
 * Muestra los juegos en el contenedor #lista-juegos.
 * Respeta items_per_page de la configuración y el modo de vista actual.
 */
function mostrarJuegos(juegos) {
    const contenedor = document.getElementById("lista-juegos");
    const porPagina = configDisplay("items_per_page", 6);
    const mostrarImagenes = configDisplay("show_images", true);

    // Reiniciamos paginación
    juegosMostrados = 0;

    // Cortamos el array según items_per_page
    const juegosPagina = juegos.slice(0, porPagina);
    juegosMostrados = juegosPagina.length;

    // Generamos el HTML según el modo de vista
    if (vistaActual === "cards") {
        contenedor.innerHTML = '<div class="row g-3">' + generarCardsHTML(juegosPagina, mostrarImagenes) + '</div>';
    } else {
        contenedor.innerHTML = '<ul class="list-group">' + generarListaHTML(juegosPagina, mostrarImagenes) + '</ul>';
    }

    // Botón "Cargar más" si hay más juegos por mostrar
    const contenedorPaginacion = document.getElementById("paginacion");
    contenedorPaginacion.innerHTML = "";

    if (juegosMostrados < juegos.length) {
        contenedorPaginacion.innerHTML = '<button id="btn-cargar-mas" class="btn btn-outline-light">' + t("cargarMas") + '</button>';

        document.getElementById("btn-cargar-mas").addEventListener("click", function () {
            cargarMasJuegos(juegos, porPagina, mostrarImagenes);
        });
    }
}

// ===================== CARGAR MÁS JUEGOS =====================

/**
 * Añade más juegos al contenedor existente sin borrar los anteriores.
 */
function cargarMasJuegos(juegos, porPagina, mostrarImagenes) {
    const contenedor = document.getElementById("lista-juegos");

    // Obtenemos los siguientes juegos
    const siguientesJuegos = juegos.slice(juegosMostrados, juegosMostrados + porPagina);
    juegosMostrados += siguientesJuegos.length;

    // Añadimos al contenedor existente
    if (vistaActual === "cards") {
        const row = contenedor.querySelector(".row");
        if (row) {
            row.innerHTML += generarCardsHTML(siguientesJuegos, mostrarImagenes);
        }
    } else {
        const lista = contenedor.querySelector(".list-group");
        if (lista) {
            lista.innerHTML += generarListaHTML(siguientesJuegos, mostrarImagenes);
        }
    }

    // Ocultamos el botón si ya no quedan más juegos
    if (juegosMostrados >= juegos.length) {
        document.getElementById("paginacion").innerHTML = "";
    }
}

// ===================== GENERAR HTML DE TARJETAS =====================

/**
 * Genera el HTML de tarjetas Bootstrap para un array de juegos.
 * Cada tarjeta tiene un botón "Ver detalles" que abre un modal.
 */
function generarCardsHTML(juegos, mostrarImagenes) {
    let html = "";

    juegos.forEach(function (juego) {
        const estrellas = generarEstrellas(juego.rating);
        const imagenHTML = mostrarImagenes ? generarImagenPlaceholder(juego.title, juego.genre, "normal") : "";
        const badgeOferta = juego.onSale ? '<span class="badge bg-success ms-2">' + t("oferta") + '</span>' : "";

        html += `
            <div class="col-md-4 col-lg-3">
                <div class="card bg-secondary text-light h-100">
                    ${imagenHTML}
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${juego.title}${badgeOferta}</h5>
                        <p class="card-text text-warning">${estrellas}</p>
                        <p class="card-text"><small>${juego.genre}</small></p>
                        <p class="card-text fw-bold mt-auto">$${juego.price}</p>
                        <button class="btn btn-sm btn-outline-light" onclick="mostrarDetalle(${juego.id})">
                            ${t("verDetalles")}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    return html;
}

// ===================== GENERAR HTML DE LISTA =====================

/**
 * Genera el HTML de elementos de lista Bootstrap para un array de juegos.
 */
function generarListaHTML(juegos, mostrarImagenes) {
    let html = "";

    juegos.forEach(function (juego) {
        const estrellas = generarEstrellas(juego.rating);
        const imagenHTML = mostrarImagenes
            ? '<div class="me-3">' + generarImagenPlaceholder(juego.title, juego.genre, "mini") + '</div>'
            : "";
        const badgeOferta = juego.onSale ? '<span class="badge bg-success ms-2">' + t("oferta") + '</span>' : "";

        html += `
            <li class="list-group-item bg-secondary text-light d-flex align-items-center">
                ${imagenHTML}
                <div class="flex-grow-1">
                    <h6 class="mb-1">${juego.title}${badgeOferta}</h6>
                    <small>${juego.genre} · <span class="text-warning">${estrellas}</span></small>
                </div>
                <span class="fw-bold me-3">$${juego.price}</span>
                <button class="btn btn-sm btn-outline-light" onclick="mostrarDetalle(${juego.id})">
                    ${t("verDetalles")}
                </button>
            </li>
        `;
    });

    return html;
}

// ===================== DETALLE DEL JUEGO (MODAL) =====================

/**
 * Muestra el detalle de un juego en un modal de Bootstrap 5.
 * Busca el juego por id en datosJuegos y construye el contenido del modal.
 */
function mostrarDetalle(id) {
    // Buscamos el juego por su id
    const juego = datosJuegos.find(function (j) {
        return j.id === id;
    });

    // Si no lo encontramos, no hacemos nada
    if (!juego) return;

    const mostrarImagenes = configDisplay("show_images", true);
    const estrellas = generarEstrellas(juego.rating);
    const imagenHTML = mostrarImagenes ? generarImagenPlaceholder(juego.title, juego.genre, "grande") : "";

    // Generamos los badges de plataformas
    let badgesPlataformas = "";
    juego.platform.forEach(function (plataforma) {
        badgesPlataformas += '<span class="badge bg-primary me-1">' + plataforma + '</span>';
    });

    // Badge de oferta
    const badgeOferta = juego.onSale ? '<span class="badge bg-success ms-2">' + t("oferta") + '</span>' : "";

    // Eliminamos el modal anterior si existe (para evitar duplicados)
    const modalAnterior = document.getElementById("modal-detalle");
    if (modalAnterior) {
        modalAnterior.remove();
    }

    // Creamos el HTML del modal de Bootstrap 5
    const modalHTML = `
        <div class="modal fade" id="modal-detalle" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark text-light" style="border: 1px solid var(--color-borde);">

                    <!-- Cabecera del modal -->
                    <div class="modal-header" style="border-bottom: 1px solid var(--color-borde);">
                        <h5 class="modal-title">${juego.title}${badgeOferta}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>

                    <!-- Cuerpo del modal -->
                    <div class="modal-body">
                        <div class="row">

                            <!-- Columna de la imagen -->
                            <div class="col-md-4 text-center mb-3">
                                ${imagenHTML}
                            </div>

                            <!-- Columna de la información -->
                            <div class="col-md-8">
                                <table class="table table-dark table-striped">
                                    <tbody>
                                        <tr><th>${t("desarrollador")}</th><td>${juego.developer}</td></tr>
                                        <tr><th>${t("anio")}</th><td>${juego.year}</td></tr>
                                        <tr><th>${t("genero")}</th><td>${juego.genre}</td></tr>
                                        <tr><th>${t("plataformas")}</th><td>${badgesPlataformas}</td></tr>
                                        <tr><th>${t("precio")}</th><td class="fw-bold">$${juego.price}</td></tr>
                                        <tr><th>${t("valoracion")}</th><td class="text-warning">${estrellas}</td></tr>
                                    </tbody>
                                </table>
                                <p>${juego.description}</p>
                            </div>
                        </div>

                        <!-- Contenedor para mensajes de inventario -->
                        <div id="mensaje-inventario" class="mt-2"></div>
                    </div>

                    <!-- Pie del modal -->
                    <div class="modal-footer" style="border-top: 1px solid var(--color-borde);">
                        <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">
                            ${t("volverTienda")}
                        </button>
                        <button type="button" class="btn btn-success" id="btn-add-inventario">
                            ${t("añadirInventario")}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `;

    // Insertamos el modal en el body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Listener del botón "Añadir al inventario"
    document.getElementById("btn-add-inventario").addEventListener("click", function () {
        agregarAlInventario(juego.id);
    });

    // Abrimos el modal usando la API de Bootstrap 5
    const modal = new bootstrap.Modal(document.getElementById("modal-detalle"));
    modal.show();

    // Limpiamos el modal del DOM cuando se cierre
    document.getElementById("modal-detalle").addEventListener("hidden.bs.modal", function () {
        this.remove();
    });
}
