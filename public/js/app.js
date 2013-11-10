streamLikes.app = {

	init: function () {
		this.$el = $('body').find('.app'); // cache app element
		this.audio = document.getElementById('player'); // init for html5 web audio

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

	fetchTracks: function (artistId, $elem) {
		var self = this;

		self.startProgress();
		$.get('/api/music/tracks/' + artistId)
			.done(function (tracks, resp) {
				self.stopProgress();
				self.renderPlayer(tracks, $elem);
			});
	},

	initPlayer: function (e) {
		var self = e.data;
		var $target = $(e.currentTarget).parent();
		var artistId = $target.data('id');

		if ($target.hasClass('playing')) {
			self.stopPlaying();
			return;
		}

		self.stopPlaying();
		self.fetchTracks(artistId, $target);
	},

	renderArtists: function (artists) {
		var self = this;

		var $list = $('<ul class="artists-wrap"></ul>').appendTo(self.$el);
		$.each(artists, function (i, artist) {
			var image = artist.images ?
				(artist.images.best_square.url || artist.images.square.url) :
				'/images/melody-white.png';

			$('<li class="artist"' +
				'data-id="' + artist.id + '">' +
				'<img src="' + image + '">' +
				'<span class="name">' + artist.name + '</span>' +
				'<div class="player"><i data-icon="a" class="icon"></i><span>Play</span></div></li>').appendTo($list);
		});

		$('.player').on('click', self, self.initPlayer);
	},

	renderPlayer: function (tracks, $elem) {
		var $playerInfo = this.$el.find('.track-info');

		if (tracks.length === 0) {
			$playerInfo.text('No recent audio streams for selected artist found.');
		}

		var track = tracks[0];

		this.audio.src = track.url;
		this.audio.play();

		$elem.addClass('playing');
		$elem.find('.player span').text('Pause');
		$elem.find('.player .icon').attr('data-icon', 'c');
		$playerInfo.text('Playing: ' + track.artist + ' - ' + track.track);
	},

	stopPlaying: function () {
		var $artists = $('.artist');

		this.audio.pause();
		$artists.removeClass('playing');
		$artists.find('.player span').text('Play');
		$artists.find('.player .icon').attr('data-icon', 'a');
	},

	startProgress: function () {
		var $body = $('body');
		$body.find('.preloader').addClass('show');
		$body.find('.preloader-overlay').show();
	},

	stopProgress: function () {
		var $body = $('body');
		$body.find('.preloader').removeClass('show');
		$body.find('.preloader-overlay').hide();
	}

};

$(function () {
	streamLikes.app.init();
});
