const mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  multipleStatements: true,
  database: "postit"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado!");
});


module.exports = con