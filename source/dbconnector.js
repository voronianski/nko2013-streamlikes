var mongo = require('mongojs');
var config = require('../config').mongo;

exports.db = mongo.connect(config.connection, config.collections);

exports.reinitDB = function (options) {
	var connection = options.connection || config.connection;
	var collections = options.collections || config.collections;

	return mongo.connect(connection, collections);
};
