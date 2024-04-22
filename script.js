// Configura tu Firebase
var firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    measurementId: "TU_MEASUREMENT_ID"
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
