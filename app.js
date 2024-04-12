const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let songRequests = [];

// Ruta para la página principal de los usuarios
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para recibir solicitudes de canciones (POST)
app.post('/request-song', (req, res) => {
    const songName = req.body.songName;
    songRequests.push(songName);
    console.log("Solicitud de canción recibida:", songName);
    res.json({ message: "Solicitud de canción recibida" });
});

// Ruta para la página del DJ
app.get('/dj', (req, res) => {
    res.sendFile(path.join(__dirname, 'dj.html'));
});

// Ruta para que el DJ obtenga y responda a las solicitudes de canciones (GET)
app.get('/dj-requests', (req, res) => {
    res.json({ requests: songRequests });
});

// Ruta para que el DJ acepte o rechace una solicitud de canción específica (POST)
app.post('/dj-response/:index', (req, res) => {
    const index = req.params.index;
    const response = req.body.response;

    if (response === "accept") {
        console.log("El DJ aceptó la solicitud de canción:", songRequests[index]);
    } else if (response === "reject") {
        console.log("El DJ rechazó la solicitud de canción:", songRequests[index]);
    }

    songRequests.splice(index, 1);

    res.json({ message: "Respuesta del DJ recibida" });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
