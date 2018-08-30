var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const Estado = require('./app/models/estado');

const E = new Estado();

E.get({})
  .then(data => {
    console.log('data >>>>>>>', data);
  })
  .catch(error => {
    console.log('error >>>>>>>', error);
  });
