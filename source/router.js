// Main static router and auth endpoints

var middleware = require('./middleware');

module.exports = function (app, passport) {
	app.get('/', serveHomepage);
	app.get('/stream', middleware.checkAuth, serveStreamApp);

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successReturnToOrRedirect: '/stream' }));
	//app.get('/logout', logout);

	function serveHomepage (req, res) {
		res.render('homepage');
	}

	function serveStreamApp (req, res) {
		res.render('app');
	}
};
