var _ = require('underscore');
var request = require('request');
var async = require('async');
var diacritics = require('diacritics');
var config = require('../../config');
var services = config.services;
var db = require('../dbconnector').db;

var headers = { 'Content-Type': 'application/json', 'User-Agent': config.userAgent };

exports.fetchFacebookMusic = function (facebookId, token, callback) {
	var uri = services.facebook.apiUrl + '/' + facebookId + '/likes?limit=100&access_token=' + token;

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

exports.fetchShufflerArtists = function (artists, callback) {
	var results = [];

	async.each(artists, searchForShufllerArtist, returnTracks);

	function searchForShufllerArtist (artist, next) {
		var name = diacritics.remove(artist.name);
		var uri = services.shuffler.apiUrl + '/artists?q=' + name + '&app-key=' + services.shuffler.appKey;

		request.get({ uri: uri, headers: headers, json: true }, function (err, res, body) {
			if (err) {
				return next(err);
			}

			var artists = body[0];
			if (!_(artists).isEmpty()) {
				var choice = _(artists).pick(['id', 'name', 'permalink', 'channel_url', 'images', 'urls']);
				results.push(choice);
			}

			return next(null);
		});
	}

	function returnTracks (err) {
		return err ? callback(err) : callback(null, results);
	}
};
