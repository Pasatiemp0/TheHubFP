// traducciones.js - Textos de la aplicación en español e inglés

// Variable global para el idioma actual (por defecto español)
let idiomaActual = "es";

// Objeto con todas las traducciones organizadas por idioma
const textos = {
    es: {
        // Navbar
        tienda: "Tienda",
        inventario: "Inventario",
        login: "Iniciar Sesión",
        registro: "Registrarse",
        modoOscuro: "Modo oscuro",

        // Banner de la tienda
        bienvenida: "Bienvenido a Steam",
        subtituloBanner: "Las mejores ofertas en juegos para PC",

        // Controles de la tienda
        vistaCards: "Tarjetas",
        vistaLista: "Lista",
        cargarMas: "Cargar más juegos",

        // Tarjetas y lista de juegos
        verDetalles: "Ver detalles",
        oferta: "¡Oferta!",

        // Detalle del juego
        volverTienda: "Volver a la tienda",
        desarrollador: "Desarrollador",
        anio: "Año",
        genero: "Género",
        plataformas: "Plataformas",
        precio: "Precio",
        valoracion: "Valoración",
        añadirInventario: "Añadir al inventario",
        juegoNoEncontrado: "No se encontró el juego con id",
        yaEnInventario: "Este juego ya está en tu inventario.",
        añadidoAlInventario: "¡Juego añadido al inventario correctamente!",

        // Inventario
        miInventario: "Mi Inventario",
        inventarioVacio: "Tu inventario está vacío. ¡Visita la tienda!",
        irTienda: "Ir a la tienda",
        imagen: "Imagen",
        titulo: "Título",
        acciones: "Acciones",
        eliminar: "Eliminar",
        totalJuegos: "Total de juegos",
        valorTotal: "Valor total",

        // Login
        loginTitulo: "Iniciar Sesión en Steam",
        usuarioEmail: "Usuario o Email",
        placeholderUsuario: "Introduce tu usuario o email",
        errorUsuario: "Por favor, introduce tu usuario o email.",
        contrasena: "Contraseña",
        placeholderContrasena: "Introduce tu contraseña",
        errorContrasena: "Por favor, introduce tu contraseña.",
        recordarme: "Recordarme",
        botonLogin: "Iniciar Sesión",
        noTienesCuenta: "¿No tienes cuenta?",
        registrate: "Regístrate",
        bienvenidoUsuario: "¡Bienvenido,",
        redirigiendo: "Redirigiendo a la tienda...",

        // Registro
        registroTitulo: "Crear cuenta en Steam",
        nombreUsuario: "Nombre de usuario",
        placeholderNombre: "Elige un nombre de usuario",
        errorNombre: "Por favor, introduce un nombre de usuario.",
        email: "Email",
        placeholderEmail: "ejemplo@correo.com",
        errorEmail: "Por favor, introduce un email válido (debe contener @).",
        placeholderCrearContrasena: "Crea una contraseña",
        confirmarContrasena: "Confirmar contraseña",
        placeholderConfirmar: "Repite la contraseña",
        errorContrasenaNoCoincide: "Las contraseñas no coinciden.",
        aceptarTerminos: "Acepto los términos y condiciones",
        errorTerminos: "Debes aceptar los términos y condiciones.",
        botonCrearCuenta: "Crear cuenta",
        yaTienesCuenta: "¿Ya tienes cuenta?",
        iniciaSesion: "Inicia sesión",
        cuentaCreada: "¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...",

        // Footer
        footer: "Steam Store © 2000 - Proyecto Lenguajes de Marca"
    },
    en: {
        // Navbar
        tienda: "Store",
        inventario: "Inventory",
        login: "Sign In",
        registro: "Sign Up",
        modoOscuro: "Dark mode",

        // Banner de la tienda
        bienvenida: "Welcome to Steam",
        subtituloBanner: "The best deals on PC games",

        // Controles de la tienda
        vistaCards: "Cards",
        vistaLista: "List",
        cargarMas: "Load more games",

        // Tarjetas y lista de juegos
        verDetalles: "View details",
        oferta: "Sale!",

        // Detalle del juego
        volverTienda: "Back to store",
        desarrollador: "Developer",
        anio: "Year",
        genero: "Genre",
        plataformas: "Platforms",
        precio: "Price",
        valoracion: "Rating",
        añadirInventario: "Add to inventory",
        juegoNoEncontrado: "Game not found with id",
        yaEnInventario: "This game is already in your inventory.",
        añadidoAlInventario: "Game added to inventory successfully!",

        // Inventario
        miInventario: "My Inventory",
        inventarioVacio: "Your inventory is empty. Visit the store!",
        irTienda: "Go to store",
        imagen: "Image",
        titulo: "Title",
        acciones: "Actions",
        eliminar: "Remove",
        totalJuegos: "Total games",
        valorTotal: "Total value",

        // Login
        loginTitulo: "Sign In to Steam",
        usuarioEmail: "Username or Email",
        placeholderUsuario: "Enter your username or email",
        errorUsuario: "Please enter your username or email.",
        contrasena: "Password",
        placeholderContrasena: "Enter your password",
        errorContrasena: "Please enter your password.",
        recordarme: "Remember me",
        botonLogin: "Sign In",
        noTienesCuenta: "Don't have an account?",
        registrate: "Sign Up",
        bienvenidoUsuario: "Welcome,",
        redirigiendo: "Redirecting to store...",

        // Registro
        registroTitulo: "Create Steam Account",
        nombreUsuario: "Username",
        placeholderNombre: "Choose a username",
        errorNombre: "Please enter a username.",
        email: "Email",
        placeholderEmail: "example@mail.com",
        errorEmail: "Please enter a valid email (must contain @).",
        placeholderCrearContrasena: "Create a password",
        confirmarContrasena: "Confirm password",
        placeholderConfirmar: "Repeat your password",
        errorContrasenaNoCoincide: "Passwords do not match.",
        aceptarTerminos: "I accept the terms and conditions",
        errorTerminos: "You must accept the terms and conditions.",
        botonCrearCuenta: "Create account",
        yaTienesCuenta: "Already have an account?",
        iniciaSesion: "Sign In",
        cuentaCreada: "Account created successfully! Redirecting to sign in...",

        // Footer
        footer: "Steam Store © 2000 - Markup Languages Project"
    }
};

