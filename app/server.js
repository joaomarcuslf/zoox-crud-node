const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cacheControl = require('express-cache-controller');
const expressSanitizer = require('express-sanitizer');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

const noIcon = require('./middlewares/no-icon');
const notFound = require('./middlewares/not-found');

const routes = require('./routes/v1');

const application = express();

if (process.env.NODE_ENV !== 'test') application.use(morgan('dev'));

application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(expressSanitizer());
application.use(cors());
application.use(noIcon());
application.use(cacheControl({ public: true, maxAge: 60 }));

application.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
application.use('/v1', routes);

application.use(notFound());

module.exports = application;
