const { bindAll } = require('lodash');

const moment = require('../helpers/time-helper');

class ApplicationModel {
  constructor(Model) {
    if (!Model) throw 'Model should be present';

    this._Model = Model;

    // The above methods should be binded to this
    bindAll(this, ['get', 'getById', 'create', 'update', 'delete']);
  }

  /**
   * Will fetch data from the DB
   * @param {object} query query to search data
   * @returns {promise} transaction Promise
   */
  get(query = {}) {
    return this._Model.find(query);
  }

  /**
   * Will fetch data from the DB
   * @param {string} id id from document
   * @returns {promise} transaction Promise
   */
  getById(id) {
    return this._Model.findById(id);
  }

  /**
   * Will save data from the DB
   * @param {object} rawState object from the request
   * @returns {promise} transaction Promise
   */
  create(rawState) {
    const newState = Object.assign({}, rawState, {
      dataDeCriacao: rawState.dataDeCriacao ? rawState.dataDeCriacao : moment().toISOString(),
      dataDeAtualizacao: moment().toISOString(),
    });

    const Model = this._Model;

    const State = new Model(newState);

    return State.save();
  }

  /**
   * Will update data from the DB
   * @param {string} id id from document
   * @param {object} rawState object from the request
   * @returns {promise} transaction Promise
   */
  update(id, rawState) {
    const newState = Object.assign({}, rawState, {
      dataDeAtualizacao: moment().toISOString(),
    });

    return this._Model.findOneAndUpdate({ _id: id }, newState).then(() => this.getById(id));
  }

  /**
   * Will delete data from the DB
   * @param {string} id id from document
   * @returns {promise} transaction Promise
   */
  delete(id) {
    return this._Model.remove({ _id: id });
  }
}

module.exports = ApplicationModel;
