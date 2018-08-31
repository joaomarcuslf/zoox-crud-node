const express = require('express');
const router = express.Router();

const Controller = require('../controllers/cidade-controller');

const CidadeController = new Controller();

/**
 * GET /{organization}/{version}/cidade
 * POST /{organization}/{version}/cidade
 */
router
  .route('/')
  .get(CidadeController.getAll)
  .post(CidadeController.add);

/**
 * GET /{organization}/{version}/cidade/:id
 * PUT /{organization}/{version}/cidade/:id
 * DELETE /{organization}/{version}/cidade/:id
 */
router
  .route('/:id')
  .get(CidadeController.getById)
  .put(CidadeController.update)
  .delete(CidadeController.delete);

module.exports = router;
