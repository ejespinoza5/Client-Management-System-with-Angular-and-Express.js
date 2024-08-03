
let app = require('express')();
const http = require('node:http').Server(app);
const express = require('express');

//const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json());

//cabeceras de CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Permite cualquier origen
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Permite los métodos HTTP necesarios
  res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept"
  ); // Permite los encabezados necesarios

  // Maneja las solicitudes de preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});
//rutas
app.use(require('./routes/cliente'));


http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

/*server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}/`);
});*/

