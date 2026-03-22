// components.js - Componentes reutilizables de la interfaz

// Variable para controlar la paginación (cuántos juegos se muestran actualmente)
let juegosMostrados = 0;

// Variable para guardar el modo de vista actual ("cards" o "list")
let vistaActual = "cards";

// ===================== UTILIDADES =====================

/**
 * Lee un valor de configuración de display con un valor por defecto.
 */
function configDisplay(propiedad, valorDefecto) {
    if (configuracion.display && configuracion.display[propiedad] !== undefined) {
        return configuracion.display[propiedad];
    }
    return valorDefecto;
}

/**
 * Genera una cadena de estrellas (★ y ☆) según la puntuación recibida.
 * Ejemplo: generarEstrellas(3) → "★★★☆☆"
 */
function generarEstrellas(rating) {
    let estrellas = "";
    for (let i = 1; i <= 5; i++) {
        estrellas += (i <= rating) ? "★" : "☆";
    }
    return estrellas;
}

/**
 * Colores de gradiente por género para las portadas placeholder.
 */
const coloresGenero = {
    fps: ["#e74c3c", "#c0392b"],
    rpg: ["#8e44ad", "#6c3483"],
    estrategia: ["#2980b9", "#1a5276"],
    simulacion: ["#27ae60", "#1e8449"],
    aventura: ["#d35400", "#a04000"],
    accion: ["#e67e22", "#ca6f1e"]
};

/**
 * Genera un div HTML estilizado que simula la portada de un juego.
 * @param {string} titulo - El título del juego.
 * @param {string} genero - El género (para elegir el color).
 * @param {string} tamaño - "grande", "mini" o "normal".
 */
function generarImagenPlaceholder(titulo, genero, tamaño) {
    const colores = coloresGenero[genero] || ["#566573", "#2c3e50"];

    let ancho = "100%";
    let alto = "180px";
    let fuente = "1rem";

    if (tamaño === "grande") {
        alto = "280px";
        fuente = "1.3rem";
    } else if (tamaño === "mini") {
        ancho = "64px";
        alto = "64px";
        fuente = "0.55rem";
    }

    return `
        <div class="placeholder-img" style="
            width: ${ancho}; height: ${alto};
            background: linear-gradient(135deg, ${colores[0]}, ${colores[1]});
            display: flex; align-items: center; justify-content: center;
            text-align: center; color: #fff; font-size: ${fuente}; font-weight: bold;
            border: 2px solid rgba(255,255,255,0.15); border-radius: 4px;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
            padding: 10px; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        ">${titulo}</div>
    `;
}

// ===================== TIENDA =====================

/**
 * Renderiza la sección principal de la tienda.
 */
function renderizarTienda() {
    const app = document.getElementById("app");

    // Leemos el modo de vista desde la configuración
    vistaActual = configDisplay("view_mode", "cards");

    // Generamos las opciones del select desde las categorías del YAML
    let opcionesCategorias = "";
    if (configuracion.categories) {
        configuracion.categories.forEach(function (categoria) {
            opcionesCategorias += `<option value="${categoria.id}">${labelCategoria(categoria)}</option>`;
        });
    }

    app.innerHTML = `
        <div class="bg-dark text-light p-4 mb-4 rounded text-center">
            <h1>${t("bienvenida")}</h1>
            <p class="mb-0">${t("subtituloBanner")}</p>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <select id="filtro-genero" class="form-select w-auto">
                ${opcionesCategorias}
            </select>
            <div class="btn-group" role="group">
                <button id="btn-vista-cards" type="button"
                    class="btn ${vistaActual === 'cards' ? 'btn-primary' : 'btn-outline-primary'}">
                    ${t("vistaCards")}
                </button>
                <button id="btn-vista-list" type="button"
                    class="btn ${vistaActual === 'list' ? 'btn-primary' : 'btn-outline-primary'}">
                    ${t("vistaLista")}
                </button>
            </div>
        </div>

        <div id="lista-juegos"></div>
        <div id="paginacion" class="text-center mt-4"></div>
    `;

    // Listener del filtro de género
    document.getElementById("filtro-genero").addEventListener("change", function () {
        filtrarJuegos(this.value);
    });

    // Listener botón vista tarjetas
    document.getElementById("btn-vista-cards").addEventListener("click", function () {
        vistaActual = "cards";
        document.getElementById("btn-vista-cards").className = "btn btn-primary";
        document.getElementById("btn-vista-list").className = "btn btn-outline-primary";
        filtrarJuegos(document.getElementById("filtro-genero").value);
    });

    // Listener botón vista lista
    document.getElementById("btn-vista-list").addEventListener("click", function () {
        vistaActual = "list";
        document.getElementById("btn-vista-list").className = "btn btn-primary";
        document.getElementById("btn-vista-cards").className = "btn btn-outline-primary";
        filtrarJuegos(document.getElementById("filtro-genero").value);
    });

    // Mostramos todos los juegos inicialmente
    mostrarJuegos(datosJuegos);
}

