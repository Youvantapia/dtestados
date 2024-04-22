let patentes = [];

document.addEventListener("DOMContentLoaded", function() {
    cargarPatentes();

    const formAgregarPatente = document.getElementById("formAgregarPatente");
    formAgregarPatente.addEventListener("submit", function(event) {
        event.preventDefault();
        const patente = document.getElementById("patente").value;
        agregarPatente(patente);
        formAgregarPatente.reset();
    });
});

function cargarPatentes() {
    // Cargar patentes desde el almacenamiento local
    const patentesGuardadas = JSON.parse(localStorage.getItem("patentes"));
    if (patentesGuardadas) {
        patentes = patentesGuardadas;
        mostrarPatentes();
    }
}

function agregarPatente(patente) {
    patentes.push({ patente: patente, horaIngreso: obtenerHoraActual() });
    localStorage.setItem("patentes", JSON.stringify(patentes));
    mostrarPatentes();
}

function obtenerHoraActual() {
    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, "0");
    const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
    const año = ahora.getFullYear();
    const hora = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes}/${año} ${hora}:${minutos}`;
}

function mostrarPatentes() {
    const patentesList = document.getElementById("patentesList");
    patentesList.innerHTML = "";
    patentes.forEach(patente => {
        const patenteItem = document.createElement("li");
        patenteItem.textContent = `${patente.patente} - Ingreso: ${patente.horaIngreso}`;
        patentesList.appendChild(patenteItem);
    });
}
