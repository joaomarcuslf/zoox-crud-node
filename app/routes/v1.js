const express = require('express');
const router = express.Router();

const validateToken = require('../middlewares/validate-token');

const ApplicationController = new (require('../controllers/application-controller'))();

const AuthRoutes = require('./auth');
const EstadoRoutes = require('./estados');
const CidadeRoutes = require('./cidades');

/**
 * GET /{version}/
 */
router.get('/', ApplicationController.health);

router.use('/auth', AuthRoutes);

router.use('/estados', validateToken());
router.use('/estados', EstadoRoutes);

router.use('/cidades', validateToken());
router.use('/cidades', CidadeRoutes);

module.exports = router;
