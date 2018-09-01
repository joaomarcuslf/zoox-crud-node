const TokenManager = require('../helpers/token-manager');

const ApplicationController = require('./application-controller');
const configs = require('../../configs');

class AuthController extends ApplicationController {
  constructor(props) {
    super(props);
  }

  /**
   * Will create an jwt for authentication
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {void}
   */
  getToken(req, res) {
    const Manager = new TokenManager(configs);

    const token = Manager.createToken();

    res.cacheControl = { private: true, maxAge: 1800 };

    res.json({ token: token });
  }
}

module.exports = AuthController;
