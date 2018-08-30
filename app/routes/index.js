const express = require('express');
const router = express.Router();

const validateToken = require('../middlewares/validate-token');

const ApplicationController = new (require('../controllers/application-controller'))();

const AuthRoutes = require('./auth');
const EstadoRoutes = require('./estado');

/**
 * GET /{organization}/{version}/
 */
router.get('/', ApplicationController.health);

router.use('/auth', AuthRoutes);

router.use('/estado', validateToken());
router.use('/estado', EstadoRoutes);

module.exports = router;