/**
 * Filtra los juegos por género y los muestra.
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

/**
 * Muestra los juegos en #lista-juegos.
 * Respeta items_per_page y el modo de vista actual.
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
        contenedor.innerHTML = `<div class="row g-3">${generarCardsHTML(juegosPagina, mostrarImagenes)}</div>`;
    } else {
        contenedor.innerHTML = `<ul class="list-group">${generarListaHTML(juegosPagina, mostrarImagenes)}</ul>`;
    }

    // Botón "Cargar más" si hay más juegos
    const contenedorPaginacion = document.getElementById("paginacion");
    contenedorPaginacion.innerHTML = "";

    if (juegosMostrados < juegos.length) {
        contenedorPaginacion.innerHTML = `
            <button id="btn-cargar-mas" class="btn btn-outline-light">${t("cargarMas")}</button>
        `;
        document.getElementById("btn-cargar-mas").addEventListener("click", function () {
            cargarMasJuegos(juegos, porPagina, mostrarImagenes);
        });
    }
}

/**
 * Carga más juegos y los añade al contenedor existente.
 */
function cargarMasJuegos(juegos, porPagina, mostrarImagenes) {
    const contenedor = document.getElementById("lista-juegos");

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

/**
 * Genera el HTML de tarjetas Bootstrap para un array de juegos.
 */
function generarCardsHTML(juegos, mostrarImagenes) {
    let html = "";

    juegos.forEach(function (juego) {
        const estrellas = generarEstrellas(juego.rating);
        const imagenHTML = mostrarImagenes ? generarImagenPlaceholder(juego.title, juego.genre, "normal") : "";
        const badgeOferta = juego.onSale ? `<span class="badge bg-success ms-2">${t("oferta")}</span>` : "";

        html += `
            <div class="col-md-4 col-lg-3">
                <div class="card bg-secondary text-light h-100">
                    ${imagenHTML}
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${juego.title}${badgeOferta}</h5>
                        <p class="card-text text-warning">${estrellas}</p>
                        <p class="card-text"><small>${juego.genre}</small></p>
                        <p class="card-text fw-bold mt-auto">$${juego.price}</p>
                        <button class="btn btn-sm btn-outline-light"
                            onclick="renderizarDetalle(${juego.id})">
                            ${t("verDetalles")}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    return html;
}

/**
 * Genera el HTML de elementos de lista Bootstrap para un array de juegos.
 */
function generarListaHTML(juegos, mostrarImagenes) {
    let html = "";

    juegos.forEach(function (juego) {
        const estrellas = generarEstrellas(juego.rating);
        const imagenHTML = mostrarImagenes
            ? `<div class="me-3">${generarImagenPlaceholder(juego.title, juego.genre, "mini")}</div>`
            : "";
        const badgeOferta = juego.onSale ? `<span class="badge bg-success ms-2">${t("oferta")}</span>` : "";

        html += `
            <li class="list-group-item bg-secondary text-light d-flex align-items-center">
                ${imagenHTML}
                <div class="flex-grow-1">
                    <h6 class="mb-1">${juego.title}${badgeOferta}</h6>
                    <small>${juego.genre} · <span class="text-warning">${estrellas}</span></small>
                </div>
                <span class="fw-bold me-3">$${juego.price}</span>
                <button class="btn btn-sm btn-outline-light"
                    onclick="renderizarDetalle(${juego.id})">
                    ${t("verDetalles")}
                </button>
            </li>
        `;
    });

    return html;
}

// ===================== DETALLE DEL JUEGO =====================

/**
 * Renderiza la página de detalle de un juego.
 */
function renderizarDetalle(id) {
    const app = document.getElementById("app");

    const juego = datosJuegos.find(function (j) {
        return j.id === id;
    });

    if (!juego) {
        app.innerHTML = `
            <div class="alert alert-danger mt-4" role="alert">
                ${t("juegoNoEncontrado")} ${id}.
            </div>
            <a href="#tienda" class="btn btn-outline-light">&larr; ${t("volverTienda")}</a>
        `;
        return;
    }

    const mostrarImagenes = configDisplay("show_images", true);
    const estrellas = generarEstrellas(juego.rating);
    const imagenHTML = mostrarImagenes ? generarImagenPlaceholder(juego.title, juego.genre, "grande") : "";

    let badgesPlataformas = "";
    juego.platform.forEach(function (plataforma) {
        badgesPlataformas += `<span class="badge bg-primary me-1">${plataforma}</span>`;
    });

    const badgeOferta = juego.onSale ? `<span class="badge bg-success ms-2">${t("oferta")}</span>` : "";

    app.innerHTML = `
        <button id="btn-volver" class="btn btn-outline-light mb-4">&larr; ${t("volverTienda")}</button>

        <div class="row">
            <div class="col-md-4 text-center">${imagenHTML}</div>
            <div class="col-md-8">
                <h2>${juego.title}${badgeOferta}</h2>

                <table class="table table-dark table-striped mt-3">
                    <tbody>
                        <tr><th>${t("desarrollador")}</th><td>${juego.developer}</td></tr>
                        <tr><th>${t("anio")}</th><td>${juego.year}</td></tr>
                        <tr><th>${t("genero")}</th><td>${juego.genre}</td></tr>
                        <tr><th>${t("plataformas")}</th><td>${badgesPlataformas}</td></tr>
                        <tr><th>${t("precio")}</th><td class="fw-bold">$${juego.price}</td></tr>
                        <tr><th>${t("valoracion")}</th><td class="text-warning">${estrellas}</td></tr>
                    </tbody>
                </table>

                <p class="mt-3">${juego.description}</p>

                <button id="btn-inventario" class="btn btn-success mt-2">
                    ${t("añadirInventario")}
                </button>
                <div id="mensaje-inventario" class="mt-3"></div>
            </div>
        </div>
    `;

    document.getElementById("btn-volver").addEventListener("click", function () {
        window.location.hash = "#tienda";
    });

    document.getElementById("btn-inventario").addEventListener("click", function () {
        agregarAlInventario(juego.id);
    });
}

/**
 * Añade un juego al inventario en localStorage.
 */
function agregarAlInventario(id) {
    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const contenedorMensaje = document.getElementById("mensaje-inventario");

    const yaExiste = inventario.some(function (idGuardado) {
        return idGuardado === id;
    });

    if (yaExiste) {
        contenedorMensaje.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                ${t("yaEnInventario")}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    } else {
        inventario.push(id);
        localStorage.setItem("inventario", JSON.stringify(inventario));
        contenedorMensaje.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                ${t("añadidoAlInventario")}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}

// ===================== INVENTARIO =====================

/**
 * Renderiza la sección "Mi Inventario".
 */
function renderizarInventario() {
    const app = document.getElementById("app");
    const inventarioIds = JSON.parse(localStorage.getItem("inventario")) || [];

    // Buscamos los datos completos de cada juego
    const juegosInventario = [];
    inventarioIds.forEach(function (id) {
        const juego = datosJuegos.find(function (j) { return j.id === id; });
        if (juego) {
            juegosInventario.push(juego);
        }
    });

    // Si el inventario está vacío
    if (juegosInventario.length === 0) {
        app.innerHTML = `
            <h2 class="mb-4">${t("miInventario")}</h2>
            <div class="text-center py-5">
                <p class="fs-4 text-secondary">${t("inventarioVacio")}</p>
                <a href="#tienda" class="btn btn-primary mt-2">${t("irTienda")}</a>
            </div>
        `;
        return;
    }

    const mostrarImagenes = configDisplay("show_images", true);
    let filasHTML = "";
    let precioTotal = 0;

    juegosInventario.forEach(function (juego) {
        precioTotal += juego.price;
        const imagenHTML = mostrarImagenes ? generarImagenPlaceholder(juego.title, juego.genre, "mini") : "";

        filasHTML += `
            <tr>
                <td>${imagenHTML}</td>
                <td>${juego.title}</td>
                <td>${juego.genre}</td>
                <td>${juego.year}</td>
                <td>
                    <button class="btn btn-danger btn-sm btn-eliminar" data-id="${juego.id}">
                        ${t("eliminar")}
                    </button>
                </td>
            </tr>
        `;
    });

    app.innerHTML = `
        <h2 class="mb-4">${t("miInventario")}</h2>

        <div class="table-responsive">
            <table class="table table-dark table-striped align-middle">
                <thead>
                    <tr>
                        <th>${t("imagen")}</th>
                        <th>${t("titulo")}</th>
                        <th>${t("genero")}</th>
                        <th>${t("anio")}</th>
                        <th>${t("acciones")}</th>
                    </tr>
                </thead>
                <tbody>${filasHTML}</tbody>
            </table>
        </div>

        <div class="d-flex justify-content-between align-items-center bg-dark text-light p-3 rounded">
            <span>${t("totalJuegos")}: <strong>${juegosInventario.length}</strong></span>
            <span>${t("valorTotal")}: <strong>$${precioTotal.toFixed(2)}</strong></span>
        </div>
    `;

    // Listeners de los botones "Eliminar"
    document.querySelectorAll(".btn-eliminar").forEach(function (boton) {
        boton.addEventListener("click", function () {
            eliminarDelInventario(Number(this.getAttribute("data-id")));
        });
    });
}

/**
 * Elimina un juego del inventario y re-renderiza.
 */
function eliminarDelInventario(id) {
    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    inventario = inventario.filter(function (idGuardado) { return idGuardado !== id; });
    localStorage.setItem("inventario", JSON.stringify(inventario));
    renderizarInventario();
}

// ===================== LOGIN =====================

/**
 * Renderiza el formulario de inicio de sesión.
 */
function renderizarLogin() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="row justify-content-center mt-5">
            <div class="col-md-6 col-lg-4">
                <div class="card bg-dark text-light">
                    <div class="card-header text-center">
                        <h4 class="mb-0">${t("loginTitulo")}</h4>
                    </div>
                    <div class="card-body">
                        <form id="form-login" novalidate>
                            <div class="mb-3">
                                <label for="input-usuario" class="form-label">${t("usuarioEmail")}</label>
                                <input type="text" class="form-control" id="input-usuario"
                                    placeholder="${t("placeholderUsuario")}">
                                <div class="invalid-feedback">${t("errorUsuario")}</div>
                            </div>
                            <div class="mb-3">
                                <label for="input-password" class="form-label">${t("contrasena")}</label>
                                <input type="password" class="form-control" id="input-password"
                                    placeholder="${t("placeholderContrasena")}">
                                <div class="invalid-feedback">${t("errorContrasena")}</div>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="check-recordar">
                                <label class="form-check-label" for="check-recordar">${t("recordarme")}</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">${t("botonLogin")}</button>
                        </form>
                        <div id="mensaje-login" class="mt-3"></div>
                    </div>
                    <div class="card-footer text-center">
                        <span>${t("noTienesCuenta")} </span>
                        <a href="#registro" class="text-decoration-none">${t("registrate")}</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("form-login").addEventListener("submit", function (evento) {
        evento.preventDefault();

        const inputUsuario = document.getElementById("input-usuario");
        const inputPassword = document.getElementById("input-password");
        const mensajeLogin = document.getElementById("mensaje-login");

        // Limpiamos validaciones
        inputUsuario.classList.remove("is-invalid");
        inputPassword.classList.remove("is-invalid");
        mensajeLogin.innerHTML = "";

        let formularioValido = true;

        if (inputUsuario.value.trim() === "") {
            inputUsuario.classList.add("is-invalid");
            formularioValido = false;
        }
        if (inputPassword.value.trim() === "") {
            inputPassword.classList.add("is-invalid");
            formularioValido = false;
        }
        if (!formularioValido) return;

        // Guardamos el usuario en localStorage
        const usuario = { nombre: inputUsuario.value.trim(), logueado: true };
        localStorage.setItem("usuario", JSON.stringify(usuario));

        mensajeLogin.innerHTML = `
            <div class="alert alert-success" role="alert">
                ${t("bienvenidoUsuario")} ${usuario.nombre}! ${t("redirigiendo")}
            </div>
        `;

        // Actualizamos la navbar (usa actualizarNavbarIdioma que ya detecta usuario logueado)
        actualizarNavbarIdioma();

        setTimeout(function () {
            window.location.hash = "#tienda";
        }, 1500);
    });
}

// ===================== REGISTRO =====================

/**
 * Renderiza el formulario de registro.
 */
function renderizarRegistro() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="row justify-content-center mt-5">
            <div class="col-md-6 col-lg-4">
                <div class="card bg-dark text-light">
                    <div class="card-header text-center">
                        <h4 class="mb-0">${t("registroTitulo")}</h4>
                    </div>
                    <div class="card-body">
                        <form id="form-registro" novalidate>
                            <div class="mb-3">
                                <label for="reg-nombre" class="form-label">${t("nombreUsuario")}</label>
                                <input type="text" class="form-control" id="reg-nombre"
                                    placeholder="${t("placeholderNombre")}">
                                <div class="invalid-feedback">${t("errorNombre")}</div>
                            </div>
                            <div class="mb-3">
                                <label for="reg-email" class="form-label">${t("email")}</label>
                                <input type="email" class="form-control" id="reg-email"
                                    placeholder="${t("placeholderEmail")}">
                                <div class="invalid-feedback">${t("errorEmail")}</div>
                            </div>
                            <div class="mb-3">
                                <label for="reg-password" class="form-label">${t("contrasena")}</label>
                                <input type="password" class="form-control" id="reg-password"
                                    placeholder="${t("placeholderCrearContrasena")}">
                                <div class="invalid-feedback">${t("errorContrasena")}</div>
                            </div>
                            <div class="mb-3">
                                <label for="reg-password2" class="form-label">${t("confirmarContrasena")}</label>
                                <input type="password" class="form-control" id="reg-password2"
                                    placeholder="${t("placeholderConfirmar")}">
                                <div class="invalid-feedback">${t("errorContrasenaNoCoincide")}</div>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="reg-terminos">
                                <label class="form-check-label" for="reg-terminos">${t("aceptarTerminos")}</label>
                                <div class="invalid-feedback">${t("errorTerminos")}</div>
                            </div>
                            <button type="submit" class="btn btn-success w-100">${t("botonCrearCuenta")}</button>
                        </form>
                        <div id="mensaje-registro" class="mt-3"></div>
                    </div>
                    <div class="card-footer text-center">
                        <span>${t("yaTienesCuenta")} </span>
                        <a href="#login" class="text-decoration-none">${t("iniciaSesion")}</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("form-registro").addEventListener("submit", function (evento) {
        evento.preventDefault();

        const inputNombre = document.getElementById("reg-nombre");
        const inputEmail = document.getElementById("reg-email");
        const inputPassword = document.getElementById("reg-password");
        const inputPassword2 = document.getElementById("reg-password2");
        const checkTerminos = document.getElementById("reg-terminos");
        const mensajeRegistro = document.getElementById("mensaje-registro");

        // Limpiamos validaciones
        inputNombre.classList.remove("is-invalid");
        inputEmail.classList.remove("is-invalid");
        inputPassword.classList.remove("is-invalid");
        inputPassword2.classList.remove("is-invalid");
        checkTerminos.classList.remove("is-invalid");
        mensajeRegistro.innerHTML = "";

        let formularioValido = true;

        if (inputNombre.value.trim() === "") {
            inputNombre.classList.add("is-invalid");
            formularioValido = false;
        }
        if (inputEmail.value.trim() === "" || !inputEmail.value.includes("@")) {
            inputEmail.classList.add("is-invalid");
            formularioValido = false;
        }
        if (inputPassword.value.trim() === "") {
            inputPassword.classList.add("is-invalid");
            formularioValido = false;
        }
        if (inputPassword2.value !== inputPassword.value || inputPassword2.value.trim() === "") {
            inputPassword2.classList.add("is-invalid");
            formularioValido = false;
        }
        if (!checkTerminos.checked) {
            checkTerminos.classList.add("is-invalid");
            formularioValido = false;
        }
        if (!formularioValido) return;

        // Guardamos el usuario registrado
        const nuevoUsuario = {
            nombre: inputNombre.value.trim(),
            email: inputEmail.value.trim(),
            logueado: false
        };
        localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

        mensajeRegistro.innerHTML = `
            <div class="alert alert-success" role="alert">${t("cuentaCreada")}</div>
        `;

        setTimeout(function () {
            window.location.hash = "#login";
        }, 1500);
    });
}
