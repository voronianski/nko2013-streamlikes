streamLikes.app = {

	init: function () {
		this.fetchArtists();
	},

	fetchArtists: function () {
		$.get('/api/music/artists').done(function (artists) {
			debugger;
		});
	}

};

$(function () {
	streamLikes.app.init();
});
