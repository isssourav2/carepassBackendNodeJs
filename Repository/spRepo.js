const connection = require('../Connection/connect');

let ExecuteWithNoParameter = (spName) => {
  return new Promise((resolve, reject) => {
    connection.query(spName, '', (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};
var executeById = (spName, parameter) => {
  return new Promise((resolve, reject) => {
    console.log('Executing value', parameter);
    connection.query(spName, [...parameter], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};
module.exports = { ExecuteWithNoParameter, executeById };
