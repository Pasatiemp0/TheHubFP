// inventario.js - Logica de la pagina de inventario

document.addEventListener("DOMContentLoaded", async function () {
    await inicializarComun();

    // Titulo del inventario (se traduce segun el idioma)
    document.getElementById("titulo-inventario").textContent = t("miInventario");

    // Mostramos el inventario
    renderizarInventario();
});

// Muestra los juegos del inventario en una tabla
function renderizarInventario() {
    var contenedor = document.getElementById("contenido-inventario");
    var inventarioIds = JSON.parse(localStorage.getItem("inventario")) || [];

    // Buscamos los datos de cada juego
    var juegos = [];
    for (var i = 0; i < inventarioIds.length; i++) {
        for (var j = 0; j < datosJuegos.length; j++) {
            if (datosJuegos[j].id === inventarioIds[i]) {
                juegos.push(datosJuegos[j]);
            }
        }
    }

    // Si el inventario esta vacio
    if (juegos.length === 0) {
        contenedor.innerHTML =
            '<div class="text-center py-5">' +
                '<p class="fs-4 text-secondary">' + t("inventarioVacio") + '</p>' +
                '<a href="index.html" class="btn btn-primary mt-2">Ir a la tienda</a>' +
            '</div>';
        return;
    }

    // Generamos las filas de la tabla
    var filasHTML = "";
    for (var i = 0; i < juegos.length; i++) {
        filasHTML +=
            '<tr>' +
                '<td>' + juegos[i].title + '</td>' +
                '<td>' + juegos[i].genre + '</td>' +
                '<td>' + juegos[i].year + '</td>' +
                '<td>$' + juegos[i].price + '</td>' +
                '<td><button class="btn btn-danger btn-sm btn-eliminar" data-id="' + juegos[i].id + '">' + t("eliminar") + '</button></td>' +
            '</tr>';
    }

    // Insertamos la tabla
    contenedor.innerHTML =
        '<div class="table-responsive">' +
            '<table class="table table-dark table-striped">' +
                '<thead><tr>' +
                    '<th>Título</th>' +
                    '<th>Género</th>' +
                    '<th>Año</th>' +
                    '<th>Precio</th>' +
                    '<th>Acciones</th>' +
                '</tr></thead>' +
                '<tbody>' + filasHTML + '</tbody>' +
            '</table>' +
        '</div>' +
        '<p class="mt-2"><strong>Total: ' + juegos.length + ' juegos</strong></p>';

    // Listeners de los botones eliminar
    var botones = document.querySelectorAll(".btn-eliminar");
    for (var i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function () {
            eliminarDelInventario(Number(this.getAttribute("data-id")));
        });
    }
}

// Elimina un juego del inventario
function eliminarDelInventario(id) {
    var inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    var nuevo = [];
    for (var i = 0; i < inventario.length; i++) {
        if (inventario[i] !== id) {
            nuevo.push(inventario[i]);
        }
    }
    localStorage.setItem("inventario", JSON.stringify(nuevo));
    renderizarInventario();
}
