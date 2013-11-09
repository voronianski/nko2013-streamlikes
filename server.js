// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('mGKQ1JbxwdQI-AO2');

var isProduction = (process.env.NODE_ENV === 'production');
var express = require('express');
var http = require('http');
var swig = require('swig');
var port = (isProduction ? 80 : 8000);

var app = module.exports = express();

app.configure(function () {
	app.set('port', port);
	app.engine('html', swig.renderFile);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.use(express.logger('short'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

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

	console.log('Server running at http://0.0.0.0:' + port + '/');
});


/*
function (req, res) {
	// http://blog.nodeknockout.com/post/35364532732/protip-add-the-vote-ko-badge-to-your-app
	var voteko = '<iframe src="http://nodeknockout.com/iframe/kosmetika" frameborder=0 scrolling=no allowtransparency=true width=115 height=25></iframe>';

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<html><body><!--Shuffler-b3rsurohdv--> test commit2' + voteko + '</body></html>\n');
}
*/