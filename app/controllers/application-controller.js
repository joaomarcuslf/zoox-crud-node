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

  /**
   * Route Health Check
   * @param {object} res response object from express
   * @param {object} errorObj error object to be formated
   * @param {object} opts error object to be formated
   * @returns {void}
   */
  sendError(res, errorObj, opts = {}) {
    res.cacheControl = { noCache: true };

    return res.status(errorObj.status).json(
      Object.assign(
        {},
        {
          error: errorObj.error,
          message: errorObj.message,
        },
        opts
      )
    );
  }
}

module.exports = ApplicationController;
