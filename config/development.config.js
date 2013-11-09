module.exports = {
	url: 'http://0.0.0.0:8000',
	mongo: {
		connection: 'mongodb://localhost:27017/nkotracks?auto_reconnect=true&auto_wrap=false',
		collections: ['users']
	},
	services: {
		facebook: {
			appID: '586399898092997',
			appSecret: '486bfb8a132799ae9d3140f261b669d7'
		},
		shuffler: {
			appKey: 'b3rsurohdv',
			appSecret: 'pgn1u9ih9jt1ley0wnxrbgmt1w657cglf4z9qa3qm'
		}
	}
};
