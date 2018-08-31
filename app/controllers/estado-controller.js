const RestController = require('./rest-controller');
const EstadoModel = require('../models/estado');
class EstadoController extends RestController {
  constructor() {
    super(EstadoModel);
  }
}

module.exports = EstadoController;
