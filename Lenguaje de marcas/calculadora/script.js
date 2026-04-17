var resultado = document.body.getElementById('resultado');

var botones = document.body.querySelectorAll('.btn .btn-secondary');

botones.addEventListener("click", () => {
    resultado.textContent = 3;
})

function calcular() {
    
}