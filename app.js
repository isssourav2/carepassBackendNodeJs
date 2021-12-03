const path = require('path');
var express = require('express');
const mysql = require('mysql');

let userController = require('./Controller/userController')();

const connection = require('./Connection/connect');
var app = express();
var port = process.env.port || 8080;
const cors = require('cors');
app.use(cors());
bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect((err) => {
  if (err) throw err;
  console.log('estasblished connection');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/User', userController);

// Get('SELECT * FROM `tbl_users').then((result) => {
//   console.log('data', result);
// });
app.listen(port, function () {
  var datetime = new Date();
  var message =
    'Server runnning on Port:- ' + port + 'Started at :- ' + datetime;
  console.log(message);
});
