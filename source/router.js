// Main static router and auth endpoints

var middleware = require('./middleware');

module.exports = function (app, passport) {
	app.get('/', serveHomepage);
	app.get('/stream', middleware.checkAuth, serveStreamApp);

	app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'user_likes' }));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), login);
	app.get('/logout', logout);

	function serveHomepage (req, res) {
		res.render('homepage');
	}

	function serveStreamApp (req, res) {
		res.render('app');
	}

	function login (req, res) {
		res.cookie('nkotracksid', req.user._id, { maxAge: 900000, signed: true });
		res.redirect('/stream');
	}

	function logout (req, res) {
		req.logout();
		res.clearCookie(req.param('cookie'));
		res.redirect('/');
	}
};
