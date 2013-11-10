streamLikes.app = {

	init: function () {
		this.$el = $('body').find('.app');
		//this.$audio = document.getElementById('player');
		this.fetchArtists();
	},

	fetchArtists: function () {
		var self = this;

		$.get('/api/music/artists')
			.done(function (artists, resp) {
				self.stopProgress();
				self.renderArtists(artists);
			});
	},

	fetchTracks: function (e) {
		var $target = $(e.currentTarget);
		var artistId = $target.parent().data('id');
		var artistName = $target.parent().data('name');

		$.get('/api/music/tracks/' + artistId)
			.done(function (tracks, resp) {
				e.data.renderPlayer(tracks, $target, artistName);
			});
	},

	renderArtists: function (artists) {
		var self = this;

		var $list = $('<ul class="artists-wrap"></ul>').appendTo(self.$el);
		$.each(artists, function (i, artist) {
			var image = artist.images ?
				(artist.images.best_square.url || artist.images.square.url) :
				'/images/melody-white.png';

			$('<li class="artist"' +
				'data-id="' + artist.id + '" data-name="' + artist.name + '">' +
				'<img src="' + image + '">' +
				'<span class="name">' + artist.name + '</span>' +
				'<div class="player"><i data-icon="a" class="icon"></i><span>Play</span></div></li>').appendTo($list);
		});

		$('.player').on('click', self, self.fetchTracks);
	},

	renderPlayer: function (tracks, $elem, artistName) {
		var $player = this.$el.find('.track-player');

		// if (tracks.length === 0) {
		// 	$player.text('No recent audio streams for ' + artistName + ' found..');
		// }

		$elem.addClass('playing');
		this.$audio.src = tracks[0].url;
		this.$audio.play();
		// $('audio').attr('src', tracks[0].url);
		// $('audio').play();
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
