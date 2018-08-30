const ApplicationController = require('./application-controller');
const EstadoModel = require('../models/estado');

const { errors } = require('../constants');

class AuthController extends ApplicationController {
  constructor(props) {
    super(props);
  }

  /**
   * Will get all {Estado} data
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  getAll(req, res) {
    const Model = new EstadoModel();

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
   * Will get all {Estado} data by some query
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  getById(req, res) {
    const Model = new EstadoModel();

    const query = req.params.estadoId || {};

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
   * Will add the {estado} to the DB
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  add(req, res) {
    const Model = new EstadoModel();

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
   * Will update the {estado} to the DB
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  update(req, res) {
    const Model = new EstadoModel();

    const id = req.params.estadoId;
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
   * Will update the {estado} to the DB
   * @param {object} req request object from express
   * @param {object} res response object from express
   * @returns {promise} request data
   */
  delete(req, res) {
    const Model = new EstadoModel();

    const id = req.params.estadoId;

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

module.exports = AuthController;
