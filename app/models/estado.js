const ApplicationModel = require('./application-model');

const mongooseConnection = require('../../configs/db');

const StateSchema = require('./schema/estado');

const StateModel = mongooseConnection.model('Estado', StateSchema);

class Estado extends ApplicationModel {
  constructor() {
    super(StateModel);
  }
}

module.exports = Estado;
