const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Ruta para obtener todas las patentes
app.get("/patentes", (req, res) => {
    fs.readFile("patentes.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).send({ message: "Error al leer el archivo de patentes." });
            return;
        }
        const patentes = JSON.parse(data);
        res.json(patentes);
    });
});

// Ruta para agregar una nueva patente
app.post("/patentes", (req, res) => {
    const { patente } = req.body;
    if (!patente) {
        res.status(400).send({ message: "La patente es requerida." });
        return;
    }

    fs.readFile("patentes.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).send({ message: "Error al leer el archivo de patentes." });
            return;
        }
        const patentes = JSON.parse(data);
        patentes.push({ patente: patente, horaIngreso: obtenerHoraActual() });
        fs.writeFile("patentes.json", JSON.stringify(patentes), err => {
            if (err) {
                res.status(500).send({ message: "Error al guardar la patente." });
                return;
            }
            res.json({ message: "Patente agregada exitosamente." });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

function obtenerHoraActual() {
    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, "0");
    const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
    const año = ahora.getFullYear();
    const hora = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes}/${año} ${hora}:${minutos}`;
}
