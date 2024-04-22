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
    fetch("https://raw.githubusercontent.com/TU_USUARIO/registro-patentes/main/patentes.json")
        .then(response => response.json())
        .then(data => {
            patentes = data;
            mostrarPatentes();
        })
        .catch(error => console.error("Error al cargar las patentes:", error));
}

function agregarPatente(patente) {
    fetch("https://raw.githubusercontent.com/TU_USUARIO/registro-patentes/main/patentes.json", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            patentes = data;
            patentes.push({ patente: patente, horaIngreso: obtenerHoraActual() });
            return fetch("https://api.github.com/repos/TU_USUARIO/registro-patentes/contents/patentes.json", {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer TU_TOKEN_DE_ACCESO",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "message": "Agregada nueva patente",
                    "content": btoa(JSON.stringify(patentes)),
                    "sha": data.sha
                })
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            cargarPatentes();
        })
        .catch(error => console.error("Error al agregar la patente:", error));
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

function obtenerHoraActual() {
    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, "0");
    const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
    const año = ahora.getFullYear();
    const hora = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes}/${año} ${hora}:${minutos}`;
}
