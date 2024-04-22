// Configura tu Firebase
var firebaseConfig = {
    apiKey: "AIzaSyB0GcnzNEVwUyw3iehrFKWUHGSlY1WdVGc",
    authDomain: "patentesdt.firebaseapp.com",
    projectId: "patentesdt",
    storageBucket: "patentesdt.appspot.com",
    messagingSenderId: "50566108596",
    appId: "1:50566108596:web:01a3c97cf65e56b8ce8ee1",
    measurementId: "G-2SYD0R8EZE"
};
// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const patentesRef = database.ref("patentes");

// Guardar patente
function guardarPatente() {
    const patenteInput = document.getElementById("patenteInput");
    const patente = patenteInput.value.toUpperCase();
    if (patente !== "") {
        patentesRef.push({
            patente: patente,
            estado: "en espera"
        });
        patenteInput.value = "";
    }
}

// Mostrar patentes
patentesRef.on("value", function(snapshot) {
    const patentesList = document.getElementById("patentesList");
    const patentesEsperaList = document.getElementById("patentesEsperaList");
    patentesList.innerHTML = "";
    patentesEsperaList.innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
        const patente = childSnapshot.val().patente;
        const estado = childSnapshot.val().estado;
        const li = document.createElement("li");
        li.textContent = patente;
        if (estado === "en espera") {
            patentesEsperaList.appendChild(li);
        } else {
            patentesList.appendChild(li);
        }
    });
});
