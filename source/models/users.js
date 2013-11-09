var _ = require('underscore');
var util = require('util');
var db = require('../dbconnector').db;
var ObjectId = require('mongojs').ObjectId;

exports.findById = function (id, callback) {
	if (typeof id === 'string') {
		id = new ObjectId(id);
	}

	db.users.findOne({ _id: id }, callback);
};

exports.findOrCreateUser = function (token, tokenSecret, profile, callback) {
	db.users.findOne({ id: profile.id, provider: profile.provider }, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (user) {
			return callback(null, user);
		}

		var doc = _(profile).pick(['id', 'username', 'provider', 'displayName']);

		doc = _(doc).extend({
			token: token,
			avatar: util.format('https://graph.facebook.com/%s/picture', profile.id),
			registered: new Date()
		});

		db.users.save(doc, function (err, saved) {
			return err ? callback(err) : callback(null, saved);
		});
	});
};
