module.exports = {
	mongo: {
		connection: 'mongodb://ksmtk:hjvtj99@paulo.mongohq.com:10073/nkotracks',
		collections: ['users'],
		options: { auto_reconnect: true }
	},
	services: {
		facebook: {
			appID: '732610503419963',
			appSecret: '75a62db88fc24f483ff3ea94fa45c56a'
		},
		shuffler: {
			appKey: 'b3rsurohdv',
			appSecret: 'pgn1u9ih9jt1ley0wnxrbgmt1w657cglf4z9qa3qm'
		}
	}
};