// traducciones.js - Textos en español e inglés
// Solo traducimos la navbar, el footer y unos pocos textos que cambia el JS

// Idioma guardado en localStorage, o "es" por defecto
var idiomaActual = localStorage.getItem("idioma") || "es";

// Objeto con las traducciones (solo las esenciales)
var textos = {
    es: {
        tienda: "Tienda",
        inventario: "Inventario",
        login: "Iniciar Sesión",
        registro: "Registrarse",
        salir: "Salir",
        modoOscuro: "Modo oscuro",
        verDetalles: "Ver detalles",
        miInventario: "Mi Inventario",
        eliminar: "Eliminar",
        cargarMas: "Cargar más",
        inventarioVacio: "Tu inventario está vacío.",
        añadidoAlInventario: "¡Juego añadido al inventario!",
        yaEnInventario: "Este juego ya está en tu inventario.",
        footer: "Steam Store © 2000 - Proyecto Lenguajes de Marca"
    },
    en: {
        tienda: "Store",
        inventario: "Inventory",
        login: "Sign In",
        registro: "Sign Up",
        salir: "Sign Out",
        modoOscuro: "Dark mode",
        verDetalles: "View details",
        miInventario: "My Inventory",
        eliminar: "Remove",
        cargarMas: "Load more",
        inventarioVacio: "Your inventory is empty.",
        añadidoAlInventario: "Game added to inventory!",
        yaEnInventario: "This game is already in your inventory.",
        footer: "Steam Store © 2000 - Markup Languages Project"
    }
};

// Devuelve el texto en el idioma actual
function t(clave) {
    if (textos[idiomaActual] && textos[idiomaActual][clave]) {
        return textos[idiomaActual][clave];
    }
    return clave;
}

// Devuelve la etiqueta de una categoria en el idioma actual
function labelCategoria(categoria) {
    if (idiomaActual === "en") {
        return categoria.label_en;
    }
    return categoria.label_es;
}

// Cambia el idioma, lo guarda y recarga la pagina
function cambiarIdioma(nuevoIdioma) {
    localStorage.setItem("idioma", nuevoIdioma);
    location.reload();
}

// Actualiza los textos de la navbar segun el idioma
function actualizarNavbarIdioma() {
    var enlaces = document.querySelectorAll(".navbar-nav [data-seccion]");
    var usuario = JSON.parse(localStorage.getItem("usuario"));

    for (var i = 0; i < enlaces.length; i++) {
        var seccion = enlaces[i].getAttribute("data-seccion");

        if (seccion === "tienda") {
            enlaces[i].textContent = t("tienda");
        } else if (seccion === "inventario") {
            enlaces[i].textContent = t("inventario");
        } else if (seccion === "login") {
            // Si hay usuario logueado, mostramos su nombre
            if (usuario && usuario.logueado) {
                enlaces[i].textContent = usuario.nombre;
                enlaces[i].href = "#";
            } else {
                enlaces[i].textContent = t("login");
            }
        } else if (seccion === "registro") {
            // Si hay usuario logueado, mostramos "Salir"
            if (usuario && usuario.logueado) {
                enlaces[i].textContent = t("salir");
                enlaces[i].href = "#";
                enlaces[i].onclick = function () {
                    localStorage.removeItem("usuario");
                    location.reload();
                    return false;
                };
            } else {
                enlaces[i].textContent = t("registro");
            }
        }
    }

    // Etiqueta del switch de tema
    var labelTema = document.querySelector("label[for='themeSwitch']");
    if (labelTema) {
        labelTema.textContent = t("modoOscuro");
    }
}

// Actualiza el texto del footer
function actualizarFooterIdioma() {
    var footer = document.querySelector("footer p");
    if (footer) {
        footer.textContent = t("footer");
    }
}
