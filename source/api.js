var users = require('./models/users');
var music = require('./models/music');

module.exports = function (app) {
	app.get('/api/users/me', getUser);
	app.get('/api/music/facebook', fetchFacebookMusic);

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
};