// inventario.js - Lógica específica de la página de inventario (inventario.html)

// ===================== INICIALIZACIÓN =====================

/**
 * Se ejecuta cuando el DOM está listo.
 * Inicializa datos comunes, traduce textos y muestra el inventario.
 */
document.addEventListener("DOMContentLoaded", async function () {
    // 1. Inicializamos todo lo compartido (datos, tema, idioma, navbar)
    await inicializarComun();

    // 2. Traducimos el título de la página
    document.getElementById("titulo-inventario").textContent = t("miInventario");

    // 3. Mostramos el contenido del inventario
    renderizarInventario();
});

// ===================== RENDERIZAR INVENTARIO =====================

/**
 * Lee el inventario de localStorage, busca los datos de cada juego
 * y genera la tabla o el mensaje de vacío en #contenido-inventario.
 */
function renderizarInventario() {
    const contenedor = document.getElementById("contenido-inventario");

    // Leemos el array de IDs del inventario desde localStorage
    const inventarioIds = JSON.parse(localStorage.getItem("inventario")) || [];

    // Buscamos los datos completos de cada juego por su id
    const juegosInventario = [];
    inventarioIds.forEach(function (id) {
        const juego = datosJuegos.find(function (j) { return j.id === id; });
        if (juego) {
            juegosInventario.push(juego);
        }
    });

    // Si el inventario está vacío, mostramos un mensaje
    if (juegosInventario.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5">
                <p class="fs-4 text-secondary">${t("inventarioVacio")}</p>
                <a href="index.html" class="btn btn-primary mt-2">${t("irTienda")}</a>
            </div>
        `;
        return;
    }

    // Leemos si debemos mostrar imágenes
    const mostrarImagenes = configDisplay("show_images", true);

    // Generamos las filas de la tabla
    let filasHTML = "";
    let precioTotal = 0;

    juegosInventario.forEach(function (juego) {
        // Sumamos el precio al total
        precioTotal += juego.price;

        // Miniatura placeholder (si la configuración lo permite)
        const imagenHTML = mostrarImagenes
            ? generarImagenPlaceholder(juego.title, juego.genre, "mini")
            : "";

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

    // Insertamos la tabla y el resumen
    contenedor.innerHTML = `
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

        <div class="d-flex justify-content-between align-items-center bg-dark text-light p-3">
            <span>${t("totalJuegos")}: <strong>${juegosInventario.length}</strong></span>
            <span>${t("valorTotal")}: <strong>$${precioTotal.toFixed(2)}</strong></span>
        </div>
    `;

    // Añadimos los listeners a los botones "Eliminar"
    document.querySelectorAll(".btn-eliminar").forEach(function (boton) {
        boton.addEventListener("click", function () {
            eliminarDelInventario(Number(this.getAttribute("data-id")));
        });
    });
}

// ===================== ELIMINAR DEL INVENTARIO =====================

/**
 * Elimina un juego del inventario en localStorage
 * y vuelve a renderizar para reflejar el cambio.
 */
function eliminarDelInventario(id) {
    // Leemos el inventario actual
    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

    // Filtramos para quitar el juego con ese id
    inventario = inventario.filter(function (idGuardado) {
        return idGuardado !== id;
    });

    // Guardamos el inventario actualizado
    localStorage.setItem("inventario", JSON.stringify(inventario));

    // Volvemos a renderizar el inventario
    renderizarInventario();
}
