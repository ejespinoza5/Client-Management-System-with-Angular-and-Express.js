 var mysql = require('mysql2');
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "factura"
});

var getConnection = function (cb) {
  pool.getConnection(function (err, connection) {
    if (err) {
      return cb(err);
    }
    cb(null, connection);
  });
}

module.exports = getConnection;