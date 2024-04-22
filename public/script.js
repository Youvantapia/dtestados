// Datos simulados
let patentes = [];

// Cargar las patentes guardadas
fetch('data/patentes.json')
  .then(response => response.json())
  .then(data => {
    patentes = data;
    actualizarPatentes();
  });

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
        guardarPatentesEnArchivo();
        actualizarPatentes();
    }
}

// Función para guardar las patentes en el archivo
function guardarPatentesEnArchivo() {
    const data = JSON.stringify(patentes);
    fetch('data/patentes.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
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
