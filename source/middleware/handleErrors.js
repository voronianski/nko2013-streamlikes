module.exports = function () {
	return function (err, req, res, next) {
		var status = err.status || 500;
		return res.json(err, status);
	};
};
