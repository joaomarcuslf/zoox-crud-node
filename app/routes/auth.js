const express = require('express');
const router = express.Router();

const AuthController = new (require('../controllers/auth-controller'))();

/**
 * GET /{version}/auth
 */
router.get('/', AuthController.getToken);

module.exports = router;
