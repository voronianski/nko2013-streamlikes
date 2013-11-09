var _ = require('underscore');
var request = require('request');
var config = require('../../config');
var services = config.services;
var db = require('../dbconnector').db;

exports.fetchFacebookMusic = function (facebookId, token, callback) {
	var uri = services.facebook.apiUrl + '/' + facebookId + '/likes?limit=500&access_token=' + token;
	var headers = { 'Content-Type': 'application/json', 'User-Agent': config.userAgent };

	request.get({ uri: uri, headers: headers, json: true }, function (err, res, body) {
		if (err) {
			return callback(err);
		}

		var artists = _(body.data).filter(function (like) {
			return like.category === 'Musician/band';
		});

		return callback(null, artists);
	});
};
