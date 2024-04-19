document.addEventListener("DOMContentLoaded", function() {
    cargarCamiones();
});

function cargarCamiones() {
    // Aquí puedes hacer una solicitud al backend para obtener el estado de los camiones
    // En este ejemplo, vamos a crear algunos camiones de muestra
    const camiones = [
        { patente: "ABC123", serieMIOT: "123456", sensorLevante: "789", estado: "en espera", horaIngreso: "10:00", horaSalida: null },
        { patente: "DEF456", serieMIOT: "789012", sensorLevante: "345", estado: "atendiendo", horaIngreso: "10:30", horaSalida: null },
        { patente: "GHI789", serieMIOT: "345678", sensorLevante: "901", estado: "listo", horaIngreso: "11:00", horaSalida: "12:00" }
    ];

    const camionesContainer = document.getElementById("camiones");
    camiones.forEach(camion => {
        const camionElement = document.createElement("div");
        camionElement.classList.add("camion");
        camionElement.innerHTML = `
            <h2>Camión ${camion.patente}</h2>
            <p><strong>Serie MIOT:</strong> ${camion.serieMIOT}</p>
            <p><strong>Sensor de Levante:</strong> ${camion.sensorLevante}</p>
            <p><strong>Estado:</strong> ${camion.estado}</p>
            <p class="hora"><strong>Hora de Ingreso:</strong> ${camion.horaIngreso}</p>
            <p class="hora"><strong>Hora de Salida:</strong> ${camion.horaSalida ? camion.horaSalida : '---'}</p>
        `;
        camionesContainer.appendChild(camionElement);
    });
}
