module.exports = {
	url: 'http://0.0.0.0:8000',
	userAgent: 'nkotracks-dev',
	mongo: {
		connection: 'mongodb://localhost:27017/nkotracks?auto_reconnect=true',
		collections: ['users', 'music']
	},
	services: {
		facebook: {
			apiUrl: 'https://graph.facebook.com',
			appID: '586399898092997',
			appSecret: '486bfb8a132799ae9d3140f261b669d7'
		},
		shuffler: {
			apiUrl: 'https://api.shuffler.fm/v2',
			appKey: 'b3rsurohdv',
			appSecret: 'pgn1u9ih9jt1ley0wnxrbgmt1w657cglf4z9qa3qm'
		},
		soundcloud: {
			clientID: '0640e8b38ce7c1388025b13fdbbe9116',
			clientSecret: 'f826e033cb4af218620ffd92325de4ba'
		}
	}
};
