class ApplicationController {
  /**
   * Route Health Check
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {void}
   */
  health(req, res) {
    res.json({ message: 'ok' });
  }
}

module.exports = ApplicationController;
