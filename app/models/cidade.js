const ApplicationModel = require('./application-model');

const mongooseConnection = require('../../configs/db');

const CitySchema = require('./schema/cidade');

const CityModel = mongooseConnection.model('Cidade', CitySchema);

class Cidade extends ApplicationModel {
  constructor() {
    super(CityModel);
  }
}

module.exports = Cidade;
