const express = require('express');
const router = express.Router();

const Controller = require('../controllers/estado-controller');

const EstadoController = new Controller();

/**
 * GET /{version}/estados
 * POST /{version}/estados
 */
router
  .route('/')
  .get(EstadoController.getAll)
  .post(EstadoController.add);

/**
 * GET /{version}/estados/search
 */
router.route('/search').get(EstadoController.search);

/**
 * GET /{version}/estados/:id
 * PUT /{version}/estados/:id
 * DELETE /{version}/estados/:id
 */
router
  .route('/:id')
  .get(EstadoController.getById)
  .put(EstadoController.update)
  .delete(EstadoController.delete);

module.exports = router;
