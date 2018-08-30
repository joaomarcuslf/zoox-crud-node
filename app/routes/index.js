const express = require('express');
const router = express.Router();

const ApplicationController = new (require('../controllers/application-controller'))();

router.get('/', ApplicationController.health);

module.exports = router;
