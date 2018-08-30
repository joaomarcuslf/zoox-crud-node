const moment = require('../helpers/time-helper');
const jwt = require('jwt-simple');

const configs = require('../../configs');
const { errors } = require('../constants');

module.exports = function() {
  return function(req, res, next) {
    const token = req.headers['X-Api-Key'];

    if (!token) {
      res.status(errors.INVALID_TOKEN.status).send({
        error: errors.INVALID_TOKEN.error,
        message: errors.INVALID_TOKEN.message,
      });
      return;
    } else {
      try {
        const decodedToken = jwt.encode(token, configs.secret);
        const isExpired = moment(decodedToken.expires).isBefore(moment());

        if (isExpired) {
          res.status(errors.EXPIRED_TOKEN.status).send({
            error: errors.EXPIRED_TOKEN.error,
            message: errors.EXPIRED_TOKEN.message,
          });
          return;
        } else {
          res.auth = {
            valid: true,
            token,
          };

          return next();
        }
      } catch (err) {
        res.status(errors.NO_TOKEN.status).send({
          error: errors.NO_TOKEN.error,
          message: errors.NO_TOKEN.message,
        });
      }
    }
  };
};
