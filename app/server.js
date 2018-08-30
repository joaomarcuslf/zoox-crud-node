const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');

const cors = require('./middlewares/allow-cors');
const noIcon = require('./middlewares/no-icon');
const notFound = require('./middlewares/not-found');

const routes = require('./routes');

const application = express();

if (process.env.NODE_ENV !== 'test') {
  application.use(morgan('dev'));
}

application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(expressSanitizer());
application.use(cors());
application.use(noIcon());

application.use('/api/v1', routes);

application.use(notFound());

module.exports = application;