/**
 * Devuelve el texto traducido para la clave indicada.
 * Si no encuentra la clave, devuelve la propia clave como fallback.
 */
function t(clave) {
    if (textos[idiomaActual] && textos[idiomaActual][clave]) {
        return textos[idiomaActual][clave];
    }
    return clave;
}

/**
 * Devuelve la etiqueta de categoría en el idioma actual.
 * Usa label_es o label_en según el idioma seleccionado.
 */
function labelCategoria(categoria) {
    if (idiomaActual === "en") {
        return categoria.label_en;
    }
    return categoria.label_es;
}

/**
 * Cambia el idioma de la aplicación.
 * Actualiza la configuración, la navbar, el footer y la sección actual.
 */
function cambiarIdioma(nuevoIdioma) {
    // Actualizamos el idioma actual
    idiomaActual = nuevoIdioma;

    // Actualizamos la configuración
    if (configuracion.app) {
        configuracion.app.language = nuevoIdioma;
    }

    // Actualizamos los textos de la navbar
    actualizarNavbarIdioma();

    // Actualizamos el footer
    actualizarFooterIdioma();

    // Volvemos a renderizar la sección actual
    navegar();
}

/**
 * Actualiza los textos de la navbar según el idioma actual.
 * Mantiene el nombre del usuario si está logueado.
 */
function actualizarNavbarIdioma() {
    const enlaces = document.querySelectorAll(".navbar-nav .nav-link");

    // Comprobamos si hay un usuario logueado
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    enlaces.forEach(function (enlace) {
        const href = enlace.getAttribute("href");

        if (href === "#tienda") {
            enlace.textContent = t("tienda");
        } else if (href === "#inventario") {
            enlace.textContent = t("inventario");
        } else if (href === "#login") {
            // Si el usuario está logueado, mostramos su nombre
            if (usuario && usuario.logueado) {
                enlace.textContent = usuario.nombre;
            } else {
                enlace.textContent = t("login");
            }
        } else if (href === "#registro") {
            enlace.textContent = t("registro");
        }
    });

    // Actualizamos la etiqueta del switch de tema
    const labelTema = document.querySelector("label[for='themeSwitch']");
    if (labelTema) {
        labelTema.textContent = t("modoOscuro");
    }
}

/**
 * Actualiza el texto del footer según el idioma actual.
 */
function actualizarFooterIdioma() {
    const footer = document.querySelector("footer p");
    if (footer) {
        footer.textContent = t("footer");
    }
}
