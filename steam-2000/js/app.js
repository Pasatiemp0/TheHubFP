// app.js - Punto de entrada principal de la aplicación

/**
 * Función principal que se ejecuta al cargar la página.
 * Carga los datos, configura los listeners y muestra la primera sección.
 */
async function iniciarApp() {
    // Cargamos los datos de juegos y la configuración
    datosJuegos = await cargarJuegos();
    configuracion = await cargarConfiguracion();

    // Establecemos el idioma desde la configuración YAML
    if (configuracion.app && configuracion.app.language) {
        idiomaActual = configuracion.app.language;
    }

    // Aplicamos el tema inicial desde la configuración YAML
    let temaInicial = "dark";
    if (configuracion.display && configuracion.display.theme) {
        temaInicial = configuracion.display.theme;
    }
    aplicarTema(temaInicial);

    // Actualizamos los textos de la navbar y el footer con el idioma inicial
    actualizarNavbarIdioma();
    actualizarFooterIdioma();

    // Listener del selector de idioma
    document.getElementById("selector-idioma").addEventListener("change", function () {
        cambiarIdioma(this.value);
    });

    // Listener del switch de tema claro/oscuro
    document.getElementById("themeSwitch").addEventListener("change", function () {
        if (this.checked) {
            aplicarTema("dark");
        } else {
            aplicarTema("light");
        }
    });

    // Navegamos a la sección que indica el hash actual (o tienda por defecto)
    navegar();
}

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
        themeSwitch.checked = true;
    } else {
        body.classList.add("tema-claro");
        themeSwitch.checked = false;
    }
}

// Ejecutamos la función principal cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", iniciarApp);
