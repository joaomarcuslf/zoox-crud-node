const express = require('express');
const router = express.Router();

const validateToken = require('../middlewares/validate-token');

const ApplicationController = new (require('../controllers/application-controller'))();

const AuthRoutes = require('./auth');
const EstadoRoutes = require('./estado');
const CidadeRoutes = require('./cidade');

/**
 * GET /{organization}/{version}/
 */
router.get('/', ApplicationController.health);

router.use('/auth', AuthRoutes);

router.use('/estado', validateToken());
router.use('/estado', EstadoRoutes);

router.use('/cidade', validateToken());
router.use('/cidade', CidadeRoutes);

module.exports = router;
