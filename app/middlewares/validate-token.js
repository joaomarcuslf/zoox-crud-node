const TokenManager = require('../helpers/token-manager');

const configs = require('../../configs');

module.exports = function() {
  /**
   * Will validate if user has token on header and if he can proceed
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @param {function} next next step from middleware
   * @returns {void}
   */
  return function(req, res, next) {
    const token = req.headers['x-api-key'];
    const Manager = new TokenManager(configs);

    return Manager.validateToken(token)
      .then(next)
      .catch(error => {
        res.status(error.status).send({
          error: error.error,
          message: error.message,
        });
      });
  };
};
