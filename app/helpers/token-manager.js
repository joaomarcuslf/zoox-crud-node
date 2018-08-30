const moment = require('../helpers/time-helper');
const jwt = require('jwt-simple');
const { errors } = require('../constants');

class TokenManager {
  constructor(configs = {}) {
    this.configs = configs;
  }

  /**
   * Will create an jwt for authentication
   * @returns {string} token for auth
   */
  createToken() {
    const now = moment().add(3, 'hours');
    const authObject = {
      expires: now.toISOString(),
    };

    return jwt.encode(authObject, this.configs.secret);
  }

  /**
   * Will check if the token is valid
   * @param {string} token encrypted token
   * @returns {promise} promise to check if token is valid
   */
  validateToken(token) {
    return new Promise((resolve, reject) => {
      if (!token) return reject(errors.NO_TOKEN);

      try {
        const decodedToken = jwt.decode(token, this.configs.secret);
        const isExpired = moment(decodedToken.expires).isBefore(moment());

        if (isExpired) return reject(errors.EXPIRED_TOKEN);

        return resolve();
      } catch (e) {
        return reject(errors.NO_TOKEN);
      }
    });
  }
}

module.exports = TokenManager;
