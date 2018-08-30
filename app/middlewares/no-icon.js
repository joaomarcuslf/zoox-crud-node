module.exports = function() {
  /**
   * Will prevent 404 from favicon.ico
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @param {function} next next step from middleware
   * @returns {void}
   */
  return function(req, res, next) {
    if (req.url === '/favicon.ico') {
      // No favicon middleware
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });

      res.end('');
    } else {
      next();
    }
  };
};
