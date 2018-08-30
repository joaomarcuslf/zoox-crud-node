const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cors = require('./middlewares/allowCors');
const noIcon = require('./middlewares/noIcon');

const routes = require('./routes');

const application = express();

if (process.env.NODE_ENV !== 'test') {
  application.use(morgan('dev'));
}

application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());

application.use(cors());
application.use(noIcon());

application.use('/api/v1', routes);

application.use((request, response) => {
  response.status(404).send({
    error: 'ERROR: NOT FOUND',
    message: 'Resource could not be found',
  });
});

module.exports = application;
