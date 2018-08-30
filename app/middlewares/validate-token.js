const moment = require('../helpers/time-helper');
const jwt = require('jwt-simple');

const configs = require('../../configs');
const { errors } = require('../constants');

module.exports = function() {
  /**
   * Will validate if user has token on header and if he can proceed
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @param {function} next next step from middleware
   * @returns {void}
   */
  return function(req, res, next) {
    const token = req.headers['X-Api-Key'];

    return validateToken(token)
      .then(next)
      .catch(error => {
        res.status(error.status).send({
          error: error.error,
          message: error.message,
        });
      });
  };
};

const validateToken = token => {
  return new Promise((resolve, reject) => {
    if (!token) return reject(errors.NO_TOKEN);

    try {
      const decodedToken = jwt.encode(token, configs.secret);
      const isExpired = moment(decodedToken.expires).isBefore(moment());

      if (isExpired) return reject(errors.EXPIRED_TOKEN);

      return resolve();
    } catch (e) {
      return reject(errors.NO_TOKEN);
    }
  });
};
