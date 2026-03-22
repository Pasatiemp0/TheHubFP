// dataLoader.js - Carga y gestión de datos (JSON, YAML)

// Variables globales para almacenar los datos cargados
let datosJuegos = [];
let configuracion = {};

/**
 * Carga el listado de juegos desde el archivo JSON.
 * Usa fetch() para leer el archivo y response.json() para convertirlo.
 * Si ocurre un error, devuelve un array vacío.
 */
async function cargarJuegos() {
    try {
        // Hacemos la petición al archivo JSON
        const response = await fetch("data/games.json");

        // Convertimos la respuesta a un objeto JavaScript
        const juegos = await response.json();

        return juegos;
    } catch (error) {
        console.error("Error al cargar los juegos:", error);
        return [];
    }
}

/**
 * Carga la configuración desde el archivo YAML.
 * Usa fetch() para leer el archivo como texto y jsyaml.load() para convertirlo.
 * Si ocurre un error, devuelve un objeto con valores por defecto.
 */
async function cargarConfiguracion() {
    try {
        // Hacemos la petición al archivo YAML
        const response = await fetch("data/config.yaml");

        // Leemos la respuesta como texto plano
        const textoYaml = await response.text();

        // Convertimos el texto YAML a un objeto JavaScript usando js-yaml
        const config = jsyaml.load(textoYaml);

        return config;
    } catch (error) {
        console.error("Error al cargar la configuración:", error);

        // Devolvemos valores por defecto si falla la carga
        return {
            theme: "dark",
            language: "es",
            items_per_page: 6,
            show_images: true,
            view_mode: "cards"
        };
    }
}
