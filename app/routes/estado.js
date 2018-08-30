const express = require('express');
const router = express.Router();

const EstadoController = new (require('../controllers/estado-controller'))();

/**
 * GET /{organization}/{version}/estado
 * POST /{organization}/{version}/estado
 */
router
  .route('/')
  .get(EstadoController.getAll)
  .post(EstadoController.add);

/**
 * GET /{organization}/{version}/estado/:estadoId
 * PUT /{organization}/{version}/estado/:estadoId
 * DELETE /{organization}/{version}/estado/:estadoId
 */
router
  .route('/:estadoId')
  .get(EstadoController.getById)
  .put(EstadoController.update)
  .delete(EstadoController.delete);

module.exports = router;
