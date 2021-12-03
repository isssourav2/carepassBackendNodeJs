const connection = require('../Connection/connect');

var SqlQuery = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

// var InsertQuery = (sql, data) => {
//   return new Promise((resolve, reject) => {
//     connection.query(sql, data, (err, rows) => {
//       if (err) {
//         reject(err);
//       }
//       resolve({ sucess: true, message: 'record insert sucessfully' });
//     });
//   });
// };
var BulkInsertQuery = (sql, data) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, [data], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

let Get = (sql) => {
  return SqlQuery(sql);
};
let Delete = (sql) => {
  return SqlQuery(sql);
};
//single data
let Insert = (sql) => {
  console.log('Insert data', sql);
  return SqlQuery(sql);
};

//multiple bulk data
let bulkInsert = (sql, data) => {
  console.log('body data:', data);
  return BulkInsertQuery(sql, data);
};
let Update = (sql) => {
  return SqlQuery(sql);
};

let convertMysqlFromJson = (arr) => {
  console.log('convertMysqlFromJson', arr);
  let arrayOfObject = [];
  arr.map((mp) => {
    let arrentry = [];
    for (const [key, value] of Object.entries(mp)) {
      arrentry.push(value);
    }
    console.log('data', arrentry);
    arrayOfObject.push(arrentry);
  });
  return arrayOfObject;
};

module.exports = {
  Get,
  Delete,
  Insert,
  Update,
  bulkInsert,
  convertMysqlFromJson,
};
