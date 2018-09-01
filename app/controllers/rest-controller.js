const { bindAll, get } = require('lodash');

const ApplicationController = require('./application-controller');

const { errors } = require('../constants');

class RestController extends ApplicationController {
  constructor(Model) {
    super();

    if (!Model) throw 'Model should be present';

    this._Model = new Model();

    // The above methods should be binded to this
    bindAll(this, [
      'getAll',
      'getById',
      'add',
      'update',
      'delete',
      'search',
      '_search',
      '_parseQuery',
      '_getAggregationFilters',
      '_getFullAggregation',
    ]);
  }

  /**
   * Will get all {entity} data
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  getAll(req, res) {
    const Model = this._Model;

    return Model.get()
      .then(data => res.json(data))
      .catch((err = {}) => {
        const { GENERIC_ERROR } = errors;

        return this.sendError(res, GENERIC_ERROR, { serverMessage: err });
      });
  }

  /**
   * Will get all {entity} data by some query
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  getById(req, res) {
    const Model = this._Model;

    const query = req.params.id || {};

    return Model.getById(query)
      .then(data => res.json(data))
      .catch((err = {}) => {
        const { GENERIC_ERROR } = errors;

        return this.sendError(res, GENERIC_ERROR, { serverMessage: err });
      });
  }

  /**
   * Will add the {entity} to the DB
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  add(req, res) {
    const Model = this._Model;

    const body = req.body || {};

    return Model.create(body)
      .then(data => res.json(data))
      .catch((err = {}) => {
        const { INVALID_FIELDS, GENERIC_ERROR } = errors;

        switch (err.name) {
          case 'ValidationError':
            return this.sendError(res, INVALID_FIELDS, { invalidFields: Object.keys(err.errors) });
          case 'MongoError':
            return this.sendError(res, INVALID_FIELDS, { errorMessage: err });
          default:
            return this.sendError(res, GENERIC_ERROR, { serverMessage: err });
        }
      });
  }

  /**
   * Will update the {entity} to the DB
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  update(req, res) {
    const Model = this._Model;

    const id = req.params.id;
    const body = req.body || {};

    return Model.update(id, body)
      .then(data => res.json(data))
      .catch((err = {}) => {
        const { GENERIC_ERROR } = errors;

        return this.sendError(res, GENERIC_ERROR, { serverMessage: err });
      });
  }

  /**
   * Will update the {entity} to the DB
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  delete(req, res) {
    const Model = this._Model;

    const id = req.params.id;

    return Model.delete(id)
      .then(data => res.json(data))
      .catch((err = {}) => {
        const { GENERIC_ERROR } = errors;

        return this.sendError(res, GENERIC_ERROR, { serverMessage: err });
      });
  }

  /**
   * Search Methods
   */

  /**
   * Will get the data from entity with query
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  search(req, res) {
    return this._search(req.query)
      .then(data => {
        return res.json(data);
      })
      .catch((err = '') => {
        const { EMPTY_SEARCH, GENERIC_ERROR, INVALID_QUERY, SERVER_ERROR } = errors;

        switch (err) {
          case 'NoContent':
            return this.sendError(res, EMPTY_SEARCH, { total: 0 });
          case 'InvalidQuery':
            return this.sendError(res, INVALID_QUERY, { total: 0 });
          case 'ServerError':
            return this.sendError(res, SERVER_ERROR);
          default:
            return this.sendError(res, GENERIC_ERROR, { serverMessage: err });
        }
      });
  }

  /**
   * Will make the search with safe treatment
   * @param {object} requestQuery query from the user
   * @returns {promise} request data
   */
  _search(requestQuery = {}) {
    return new Promise((resolve, reject) => {
      try {
        const Model = this._Model;

        const query = this._parseQuery(requestQuery.filter);

        const userQuery = this._getAggregationFilters(query);

        return Model.get(userQuery)
          .then((data = []) => {
            let searchObject = {
              total: data.length,
              content: [],
              selectedFilters: query,
              aggregations: {},
            };

            if (!(requestQuery.aggregations === 'false')) searchObject['aggregations'] = this._getFullAggregation(data);

            if (!(requestQuery.content === 'false')) searchObject['content'] = data.map(data => data.toJSON());

            return searchObject;
          })
          .then(resolve)
          .catch(reject);
      } catch (exception) {
        return reject(exception);
      }
    });
  }

  /**
   * Will parse the query with safe treatment
   * @param {array} rawQuery query from the user
   * @returns {array} parsed query
   */
  _parseQuery(rawQuery = []) {
    const query = typeof rawQuery === 'string' ? [rawQuery] : rawQuery;

    return query.map(query => {
      try {
        return JSON.parse(query);
      } catch (exception) {
        console.log(exception);
        throw 'InvalidQuery';
      }
    });
  }

  /**
   * Will format the aggregation to MongoDB query
   * @param {array} query query from the user
   * @returns {object} parsed query
   */
  _getAggregationFilters(query = []) {
    return query.reduce((acc, nxt) => {
      try {
        const { type, value } = nxt;

        if (!type || !value) throw 'Invalid Query';

        return Object.assign({}, acc, {
          [type]: value,
        });
      } catch (exception) {
        console.log(exception);
        throw 'InvalidQuery';
      }
    }, {});
  }

  /**
   * Will get all options from MongoDB object
   * @param {array} data data from mongoDB
   * @returns {object} full aggregation
   */
  _getFullAggregation(data = []) {
    return data.reduce((acc, nxt = {}) => {
      try {
        const item = nxt.toJSON();
        const keys = Object.keys(item).filter(key => key !== '__v');

        const newAcc = acc;

        keys.forEach(key => {
          const oldFilters = get(acc, [key], []);

          newAcc[key] = oldFilters.concat({ type: key, value: item[key] });
        });

        return newAcc;
      } catch (exception) {
        console.log(exception);
        throw 'ServerError';
      }
    }, {});
  }
}

module.exports = RestController;
