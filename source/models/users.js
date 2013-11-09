var _ = require('lodash');
var util = require('util');
var db = require('../dbconnector').db;

exports.findOrCreateUser = function (token, tokenSecret, profile, callback) {
	db.users.findOne({ '__wrapped__.id': profile.id, '__wrapped__.provider': profile.provider }, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (user) {
			return callback(null, user);
		}

		var doc = _(profile).pick(['id', 'username', 'provider', 'displayName']);

		doc = _(doc).extend({
			token: token,
			tokenSecret: tokenSecret,
			avatar: util.format('https://graph.facebook.com/%s/picture', profile.id),
			registered: new Date()
		});

		db.users.save(doc, function (err, saved) {
			return err ? callback(err) : callback(null, saved);
		});
	});
};
