const express = require('express');
const router = express.Router();

const Controller = require('../controllers/estado-controller');

const EstadoController = new Controller();

/**
 * GET /{organization}/{version}/estado
 * POST /{organization}/{version}/estado
 */
router
  .route('/')
  .get(EstadoController.getAll)
  .post(EstadoController.add);

/**
 * GET /{organization}/{version}/estado/search
 */
router.route('/search').get(EstadoController.search);

/**
 * GET /{organization}/{version}/estado/:id
 * PUT /{organization}/{version}/estado/:id
 * DELETE /{organization}/{version}/estado/:id
 */
router
  .route('/:id')
  .get(EstadoController.getById)
  .put(EstadoController.update)
  .delete(EstadoController.delete);

module.exports = router;
