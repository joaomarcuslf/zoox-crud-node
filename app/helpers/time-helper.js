const moment = require('moment-timezone');

module.exports = time => moment(time).tz('America/Sao_Paulo');
