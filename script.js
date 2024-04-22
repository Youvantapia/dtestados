// Datos simulados
let patentes = [];

// Función para guardar patente
function guardarPatente() {
    const patenteInput = document.getElementById("patenteInput");
    const patente = patenteInput.value.toUpperCase();
    if (patente !== "") {
        patentes.push({
            patente: patente,
            estado: "en espera"
        });
        patenteInput.value = "";
        actualizarPatentes();
    }
}

// Función para actualizar las patentes
function actualizarPatentes() {
    const patentesList = document.getElementById("patentesList");
    const patentesEsperaList = document.getElementById("patentesEsperaList");
    patentesList.innerHTML = "";
    patentesEsperaList.innerHTML = "";
    patentes.forEach(function(patente) {
        const li = document.createElement("li");
        li.textContent = patente.patente;
        if (patente.estado === "en espera") {
            patentesEsperaList.appendChild(li);
        } else {
            patentesList.appendChild(li);
        }
    });
}

// Llamar a la función de actualización al cargar
actualizarPatentes();
