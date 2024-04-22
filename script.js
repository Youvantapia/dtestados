let camiones = [];
let camionesEnRevision = [];
let camionesFinalizados = [];

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
    // Puedes cargar los camiones desde un almacenamiento local, base de datos o cualquier otro lugar

    // Ejemplo de camiones precargados
    agregarCamion("ABC123", "123456", "A1");
    agregarCamion("DEF456", "789012", "B2");
}

function agregarCamion(patente, serieMIOT, sensorLevante) {
    const nuevoCamion = { 
        patente: patente, 
        serieMIOT: serieMIOT, 
        sensorLevante: sensorLevante, 
        estado: "en espera", 
        horaIngreso: obtenerHoraActual(), 
        horaRevision: null,
        horaFinalizado: null
    };

    camiones.push(nuevoCamion);
    mostrarCamion(nuevoCamion);
}

function obtenerHoraActual() {
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    const dia = ahora.getDate().toString().padStart(2, "0");
    const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
    const año = ahora.getFullYear();
    return `${dia}/${mes}/${año} ${hora}:${minutos}`;
}

function mostrarCamion(camion) {
    const camionesContainer = document.getElementById("camiones");
    const camionElement = document.createElement("div");
    camionElement.classList.add("camion");
    camionElement.innerHTML = `
        <h2>Camión ${camion.patente}</h2>
        <p><strong>Serie MIOT:</strong> ${camion.serieMIOT}</p>
        <p><strong>Número de Chip:</strong> ${camion.sensorLevante}</p>
        <p class="estado"><strong>Estado:</strong> ${camion.estado}</p>
        <p class="hora"><strong>Hora de Ingreso:</strong> ${camion.horaIngreso}</p>
        <button onclick="cambiarEstadoRevision('${camion.patente}')">Cambiar a Revisión</button>
    `;
    camionesContainer.appendChild(camionElement);
}

function cambiarEstadoRevision(patente) {
    const camion = camiones.find(c => c.patente === patente);
    if (camion) {
        camion.estado = "en revisión";
        camion.horaRevision = obtenerHoraActual();
        const camionElement = document.querySelector(`.camion h2:contains(${patente})`).parentNode;
        const estadoElement = camionElement.querySelector(".estado");
        const horaElement = camionElement.querySelector(".hora");
        estadoElement.textContent = "en revisión";
        horaElement.innerHTML = `<strong>Hora de Revisión:</strong> ${camion.horaRevision}`;
        camionesEnRevision.push(camiones.splice(camiones.indexOf(camion), 1)[0]);
        actualizarCamiones();
    }
}

function cambiarEstadoFinalizado(patente) {
    const camion = camionesEnRevision.find(c => c.patente === patente);
    if (camion) {
        camion.estado = "finalizado";
        camion.horaFinalizado = obtenerHoraActual();
        const camionElement = document.querySelector(`.camion h2:contains(${patente})`).parentNode;
        const estadoElement = camionElement.querySelector(".estado");
        const horaElement = camionElement.querySelector(".hora");
        estadoElement.textContent = "finalizado";
        horaElement.innerHTML = `<strong>Hora de Finalizado:</strong> ${camion.horaFinalizado}`;
        camionesFinalizados.push(camionesEnRevision.splice(camionesEnRevision.indexOf(camion), 1)[0]);
        actualizarCamiones();
    }
}

function verCamionesEspera() {
    mostrarCamiones(camiones);
}

function verCamionesRevision() {
    mostrarCamiones(camionesEnRevision);
}

function verCamionesFinalizados() {
    mostrarCamiones(camionesFinalizados);
}

function mostrarCamiones(camionesMostrar) {
    const camionesContainer = document.getElementById("camiones");
    camionesContainer.innerHTML = "";

    camionesMostrar.forEach(camion => {
        const camionElement = document.createElement("div");
        camionElement.classList.add("camion");
        camionElement.innerHTML = `
            <h2>Camión ${camion.patente}</h2>
            <p><strong>Serie MIOT:</strong> ${camion.serieMIOT}</p>
            <p><strong>Número de Chip:</strong> ${camion.sensorLevante}</p>
            <p class="estado"><strong>Estado:</strong> ${camion.estado}</p>
            <p class="hora"><strong>Hora de Ingreso:</strong> ${camion.horaIngreso}</p>
            ${camion.horaRevision ? `<p class="hora"><strong>Hora de Revisión:</strong> ${camion.horaRevision}</p>` : ''}
            ${camion.horaFinalizado ? `<p class="hora"><strong>Hora de Finalizado:</strong> ${camion.horaFinalizado}</p>` : ''}
            ${camion.estado === 'en espera' ? `<button onclick="cambiarEstadoRevision('${camion.patente}')">Cambiar a Revisión</button>` : ''}
            ${camion.estado === 'en revisión' ? `<button onclick="cambiarEstadoFinalizado('${camion.patente}')">Finalizar</button>` : ''}
        `;
        camionesContainer.appendChild(camionElement);
    });
}

function actualizarCamiones() {
    verCamionesEspera();
    verCamionesRevision();
    verCamionesFinalizados();
}
