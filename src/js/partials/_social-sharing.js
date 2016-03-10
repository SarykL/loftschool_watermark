;$(document).ready(function () {
	var fb = $('#fb_link'),
		tw = $('#tw_link'),
		vk = $('#vk_link'),

		sharePopupWidth = 630,
		sharePopupHeight = 430,

		title = document.title,
		location = window.location.href;

	fb.on('click', function () {
		var url = 'https://www.facebook.com/sharer/sharer.php?u=';
		url += encodeURIComponent(location);
		window.open(url, '','width=' + sharePopupWidth + ',height=' + sharePopupHeight);
	});

	tw.on('click', function () {
		var  url = 'http://twitter.com/share?';
		url += 'text=' + title;
		url += '&url=' + location;
		window.open(url, '','width=' + sharePopupWidth + ',height=' + sharePopupHeight);
	});
	vk.on('click', function () {
		var  url = 'https://vk.com/share.php?';
		url += '&title=' + title;
		url += 'url=' + location;
		url += '&noparse=true';
		window.open(url, '','width=' + sharePopupWidth + ',height=' + sharePopupHeight);
	});

});