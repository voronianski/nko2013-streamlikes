// Main static router

module.exports = function (app) {
	app.get('/', serveHomepage);

	function serveHomepage (req, res) {
		res.render('base');
	}
};
