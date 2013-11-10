module.exports = function (req, res, next) {
	return (!req.user || !req.signedCookies.nkotracksid) ?
		res.json(403, { message: 'Unauthorized access'}) :
		next();
};
