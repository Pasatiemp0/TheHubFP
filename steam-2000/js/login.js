// login.js - Lógica específica de la página de inicio de sesión (login.html)

// ===================== INICIALIZACIÓN =====================

/**
 * Se ejecuta cuando el DOM está listo.
 * Inicializa datos comunes, traduce textos y configura la validación del formulario.
 */
document.addEventListener("DOMContentLoaded", async function () {
    // 1. Inicializamos todo lo compartido (datos, tema, idioma, navbar)
    await inicializarComun();

    // 2. Traducimos todos los textos del formulario
    traducirTextosLogin();

    // 3. Configuramos el listener del formulario
    document.getElementById("form-login").addEventListener("submit", validarLogin);
});

// ===================== TRADUCCIÓN DE TEXTOS =====================

/**
 * Traduce los textos estáticos del formulario de login
 * usando la función t() de traducciones.js.
 */
function traducirTextosLogin() {
    // Título de la card
    document.getElementById("login-titulo").textContent = t("loginTitulo");

    // Labels
    document.getElementById("label-usuario").textContent = t("usuarioEmail");
    document.getElementById("label-password").textContent = t("contrasena");
    document.getElementById("label-recordar").textContent = t("recordarme");

    // Placeholders
    document.getElementById("input-usuario").placeholder = t("placeholderUsuario");
    document.getElementById("input-password").placeholder = t("placeholderContrasena");

    // Mensajes de error
    document.getElementById("error-usuario").textContent = t("errorUsuario");
    document.getElementById("error-password").textContent = t("errorContrasena");

    // Botón
    document.getElementById("btn-login").textContent = t("botonLogin");

    // Footer de la card
    document.getElementById("texto-no-cuenta").textContent = t("noTienesCuenta") + " ";
    document.getElementById("enlace-registro").textContent = t("registrate");
}

// ===================== VALIDACIÓN Y LOGIN =====================

/**
 * Valida el formulario de login al hacer submit.
 * Si los campos son válidos, simula un login guardando en localStorage.
 */
function validarLogin(evento) {
    // Evitamos que la página se recargue
    evento.preventDefault();

    // Obtenemos los campos
    const inputUsuario = document.getElementById("input-usuario");
    const inputPassword = document.getElementById("input-password");
    const mensajeLogin = document.getElementById("mensaje-login");

    // Limpiamos validaciones anteriores
    inputUsuario.classList.remove("is-invalid");
    inputPassword.classList.remove("is-invalid");
    mensajeLogin.innerHTML = "";

    // Validamos que los campos no estén vacíos
    let formularioValido = true;

    if (inputUsuario.value.trim() === "") {
        inputUsuario.classList.add("is-invalid");
        formularioValido = false;
    }

    if (inputPassword.value.trim() === "") {
        inputPassword.classList.add("is-invalid");
        formularioValido = false;
    }

    // Si el formulario no es válido, no continuamos
    if (!formularioValido) return;

    // Guardamos el usuario en localStorage
    const usuario = {
        nombre: inputUsuario.value.trim(),
        logueado: true
    };
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Mostramos un mensaje de éxito
    mensajeLogin.innerHTML = `
        <div class="alert alert-success" role="alert">
            ${t("bienvenidoUsuario")} ${usuario.nombre}! ${t("redirigiendo")}
        </div>
    `;

    // Actualizamos la navbar para mostrar el nombre del usuario
    actualizarNavbarUsuario();
    actualizarNavbarIdioma();

    // Después de 1.5 segundos, redirigimos a la tienda
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);
}
