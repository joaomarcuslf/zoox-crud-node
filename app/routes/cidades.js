const express = require('express');
const router = express.Router();

const Controller = require('../controllers/cidade-controller');

const CidadeController = new Controller();

/**
 * GET /{version}/cidades
 * POST /{version}/cidades
 */
router
  .route('/')
  .get(CidadeController.getAll)
  .post(CidadeController.add);

/**
 * GET /{version}/cidades/search
 */
router.route('/search').get(CidadeController.search);

/**
 * GET /{version}/cidades/:id
 * PUT /{version}/cidades/:id
 * DELETE /{version}/cidades/:id
 */
router
  .route('/:id')
  .get(CidadeController.getById)
  .put(CidadeController.update)
  .delete(CidadeController.delete);

module.exports = router;
