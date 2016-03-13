;$(document).ready(function () {
	$('.reset-btn').on('click', function (e) {
		e.preventDefault();
		$('.sidebar-slider__block-destiny').slider('option', 'value', 0.3);
		$('.workspace__watermark').css({ opacity : 0.66666666 });

		$('.workspace__watermark').css({left : 0});
		$('.workspace__watermark').css({top : 0});
		$('.position-input').spinner('value', 0);
		$('.sidebar-position__link').removeClass('sidebar-position__link--active');
		$('.top-left').addClass('sidebar-position__link--active');
		
	});
	
});

