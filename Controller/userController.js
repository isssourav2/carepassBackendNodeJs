var express = require('express');
var router = express.Router();

const {
  Get,
  Delete,
  Insert,
  Update,
  bulkInsert,
  convertMysqlFromJson,
} = require('../Repository/repo');

const { executeUserAll, executeUserById } = require('../Services/userService');
var routes = function () {
  //GetAll
  router.route('/GetAll').get((req, res) => {
    Get('SELECT * FROM users').then((result) => {
      res.json(result);
    });
  });
  //Delete
  router.route('/Delete/:Id').delete((req, res) => {
    var _userId = req.params.Id;
    Delete(`DELETE FROM users WHERE users.Id = ${_userId}`).then((result) => {
      res.json({ Success: true });
    });
  });
  //Insert
  router.route('/Insert').post((req, res) => {
    const { userName, password, Email, phone } = req.body;
    // const body = [userName, password, Email, phone];
    // bulkInsert(
    //   'INSERT INTO users (userName, password, Email, phone) VALUES ?',
    //   [body]
    // ).then((result) => {
    //   res.json({ result });
    // });
    Insert(`INSERT INTO users (userName, password, Email, phone) VALUES 
    ('${userName}','${password}','${Email}','${phone}')`).then((result) => {
      if (result.affectedRows) {
        res.json({
          sucess: true,
          message: 'record insert sucessfully',
          lastId: result.insertId,
        });
      }
    });
  });
  //GetById
  router.route('/GetById/:Id').get((req, res) => {
    var _userId = req.params.Id;
    Get(`SELECT * FROM users where users.id=${_userId}`).then((result) => {
      res.json(result);
    });
  });
  //Update
  router.route('/Update/:Id').put((req, res) => {
    var _userId = req.params.Id;
    const { userName, password, Email, phone } = req.body;

    Update(`UPDATE users SET userName='${userName}', password='${password}',
     Email='${Email}', phone='${phone}'  where users.id=${_userId}`).then(
      (result) => {
        res.json({
          sucess: true,
          message: 'record update sucessfully',
        });
      }
    );
  });
  //bulk data saved
  router.route('/BulkInsert').post((req, res) => {
    let data = convertMysqlFromJson(req.body);
    console.log('Final data', data);
    bulkInsert(
      'INSERT INTO users (userName, password, Email, phone) VALUES ?',
      data
    ).then((result) => {
      res.json({
        sucess: true,
        message: 'Bulk data insert sucessfully',
        result: result,
      });
    });
  });
  //call from sp
  router.route('/SpExecute').get((req, res) => {
    executeUserAll().then((result) => {
      res.json(result[0]);
    });
  });
  //executeById
  router.route('/SpExecuteToById/:Id').get((req, res) => {
    var _userId = req.params.Id;
    console.log('data', [parseInt(_userId)]);
    executeUserById([parseInt(_userId)]).then((result) => {
      res.json(result[0]);
    });
  });
  return router;
};

module.exports = routes;
