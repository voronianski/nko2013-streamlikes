var _ = require('underscore');
var request = require('request');
var async = require('async');
var config = require('../../config');
var services = config.services;
var db = require('../dbconnector').db;

exports.fetchFacebookMusic = function (facebookId, token, callback) {
	var uri = services.facebook.apiUrl + '/' + facebookId + '/likes?limit=20&access_token=' + token;
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

exports.fetchShufflerArtists = function (artists, callback) {
	var headers = { 'Content-Type': 'application/json', 'User-Agent': config.userAgent };
	var results = [];

	async.eachSeries(artists, searchForShufllerArtist, returnTracks);

	function searchForShufllerArtist (artist, next) {
		var name = artist.name.replace(/é/g, 'e');
		var uri = services.shuffler.apiUrl + '/artists?q=' + name + '&app-key=' + services.shuffler.appKey;
		console.dir(uri);
		request.get({ uri: uri, headers: headers, json: true }, function (err, res, body) {
			if (err) {
				return next(err);
			}

			console.dir(body);
			var choice = _(body[0]).pick(['name', 'permalink', 'channel_url', 'images', 'urls']);
			results.push(choice);
			return next(null, results);
		});
	}

	function returnTracks (err) {
		return err ? callback(err) : callback(null, tracks);
	}
};
