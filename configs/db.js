var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const url = process.env.MONGO_URL || 'mongodb://localhost/zoox-crud-node';

module.exports = mongoose.connect(url);
