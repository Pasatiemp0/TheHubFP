// common.js - Funciones compartidas entre todas las paginas

// Inicializa todo lo comun al cargar cada pagina
async function inicializarComun() {
    // Cargamos los juegos y la configuracion
    datosJuegos = await cargarJuegos();
    configuracion = await cargarConfiguracion();

    // Aplicamos el tema (de localStorage o "dark" por defecto)
    var tema = localStorage.getItem("tema") || "dark";
    aplicarTema(tema);

    // Actualizamos los textos de la navbar y el footer
    actualizarNavbarIdioma();
    actualizarFooterIdioma();

    // Selector de idioma: sincronizamos y ponemos el listener
    var selectorIdioma = document.getElementById("selector-idioma");
    if (selectorIdioma) {
        selectorIdioma.value = idiomaActual;
        selectorIdioma.addEventListener("change", function () {
            cambiarIdioma(this.value);
        });
    }

    // Switch de tema
    var themeSwitch = document.getElementById("themeSwitch");
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

// Aplica el tema al body y lo guarda en localStorage
function aplicarTema(tema) {
    document.body.classList.remove("tema-oscuro", "tema-claro");

    if (tema === "dark") {
        document.body.classList.add("tema-oscuro");
        var sw = document.getElementById("themeSwitch");
        if (sw) sw.checked = true;
    } else {
        document.body.classList.add("tema-claro");
        var sw = document.getElementById("themeSwitch");
        if (sw) sw.checked = false;
    }

    localStorage.setItem("tema", tema);
}

// Lee un valor de la configuracion YAML con un valor por defecto
function configDisplay(propiedad, valorDefecto) {
    if (configuracion.display && configuracion.display[propiedad] !== undefined) {
        return configuracion.display[propiedad];
    }
    return valorDefecto;
}

// Genera estrellas segun el rating (ej: 3 -> "★★★☆☆")
function generarEstrellas(rating) {
    var estrellas = "";
    for (var i = 1; i <= 5; i++) {
        estrellas += (i <= rating) ? "★" : "☆";
    }
    return estrellas;
}

// Genera un div gris como placeholder de imagen de un juego
function generarImagenPlaceholder(titulo) {
    return '<div style="background:#555; color:#fff; width:100%; height:150px; ' +
        'display:flex; align-items:center; justify-content:center; ' +
        'text-align:center; font-weight:bold; font-size:11px; padding:5px;">' +
        titulo + '</div>';
}

// Añade un juego al inventario en localStorage
function agregarAlInventario(id) {
    var inventario = JSON.parse(localStorage.getItem("inventario")) || [];

    // Comprobamos si ya esta
    if (inventario.indexOf(id) !== -1) {
        var mensaje = document.getElementById("mensaje-inventario");
        if (mensaje) {
            mensaje.innerHTML = '<div class="alert alert-warning">' + t("yaEnInventario") + '</div>';
        }
        return;
    }

    // Lo añadimos y guardamos
    inventario.push(id);
    localStorage.setItem("inventario", JSON.stringify(inventario));

    var mensaje = document.getElementById("mensaje-inventario");
    if (mensaje) {
        mensaje.innerHTML = '<div class="alert alert-success">' + t("añadidoAlInventario") + '</div>';
    }
}
