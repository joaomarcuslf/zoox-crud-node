const { errors } = require('../constants');

module.exports = function() {
  const { NOT_FOUND } = errors;
  return (req, res) => {
    res.status(NOT_FOUND.status).send({
      error: NOT_FOUND.error,
      message: NOT_FOUND.message,
    });
  };
};
