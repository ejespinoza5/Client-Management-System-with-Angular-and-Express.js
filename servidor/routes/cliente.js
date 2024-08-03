//archivo que manejara los web services para realizar las operaciones crud a la tabla cliente de la base de datos

const express = require('express');
const router = express.Router();
var getConnection = require('../conexion');

//consultar cliente por cedula
router.get('/cliente/:cedula', (req, res) => {
    const cedula = req.params.cedula;
    getConnection(function (err, conn) {
        const {cedula} = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM cliente WHERE cedulacliente = ?', [cedula], (err, rows) => {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede obtener los datos de la tabla');
            }
            res.send(rows);
            conn.release();
        });
    });
});



// insertar cliente
/*router.post('/cliente/', (req, res, next) => {
    const data = {
        nombrecliente: req.body.nombrecliente,
        cedulacliente: req.body.cedulacliente,
        telefonocliente: req.body.telefonocliente,
        direccioncliente: req.body.direccioncliente,
        correocliente: req.body.correocliente,
    }
const query = "INSERT INTO cliente (nombrecliente, cedulacliente, telefonocliente, " +
    "direccioncliente, correocliente) VALUES ('" +
    data.nombrecliente + "','" + data.cedulacliente + "','" + data.telefonocliente + "','" +
    data.direccioncliente + "','" + data.correocliente + "')";
    getConnection(function(err, connection){
        if (err){
            return res.sendStatus(400,"No se pude conectar  la base datos", err);
        }
        connection.query(query, function(err,rows){
            if (err){
                connection.release();
                return res.sendStatus(400," No se puede obtener los datos de la tabla");
            }else{

                connection.release();
                res.json({status:'registro exitoso!'});
            }
        });
    });
});*/

// insertar cliente
router.post('/cliente/', (req, res, next) => {
    const data = {
        nombrecliente: req.body.nombrecliente,
        cedulacliente: req.body.cedulacliente,
        telefonocliente: req.body.telefonocliente,
        direccioncliente: req.body.direccioncliente,
        correocliente: req.body.correocliente,
    }

    // Validación de los datos
    if (!data.nombrecliente || typeof data.nombrecliente !== 'string' || data.nombrecliente.length > 50) {
        console.log('El campo nombre debe ser una cadena de texto con una longitud máxima de 50 caracteres');
        return res.status(400).send({error: 'Nombre inválido'});
    }
    if (!data.cedulacliente || typeof data.cedulacliente !== 'string' || data.cedulacliente.length != 10) {
        console.log('El campo cédula debe ser una cadena de texto con longitud 10 caracteres');
        return res.status(400).send({error: 'Cédula inválida'});
    }
    if (!data.telefonocliente || typeof data.telefonocliente !== 'string' || data.telefonocliente.length != 10) {
        console.log('El campo teléfono debe ser una cadena de texto con longitud 10 caracteres');
        return res.status(400).send({error: 'Teléfono inválido'});
    }
    if (!data.direccioncliente || typeof data.direccioncliente !== 'string' || data.direccioncliente.length > 100) {
        console.log('El campo dirección debe ser una cadena de texto con una longitud máxima de 100 caracteres');
        return res.status(400).send({error: 'Dirección inválida'});
    }
    if (!data.correocliente || typeof data.correocliente !== 'string' || !data.correocliente.includes('@')) {
        console.log('El campo correo debe ser una cadena de texto que incluya el carácter "@"');
        return res.status(400).send({error: 'Correo inválido'});
    }

    const query = "INSERT INTO cliente (nombrecliente, cedulacliente, telefonocliente, direccioncliente, correocliente) VALUES (\'" +
        data.nombrecliente + "\',\'" + data.cedulacliente + "\',\'" + data.telefonocliente + "\',\'" +
        data.direccioncliente + "\',\'" + data.correocliente + "\')";

    getConnection(function (err, connection) {
        if (err) {
            return res.sendStatus(400, "No se pude conectar  la base datos", err);
        }
        connection.query(query, function (err, rows) {
            if (err) {
                connection.release();
                return res.sendStatus(400, " No se puede obtener los datos de la tabla");
            } else {
                connection.release();
                res.json({status: 'registro exitoso!'});
            }
        });
    });
});

//listar todos los clientes
router.get('/cliente/', (req, res) => {
    getConnection(function (err, conn) {
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM cliente', (err, rows) => {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede obtener los datos de la tabla');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//eliminar cliente por id
router.delete('/cliente/:id', (req, res) => {
    getConnection(function (err, conn) {
        const {id} = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('DELETE FROM cliente WHERE idcliente = ?', [id], (err, rows) => {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede eliminar el registro');
            }
            res.send(rows);
            conn.release();
        });
    });
});




//consultar cliente por idcliente
router.get('/cliente_id/:idcliente', (req, res) => {
    const idcliente = req.params.idcliente;
    getConnection(function (err, conn) {
        const {idcliente} = req.params;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM cliente WHERE idcliente = ?', [idcliente], (err, rows) => {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede obtener los datos de la tabla');
            }
            res.send(rows);
            conn.release();
        });
    });
});

//editar cliente por id
router.put('/clienteeditar/:id', (req, res) => {
    getConnection(function (err, conn) {
        const {id} = req.params;
        const {nombrecliente, cedulacliente, telefonocliente, direccioncliente, correocliente} = req.body;
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('UPDATE cliente SET nombrecliente = ?, cedulacliente = ?, telefonocliente = ?, ' +
            'direccioncliente = ?, correocliente = ? WHERE idcliente = ?', [nombrecliente, cedulacliente,
            telefonocliente, direccioncliente, correocliente, id],
            (err, rows) => {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede actualizar el registro');
            }
            res.send(rows);
            conn.release();
        });
    });
});

module.exports = router;