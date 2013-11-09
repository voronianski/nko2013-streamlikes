var util = require('util');
var env = process.env.NODE_ENV || 'development';

module.exports = require(__dirname + util.format('/%s.config.js', env));
