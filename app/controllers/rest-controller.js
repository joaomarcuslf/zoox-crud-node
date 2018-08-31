const { bindAll } = require('lodash');

const ApplicationController = require('./application-controller');

const { errors } = require('../constants');

class RestController extends ApplicationController {
  constructor(Model) {
    super();

    if (!Model) throw 'Model should be present';

    this._Model = new Model();

    // The above methods should be binded to this
    bindAll(this, ['getAll', 'getById', 'add', 'update', 'delete']);
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
        const { INVALID_FIELDS, GENERIC_ERROR } = errors;

        res.status(INVALID_FIELDS.status).json({
          error: GENERIC_ERROR.error,
          message: err,
        });
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
        const { INVALID_FIELDS, GENERIC_ERROR } = errors;

        res.status(INVALID_FIELDS.status).json({
          error: GENERIC_ERROR.error,
          message: err,
        });
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
            return res.status(INVALID_FIELDS.status).json({
              error: INVALID_FIELDS.error,
              message: INVALID_FIELDS.message,
              invalidFields: Object.keys(err.errors),
            });
          case 'MongoError':
            return res.status(INVALID_FIELDS.status).json({
              error: INVALID_FIELDS.error,
              message: INVALID_FIELDS.message,
              errorMessage: err.errmsg,
            });
          default:
            return res.status(INVALID_FIELDS.status).json({
              error: GENERIC_ERROR.error,
              message: err,
            });
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
        const { INVALID_FIELDS, GENERIC_ERROR } = errors;

        switch (err.name) {
          default:
            return res.status(INVALID_FIELDS.status).json({
              error: GENERIC_ERROR.error,
              message: err,
            });
        }
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
        const { INVALID_FIELDS, GENERIC_ERROR } = errors;

        switch (err.name) {
          default:
            return res.status(INVALID_FIELDS.status).json({
              error: GENERIC_ERROR.error,
              message: err,
            });
        }
      });
  }
}

module.exports = RestController;
