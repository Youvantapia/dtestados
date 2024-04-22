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
    fetch("/patentes")
        .then(response => response.json())
        .then(data => {
            patentes = data;
            mostrarPatentes();
        })
        .catch(error => console.error("Error al cargar las patentes:", error));
}

function agregarPatente(patente) {
    fetch("/patentes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ patente: patente })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
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
