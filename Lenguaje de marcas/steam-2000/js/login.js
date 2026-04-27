// login.js - Logica del formulario de login

document.addEventListener("DOMContentLoaded", async function () {
    await inicializarComun();

    // Listener del formulario de login
    document.getElementById("form-login").addEventListener("submit", function (evento) {
        evento.preventDefault();

        var usuario = document.getElementById("input-usuario").value.trim();
        var password = document.getElementById("input-password").value.trim();
        var mensaje = document.getElementById("mensaje-login");

        // Validamos que no esten vacios
        var valido = true;

        if (usuario === "") {
            document.getElementById("input-usuario").classList.add("is-invalid");
            valido = false;
        }

        if (password === "") {
            document.getElementById("input-password").classList.add("is-invalid");
            valido = false;
        }

        if (!valido) return;

        // Guardamos el usuario en localStorage
        var datosUsuario = {
            nombre: usuario,
            logueado: true
        };
        localStorage.setItem("usuario", JSON.stringify(datosUsuario));

        // Mensaje de exito y redireccion
        mensaje.innerHTML = '<div class="alert alert-success">¡Bienvenido, ' + usuario + '! Redirigiendo...</div>';

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1500);
    });
});
