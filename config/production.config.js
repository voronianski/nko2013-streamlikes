module.exports = {
	url: 'http://kosmetika.2013.nodeknockout.com',
	userAgent: 'nkotracks',
	mongo: {
		connection: 'mongodb://ksmtk:hjvtj99@paulo.mongohq.com:10073/nkotracks?auto_reconnect=true',
		collections: ['users', 'music']
	},
	services: {
		facebook: {
			apiUrl: 'https://graph.facebook.com',
			appID: '732610503419963',
			appSecret: '75a62db88fc24f483ff3ea94fa45c56a'
		},
		shuffler: {
			apiUrl: 'https://api.shuffler.fm/v2',
			appKey: 'b3rsurohdv',
			appSecret: 'pgn1u9ih9jt1ley0wnxrbgmt1w657cglf4z9qa3qm'
		}
	}
};