;$(document).ready(function () {
	$('.reset-btn').on('click', function (e) {
		e.preventDefault();
		$('.sidebar-slider__block-destiny').slider('option', 'value', 0.3);
		$('.workspace__square').css({ opacity : 0.66666666 });

		$('.workspace__square').css({left : 0});
		$('.workspace__square').css({top : 0});
		$('.position-input').spinner('value', 0);
		$('.sidebar-position__link').removeClass('sidebar-position__link--active');
		$('.top-left').addClass('sidebar-position__link--active');
		
	});
	
});

