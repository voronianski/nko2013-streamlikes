// User registration and authorization

var config = require('../config');
var services = config.services;
var users = require('./models/users');
var FacebookAuth = require('passport-facebook').Strategy;

exports.initialize = function (passport) {
	passport.serializeUser(function (doc, done) {
		done(null, doc.__wrapped__);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	passport.use(new FacebookAuth({
		clientID: services.facebook.appID,
		clientSecret: services.facebook.appSecret,
		callbackURL: config.url + '/auth/facebook/callback'
	}, findOrCreateUser));

	function findOrCreateUser (token, tokenSecret, profile, done) {
		users.findOrCreateUser(token, tokenSecret, profile, function (err, user) {
			return err ? done(err) : done(null, user);
		});
	}
};
