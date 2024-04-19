document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTruck() {
    const truckId = Date.now(); // Generar un ID único para el camión
    const truckHtml = `
        <div class="task" id="task${truckId}">
            <h3>Camión ${truckId}</h3>
            <button onclick="moveToAttending(${truckId})">Atendiendo Camión</button>
            <button onclick="moveToReady(${truckId})">Camión Listo de Alta</button>
        </div>`;
    document.getElementById("waitingList").insertAdjacentHTML("beforeend", truckHtml);
    // Guardar el nuevo camión en el almacenamiento local
    localStorage.setItem(`task${truckId}`, "waiting");
}

function moveToAttending(truckId) {
    console.log(`Camión ${truckId} movido a estado 'Atendiendo'`);
    document.getElementById(`task${truckId}`).classList.remove("ready");
    document.getElementById(`task${truckId}`).classList.add("attending");
    document.getElementById("attendingList").appendChild(document.getElementById(`task${truckId}`));
    // Actualizar el estado en el almacenamiento local
    localStorage.setItem(`task${truckId}`, "attending");
}

function moveToReady(truckId) {
    console.log(`Camión ${truckId} movido a estado 'Listo de Alta'`);
    document.getElementById(`task${truckId}`).classList.remove("attending");
    document.getElementById(`task${truckId}`).classList.add("ready");
    // Actualizar el estado en el almacenamiento local
    localStorage.setItem(`task${truckId}`, "ready");
}

function loadTasks() {
    // Recorrer todos los elementos almacenados y cargar los camiones
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("task")) {
            const truckId = key.replace("task", "");
            const truckState = localStorage.getItem(key);
            const truckHtml = `
                <div class="task" id="${key}">
                    <h3>Camión ${truckId}</h3>
                    <button onclick="moveToAttending(${truckId})">Atendiendo Camión</button>
                    <button onclick="moveToReady(${truckId})">Camión Listo de Alta</button>
                </div>`;
            if (truckState === "waiting") {
                document.getElementById("waitingList").insertAdjacentHTML("beforeend", truckHtml);
            } else if (truckState === "attending") {
                document.getElementById("attendingList").insertAdjacentHTML("beforeend", truckHtml);
                document.getElementById(key).classList.add("attending");
            } else if (truckState === "ready") {
                document.getElementById("attendingList").insertAdjacentHTML("beforeend", truckHtml);
                document.getElementById(key).classList.add("ready");
            }
        }
    }
}
