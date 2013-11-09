// Main static router and auth endpoints

module.exports = function (app, passport) {
	app.get('/', serveHomepage);

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successReturnToOrRedirect: '/app' }));
	app.get('/logout', logout);

	function serveHomepage (req, res) {
		res.render('base');
	}
};
