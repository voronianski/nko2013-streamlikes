(function ($) {
	window.streamLikes = window.streamLikes || {};

	if (window.location.hash === '#_=_') {
		window.location.href = window.location.href.split('#')[0];
	}

	$.Event.prototype.stop = function () {
		this.stopPropagation();
		this.preventDefault();
	};

})(jQuery);