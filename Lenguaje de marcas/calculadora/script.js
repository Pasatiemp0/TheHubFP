// Pantalla
const resultado = document.getElementById('resultado');
const historia = document.getElementById('historia');

// Si true, el siguiente dígito reemplaza la pantalla (en vez de añadirse)
let reemplazar = false;

// Botones de dígitos (incluye "00" y ".")
const digitos = document.querySelectorAll('.btn-secondary');

digitos.forEach(boton => {
    boton.addEventListener('click', () => {
        if (reemplazar) {
            resultado.textContent = '';
            reemplazar = false;
        }
        resultado.textContent += boton.textContent;
    });
});

// Borrado: AC limpia todo, DEL quita el último carácter
document.querySelectorAll('.btn-warning').forEach(boton => {
    const txt = boton.textContent;
    if (txt === 'AC') {
        boton.addEventListener('click', () => {
            resultado.textContent = '';
            historia.textContent = '';
            reemplazar = false;
        });
    } else if (txt === 'DEL') {
        boton.addEventListener('click', () => {
            resultado.textContent = resultado.textContent.slice(0, -1);
        });
    } else if (['+', '-', '×', '÷'].includes(txt)) {
        // Operador: vuelca el operando al historial pero lo deja visible hasta el próximo dígito
        boton.addEventListener('click', () => {
            if (resultado.textContent === '') return;
            historia.textContent += resultado.textContent + txt;
            reemplazar = true;
        });
    } else if (txt === '=') {
        boton.addEventListener('click', calcular);
    }
});

// Porcentaje: divide el operando actual entre 100
document.querySelector('.btn-primary').addEventListener('click', () => {
    if (resultado.textContent === '') return;
    resultado.textContent = parseFloat(resultado.textContent) / 100;
});

function calcular() {
    // Si reemplazar=true, el valor mostrado ya está volcado en historia; descartamos el operador final
    const expresion = reemplazar
        ? historia.textContent.slice(0, -1)
        : historia.textContent + resultado.textContent;
    if (expresion === '') return;
    // × → *, ÷ → / para que eval lo entienda
    const evaluable = expresion.replace(/×/g, '*').replace(/÷/g, '/');
    try {
        const valor = eval(evaluable);
        historia.textContent = expresion + '=';
        resultado.textContent = valor;
        reemplazar = true;
    } catch (e) {
        resultado.textContent = 'Error';
    }
}
