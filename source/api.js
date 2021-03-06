var middleware = require('./middleware');
var users = require('./models/users');
var music = require('./models/music');

module.exports = function (app) {
	app.all('/api/*', middleware.checkAPIAuth);
	app.get('/api/users/me', getUser);
	app.get('/api/music/facebook', fetchFacebookMusic);
	app.get('/api/music/artists', fetchShufflerArtists);
	app.get('/api/music/tracks/:id', fetchShufflerTracks);

	function getUser (req, res) {
		users.findById(req.user._id, function (err, user) {
			return err ? next(err) : res.json(user);
		});
	}

	function fetchFacebookMusic (req, res) {
		music.fetchFacebookMusic(req.user.id, req.user.token, function (err, artists) {
			return err ? next(err) : res.json(artists);
		});
	}

	function fetchShufflerArtists (req, res) {
		music.fetchFacebookMusic(req.user.id, req.user.token, function (err, likes) {
			if (err) {
				return next(err);
			}

			music.fetchShufflerArtists(likes, function (err, artists) {
				return err ? next(err) : res.json(artists);
			});
		});
	}

	function fetchShufflerTracks (req, res) {
		music.fetchShufflerTracks(req.param('id'), function (err, tracks) {
			return err ? next(err) : res.json(tracks);
		});
	}
};