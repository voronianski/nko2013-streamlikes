module.exports = {
	url: 'http://0.0.0.0:8000/',
	mongo: {
		connection: 'mongodb://localhost:27017/nkotracks',
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
