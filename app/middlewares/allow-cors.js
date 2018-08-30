module.exports = function() {
  /**
   * Will enable CORS
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @param {function} next next step from middleware
   * @returns {void}
   */
  return function(req, res, next) {
    // Allow CORS middleware
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  };
};
