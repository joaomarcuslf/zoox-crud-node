const mongooseConnection = require('../../configs/db');

const moment = require('../helpers/time-helper');

const StateSchema = require('./schema/estado');

const StateModel = mongooseConnection.model('Estado', StateSchema);

class Estado {
  constructor() {}

  get(query = {}) {
    return StateModel.find(query);
  }

  getById(id) {
    return StateModel.findById(id);
  }

  create(rawState) {
    const newState = Object.assign({}, rawState, {
      dataDeCriacao: rawState.dataDeCriacao ? rawState.dataDeCriacao : moment().toISOString(),
      dataDeAtualizacao: moment().toISOString(),
    });

    const State = new StateModel(newState);

    return State.save();
  }

  update(id, rawState) {
    const newState = Object.assign({}, rawState, {
      dataDeAtualizacao: moment().toISOString(),
    });

    return StateModel.findOneAndUpdate({ _id: id }, newState);
  }

  delete(id) {
    return StateModel.remove({ _id: id });
  }
}

module.exports = Estado;
