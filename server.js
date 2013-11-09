// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('mGKQ1JbxwdQI-AO2');

var isProduction = (process.env.NODE_ENV === 'production');
var port = (isProduction ? 80 : 8000);
var express = require('express');
var path = require('path');
var http = require('http');
var swig = require('swig');
var passport = require('passport');
var config = require('./config');
var auth = require('./source/auth');
var router = require('./source/router');

// passport initialization before app start
auth.initialize(passport);

var app = module.exports = express();

app.configure(function () {
	app.set('port', port);
	app.engine('html', swig.renderFile);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.use(express.logger('short'));
	app.use(express.cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'nko tracks stream' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

router(app, passport);

http.createServer(app).listen(port, function (err) {
	if (err) {
		console.error(err);
		process.exit(-1);
	}

	// if run as root, downgrade to the owner of this file
	if (process.getuid() === 0) {
		require('fs').stat(__filename, function (err, stats) {
			if (err) {
				return console.error(err);
			}
			process.setuid(stats.uid);
		});
	}

	console.log('Server running at http://0.0.0.0:' + port + '/ with mongodb connectected at ' + config.mongo.connection);
});
