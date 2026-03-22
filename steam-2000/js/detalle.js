// detalle.js - Muestra la informacion de un juego

document.addEventListener("DOMContentLoaded", async function () {
    await inicializarComun();

    // Leemos el id del juego de la URL (ej: detalle.html?id=3)
    var params = new URLSearchParams(window.location.search);
    var id = Number(params.get("id"));

    // Buscamos el juego en los datos
    var juego = null;
    for (var i = 0; i < datosJuegos.length; i++) {
        if (datosJuegos[i].id === id) {
            juego = datosJuegos[i];
            break;
        }
    }

    var contenedor = document.getElementById("detalle-juego");

    // Si no encontramos el juego
    if (!juego) {
        contenedor.innerHTML =
            '<p>No se encontró el juego.</p>' +
            '<a href="index.html" class="btn btn-primary">Volver a la tienda</a>';
        return;
    }

    // Estrellas de valoracion
    var estrellas = generarEstrellas(juego.rating);

    // Badges de plataformas
    var plataformasHTML = "";
    for (var i = 0; i < juego.platform.length; i++) {
        plataformasHTML += '<span class="badge bg-primary me-1">' + juego.platform[i] + '</span>';
    }

    // Badge de oferta
    var ofertaHTML = juego.onSale ? '<span class="badge bg-success ms-2">OFERTA</span>' : "";

    // Mostramos la informacion del juego
    contenedor.innerHTML =
        '<div class="row">' +
            '<div class="col-md-4 mb-3">' +
                generarImagenPlaceholder(juego.title) +
            '</div>' +
            '<div class="col-md-8">' +
                '<h2>' + juego.title + ofertaHTML + '</h2>' +
                '<p class="text-warning">' + estrellas + '</p>' +
                '<table class="table table-dark table-striped">' +
                    '<tr><th>Desarrollador</th><td>' + juego.developer + '</td></tr>' +
                    '<tr><th>Año</th><td>' + juego.year + '</td></tr>' +
                    '<tr><th>Género</th><td>' + juego.genre + '</td></tr>' +
                    '<tr><th>Plataformas</th><td>' + plataformasHTML + '</td></tr>' +
                    '<tr><th>Precio</th><td class="fw-bold">$' + juego.price + '</td></tr>' +
                '</table>' +
                '<p>' + juego.description + '</p>' +
                '<div id="mensaje-inventario" class="mb-3"></div>' +
                '<button class="btn btn-success me-2" id="btn-añadir">Añadir al inventario</button>' +
                '<a href="index.html" class="btn btn-outline-light">Volver a la tienda</a>' +
            '</div>' +
        '</div>';

    // Boton de añadir al inventario
    document.getElementById("btn-añadir").addEventListener("click", function () {
        agregarAlInventario(juego.id);
    });
});
