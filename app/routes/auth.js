const express = require('express');
const router = express.Router();

const AuthController = new (require('../controllers/auth-controller'))();

router.get('/', AuthController.getToken);

module.exports = router;
