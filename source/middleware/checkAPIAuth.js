module.exports = function (req, res, next) {
	return !req.signedCookies.tlogin ?
		res.json(403, { message: 'Unauthorized access'}) :
		next();
};
