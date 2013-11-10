streamLikes.app = {

	init: function () {
		this.$el = $('body').find('.app');
		this.fetchArtists();
	},

	fetchArtists: function () {
		var self = this;

		$.get('/api/music/artists').done(function (artists, resp) {
			self.stopProgress();
			self.renderArtists(artists);
		});
	},

	renderArtists: function (artists) {
		var self = this;

		var $list = $('<ul class="artists-wrap"></tr>').appendTo(self.$el);
		$.each(artists, function (i, artist) {
			var image = artist.images ?
				(artist.images.best_square.url || artist.images.square.url) :
				'/images/melody-white.png';

			$('<li class="artist"' +
				'data-id="' + artist.id + '"' +
				'data-channel="' + artist.channel_url + '">' +
				'<img src="' + image + '">' +
				'<span class="name">' + artist.name + '</span>' +
				'<div class="player"><i data-icon="a" class="icon"></i><span>Play</span></div></li>').appendTo($list);
		});
	},

	startProgress: function () {
		this.$el.find('.preloader').show();
	},

	stopProgress: function () {
		this.$el.find('.preloader').hide();
	}

};

$(function () {
	streamLikes.app.init();
});
