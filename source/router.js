// Main static router and auth endpoints

module.exports = function (app, passport) {
	app.get('/', serveHomepage);
	app.get('/stream', serveRadioApp);

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successReturnToOrRedirect: '/stream' }));
	//app.get('/logout', logout);

	function serveHomepage (req, res) {
		res.render('base');
	}

	function serveRadioApp (req, res) {
		res.render('app', { username: req.user.__wrapped__.username });
	}
};
