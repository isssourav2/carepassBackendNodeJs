var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: '116.203.55.128',
//   user: 'abhilash',
//   password: 'Bengaluru@54321',
//   database: 'dbrait_campus_db',
// });
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student_db',
  connectionLimit: 10,
  port: 3306,
});
module.exports = connection;
