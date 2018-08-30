class ApplicationController {
  health(req, res) {
    res.json({ message: 'ok' });
  }
}

module.exports = ApplicationController;
