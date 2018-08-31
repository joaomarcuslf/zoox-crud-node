const RestController = require('./rest-controller');
const CidadeModel = require('../models/cidade');
class CidadeController extends RestController {
  constructor() {
    super(CidadeModel);
  }
}

module.exports = CidadeController;
