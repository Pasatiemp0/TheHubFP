// common.js - Funciones compartidas entre todas las páginas
// (tema, idioma, usuario logueado, estrellas, placeholders, inventario)

// ===================== VARIABLES GLOBALES =====================
// "datosJuegos" y "configuracion" ya se declaran en dataLoader.js,
// que se carga antes de este archivo en todas las páginas.

// ===================== INICIALIZACIÓN COMÚN =====================

/**
 * Función asíncrona que inicializa todo lo compartido entre páginas.
 * Cada página la llama desde su propio script al cargar el DOM.
 */
async function inicializarComun() {
    // 1. Cargamos los datos de juegos y la configuración (de dataLoader.js)
    datosJuegos = await cargarJuegos();
    configuracion = await cargarConfiguracion();

    // 2. Establecemos el idioma: primero localStorage, luego YAML, luego "es"
    if (!localStorage.getItem("idioma") && configuracion.app && configuracion.app.language) {
        idiomaActual = configuracion.app.language;
    }

    // 3. Aplicamos el tema: primero localStorage, luego YAML, luego "dark"
    let temaInicial = localStorage.getItem("tema") || (configuracion.display && configuracion.display.theme) || "dark";
    aplicarTema(temaInicial);

    // 4. Comprobamos si hay usuario logueado y actualizamos la navbar
    actualizarNavbarUsuario();

    // 5. Actualizamos los textos de la navbar y el footer con el idioma
    actualizarNavbarIdioma();
    actualizarFooterIdioma();

    // 6. Sincronizamos el selector de idioma con el idioma actual
    const selectorIdioma = document.getElementById("selector-idioma");
    if (selectorIdioma) {
        selectorIdioma.value = idiomaActual;

        // Al cambiar idioma, usamos cambiarIdioma() que guarda en localStorage y recarga
        selectorIdioma.addEventListener("change", function () {
            cambiarIdioma(this.value);
        });
    }

    // 7. Configuramos el listener del switch de tema
    const themeSwitch = document.getElementById("themeSwitch");
    if (themeSwitch) {
        themeSwitch.addEventListener("change", function () {
            if (this.checked) {
                aplicarTema("dark");
            } else {
                aplicarTema("light");
            }
        });
    }
}

// ===================== TEMA =====================

/**
 * Aplica el tema indicado al body (añade la clase CSS correspondiente).
 * Sincroniza el estado del switch con el tema.
 */
function aplicarTema(tema) {
    const body = document.body;
    const themeSwitch = document.getElementById("themeSwitch");

    // Quitamos ambas clases y ponemos la correcta
    body.classList.remove("tema-oscuro", "tema-claro");

    if (tema === "dark") {
        body.classList.add("tema-oscuro");
        if (themeSwitch) themeSwitch.checked = true;
    } else {
        body.classList.add("tema-claro");
        if (themeSwitch) themeSwitch.checked = false;
    }

    // Guardamos la elección en localStorage para que persista entre páginas
    localStorage.setItem("tema", tema);
}

// ===================== USUARIO EN NAVBAR =====================

/**
 * Comprueba si hay un usuario logueado en localStorage.
 * Si lo hay, cambia el enlace "Iniciar Sesión" por el nombre del usuario
 * y muestra un enlace "Cerrar Sesión".
 * Si no lo hay, muestra los enlaces normales de login y registro.
 */
function actualizarNavbarUsuario() {
    // Leemos el usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Buscamos el contenedor de los enlaces de sesión en la navbar
    const enlaceLogin = document.getElementById("nav-login");
    const enlaceRegistro = document.getElementById("nav-registro");
    const enlaceLogout = document.getElementById("nav-logout");

    // Si no existen los elementos, no hacemos nada
    if (!enlaceLogin) return;

    if (usuario && usuario.logueado) {
        // Usuario logueado: mostramos su nombre y el botón de cerrar sesión
        enlaceLogin.textContent = usuario.nombre;
        enlaceLogin.href = "#";

        // Ocultamos el enlace de registro
        if (enlaceRegistro) {
            enlaceRegistro.style.display = "none";
        }

        // Mostramos el enlace de cerrar sesión
        if (enlaceLogout) {
            enlaceLogout.style.display = "block";
            enlaceLogout.textContent = (idiomaActual === "en") ? "Sign Out" : "Cerrar Sesión";

            // Listener para cerrar sesión (se añade solo una vez)
            enlaceLogout.onclick = function (evento) {
                evento.preventDefault();
                localStorage.removeItem("usuario");
                window.location.href = "login.html";
            };
        }
    } else {
        // No hay usuario: mostramos los enlaces normales
        enlaceLogin.textContent = t("login");
        enlaceLogin.href = "login.html";

        if (enlaceRegistro) {
            enlaceRegistro.style.display = "block";
        }

        if (enlaceLogout) {
            enlaceLogout.style.display = "none";
        }
    }
}

// ===================== CONFIGURACIÓN =====================

/**
 * Lee un valor de configuración de display con un valor por defecto.
 * Evita repetir la comprobación de "configuracion.display" en cada página.
 */
function configDisplay(propiedad, valorDefecto) {
    if (configuracion.display && configuracion.display[propiedad] !== undefined) {
        return configuracion.display[propiedad];
    }
    return valorDefecto;
}

// ===================== ESTRELLAS =====================

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

// ===================== IMAGEN PLACEHOLDER =====================

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
 * Se usa como placeholder cuando no hay imagen real disponible.
 *
 * @param {string} titulo - El título del juego.
 * @param {string} genero - El género (para elegir el color del gradiente).
 * @param {string} tamaño - "grande" para detalle, "mini" para lista/inventario, "normal" para tarjetas.
 */
function generarImagenPlaceholder(titulo, genero, tamaño) {
    // Elegimos los colores según el género (o gris por defecto)
    const colores = coloresGenero[genero] || ["#566573", "#2c3e50"];

    // Ajustamos las dimensiones según el contexto
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

// ===================== INVENTARIO (localStorage) =====================

/**
 * Añade un juego al inventario en localStorage.
 * Comprueba si el juego ya existe para no duplicarlo.
 * Muestra un mensaje en el div #mensaje-inventario si existe en la página.
 */
function agregarAlInventario(id) {
    // Recuperamos el inventario del localStorage (o creamos uno vacío)
    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

    // Comprobamos si el juego ya está en el inventario
    const yaExiste = inventario.some(function (idGuardado) {
        return idGuardado === id;
    });

    // Buscamos el contenedor de mensajes (puede no existir en todas las páginas)
    const contenedorMensaje = document.getElementById("mensaje-inventario");

    if (yaExiste) {
        // El juego ya está en el inventario
        if (contenedorMensaje) {
            contenedorMensaje.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    ${t("yaEnInventario")}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
        }
    } else {
        // Añadimos el id del juego y guardamos en localStorage
        inventario.push(id);
        localStorage.setItem("inventario", JSON.stringify(inventario));

        if (contenedorMensaje) {
            contenedorMensaje.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    ${t("añadidoAlInventario")}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
        }
    }
}
