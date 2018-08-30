const express = require('express');
const router = express.Router();
// const validateToken = require('../middlewares/validate-token');

const ApplicationController = new (require('../controllers/application-controller'))();

const AuthRoute = require('./auth');

/**
 * GET /{organization}/{version}/
 */
router.get('/', ApplicationController.health);

router.use('/auth', AuthRoute);

module.exports = router;
