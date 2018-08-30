const { errors } = require('../constants');

module.exports = function() {
  const { NOT_FOUND } = errors;
  /**
   * Will answer NOT_FOUND for the resource
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {void}
   */
  return (req, res) => {
    res.status(NOT_FOUND.status).send({
      error: NOT_FOUND.error,
      message: NOT_FOUND.message,
    });
  };
};
