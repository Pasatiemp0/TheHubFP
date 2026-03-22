// registro.js - Lógica específica de la página de registro (registro.html)

// ===================== INICIALIZACIÓN =====================

/**
 * Se ejecuta cuando el DOM está listo.
 * Inicializa datos comunes, traduce textos y configura la validación del formulario.
 */
document.addEventListener("DOMContentLoaded", async function () {
    // 1. Inicializamos todo lo compartido (datos, tema, idioma, navbar)
    await inicializarComun();

    // 2. Traducimos todos los textos del formulario
    traducirTextosRegistro();

    // 3. Configuramos el listener del formulario
    document.getElementById("form-registro").addEventListener("submit", validarRegistro);
});

// ===================== TRADUCCIÓN DE TEXTOS =====================

/**
 * Traduce los textos estáticos del formulario de registro
 * usando la función t() de traducciones.js.
 */
function traducirTextosRegistro() {
    // Título de la card
    document.getElementById("registro-titulo").textContent = t("registroTitulo");

    // Labels
    document.getElementById("label-nombre").textContent = t("nombreUsuario");
    document.getElementById("label-email").textContent = t("email");
    document.getElementById("label-password").textContent = t("contrasena");
    document.getElementById("label-password2").textContent = t("confirmarContrasena");
    document.getElementById("label-terminos").textContent = t("aceptarTerminos");

    // Placeholders
    document.getElementById("reg-nombre").placeholder = t("placeholderNombre");
    document.getElementById("reg-email").placeholder = t("placeholderEmail");
    document.getElementById("reg-password").placeholder = t("placeholderCrearContrasena");
    document.getElementById("reg-password2").placeholder = t("placeholderConfirmar");

    // Mensajes de error
    document.getElementById("error-nombre").textContent = t("errorNombre");
    document.getElementById("error-email").textContent = t("errorEmail");
    document.getElementById("error-password").textContent = t("errorContrasena");
    document.getElementById("error-password2").textContent = t("errorContrasenaNoCoincide");
    document.getElementById("error-terminos").textContent = t("errorTerminos");

    // Botón
    document.getElementById("btn-registro").textContent = t("botonCrearCuenta");

    // Footer de la card
    document.getElementById("texto-ya-cuenta").textContent = t("yaTienesCuenta") + " ";
    document.getElementById("enlace-login").textContent = t("iniciaSesion");
}

// ===================== VALIDACIÓN Y REGISTRO =====================

/**
 * Valida el formulario de registro al hacer submit.
 * Si todos los campos son correctos, guarda el usuario y redirige a login.
 */
function validarRegistro(evento) {
    // Evitamos que la página se recargue
    evento.preventDefault();

    // Obtenemos todos los campos
    const inputNombre = document.getElementById("reg-nombre");
    const inputEmail = document.getElementById("reg-email");
    const inputPassword = document.getElementById("reg-password");
    const inputPassword2 = document.getElementById("reg-password2");
    const checkTerminos = document.getElementById("reg-terminos");
    const mensajeRegistro = document.getElementById("mensaje-registro");

    // Limpiamos validaciones anteriores
    inputNombre.classList.remove("is-invalid");
    inputEmail.classList.remove("is-invalid");
    inputPassword.classList.remove("is-invalid");
    inputPassword2.classList.remove("is-invalid");
    checkTerminos.classList.remove("is-invalid");
    mensajeRegistro.innerHTML = "";

    // Validamos cada campo
    let formularioValido = true;

    // Nombre de usuario no vacío
    if (inputNombre.value.trim() === "") {
        inputNombre.classList.add("is-invalid");
        formularioValido = false;
    }

    // Email no vacío y que contenga @
    if (inputEmail.value.trim() === "" || !inputEmail.value.includes("@")) {
        inputEmail.classList.add("is-invalid");
        formularioValido = false;
    }

    // Contraseña no vacía
    if (inputPassword.value.trim() === "") {
        inputPassword.classList.add("is-invalid");
        formularioValido = false;
    }

    // Las contraseñas deben coincidir
    if (inputPassword2.value !== inputPassword.value || inputPassword2.value.trim() === "") {
        inputPassword2.classList.add("is-invalid");
        formularioValido = false;
    }

    // El checkbox de términos debe estar marcado
    if (!checkTerminos.checked) {
        checkTerminos.classList.add("is-invalid");
        formularioValido = false;
    }

    // Si el formulario no es válido, no continuamos
    if (!formularioValido) return;

    // Guardamos el usuario registrado en localStorage
    const nuevoUsuario = {
        nombre: inputNombre.value.trim(),
        email: inputEmail.value.trim(),
        logueado: false
    };
    localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

    // Mostramos un mensaje de éxito
    mensajeRegistro.innerHTML = `
        <div class="alert alert-success" role="alert">
            ${t("cuentaCreada")}
        </div>
    `;

    // Después de 1.5 segundos, redirigimos al login
    setTimeout(function () {
        window.location.href = "login.html";
    }, 1500);
}
