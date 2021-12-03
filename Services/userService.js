const { ExecuteWithNoParameter, executeById } = require('../Repository/spRepo');

var executeUserAll = () => {
  return ExecuteWithNoParameter('call select_Users()');
};

var executeUserById = (parameter) => {
  return executeById('call SelectUserById(?)', parameter);
};

module.exports = {
  executeUserAll,
  executeUserById,
};
