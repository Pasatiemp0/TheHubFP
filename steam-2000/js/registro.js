// registro.js - Logica del formulario de registro

document.addEventListener("DOMContentLoaded", async function () {
    await inicializarComun();

    // Listener del formulario de registro
    document.getElementById("form-registro").addEventListener("submit", function (evento) {
        evento.preventDefault();

        var nombre = document.getElementById("reg-nombre").value.trim();
        var email = document.getElementById("reg-email").value.trim();
        var password = document.getElementById("reg-password").value;
        var password2 = document.getElementById("reg-password2").value;
        var terminos = document.getElementById("reg-terminos").checked;
        var mensaje = document.getElementById("mensaje-registro");

        // Validamos cada campo
        var valido = true;

        if (nombre === "") {
            document.getElementById("reg-nombre").classList.add("is-invalid");
            valido = false;
        }

        if (email === "" || email.indexOf("@") === -1) {
            document.getElementById("reg-email").classList.add("is-invalid");
            valido = false;
        }

        if (password === "") {
            document.getElementById("reg-password").classList.add("is-invalid");
            valido = false;
        }

        if (password2 !== password || password2 === "") {
            document.getElementById("reg-password2").classList.add("is-invalid");
            valido = false;
        }

        if (!terminos) {
            document.getElementById("reg-terminos").classList.add("is-invalid");
            valido = false;
        }

        if (!valido) return;

        // Guardamos el usuario registrado
        var nuevoUsuario = {
            nombre: nombre,
            email: email,
            logueado: false
        };
        localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

        // Mensaje de exito y redireccion al login
        mensaje.innerHTML = '<div class="alert alert-success">¡Cuenta creada! Redirigiendo al login...</div>';

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);
    });
});
