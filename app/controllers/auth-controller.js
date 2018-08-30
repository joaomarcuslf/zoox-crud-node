const moment = require('../helpers/time-helper');
const jwt = require('jwt-simple');

const ApplicationController = require('./application-controller');
const configs = require('../../configs');

class AuthController extends ApplicationController {
  constructor(props) {
    super(props);

    this.secret = configs.secret;
  }

  getToken(req, res) {
    const now = moment().add(3, 'hours');
    const authObject = {
      expires: now.toISOString(),
    };

    const token = jwt.encode(authObject, configs.secret);

    res.json({ token: token });
  }
}

module.exports = AuthController;
