document.addEventListener("DOMContentLoaded", function() {
    cargarCamiones();

    const formAgregarCamion = document.getElementById("formAgregarCamion");
    formAgregarCamion.addEventListener("submit", function(event) {
        event.preventDefault();
        const patente = document.getElementById("patente").value;
        const serieMIOT = document.getElementById("serieMIOT").value;
        const sensorLevante = document.getElementById("sensorLevante").value;
        agregarCamion(patente, serieMIOT, sensorLevante);
        formAgregarCamion.reset();
    });
});

function cargarCamiones() {
    // Código para cargar los camiones desde el backend o generarlos localmente
    // Se mantiene igual como en el ejemplo anterior
}

function agregarCamion(patente, serieMIOT, sensorLevante) {
    // Aquí puedes enviar los datos del camión al backend para agregarlo a la base de datos
    // O puedes agregarlo localmente si prefieres manejar los datos del lado del cliente
    const nuevoCamion = { patente: patente, serieMIOT: serieMIOT, sensorLevante: sensorLevante, estado: "en espera", horaIngreso: obtenerHoraActual(), horaSalida: null };

    // Crear elemento de camión y añadirlo a la lista
    const camionesContainer = document.getElementById("camiones");
    const camionElement = document.createElement("div");
    camionElement.classList.add("camion");
    camionElement.innerHTML = `
        <h2>Camión ${nuevoCamion.patente}</h2>
        <p><strong>Serie MIOT:</strong> ${nuevoCamion.serieMIOT}</p>
        <p><strong>Sensor de Levante:</strong> ${nuevoCamion.sensorLevante}</p>
        <p><strong>Estado:</strong> ${nuevoCamion.estado}</p>
        <p class="hora"><strong>Hora de Ingreso:</strong> ${nuevoCamion.horaIngreso}</p>
        <p class="hora"><strong>Hora de Salida:</strong> ${nuevoCamion.horaSalida ? nuevoCamion.horaSalida : '---'}</p>
        <button onclick="atenderCamion('${nuevoCamion.patente}')">Atender Camión</button>
    `;
    camionesContainer.appendChild(camionElement);
}

function obtenerHoraActual() {
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    return `${hora}:${minutos}`;
}

function atenderCamion(patente) {
    // Aquí puedes enviar una solicitud al backend para cambiar el estado del camión a "atendiendo"
    // O puedes actualizar el estado del camión localmente si prefieres manejar los datos del lado del cliente
    const camionElement = document.querySelector(`.camion h2:contains(${patente})`).parentNode;
    const estadoElement = camionElement.querySelector("p:nth-of-type(3)");
    estadoElement.textContent = "atendiendo";
}
