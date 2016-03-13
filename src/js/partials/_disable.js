;$(document).ready(function () {
	$('.watermark__section_disable').show();
	$('.sidebar-position_disable').show();
	$('.sidebar-slider__block_disable').show();
	$('.sidebar-buttons__buttons-row_disable').show();

	$('#fileupload').on('change', function () {
		$('.watermark__section_disable').hide();
	});

	$('#watermark').on('change', function () {
		$('.sidebar-slider__block_disable').hide();
		$('.sidebar-position_disable').hide();
		$('.sidebar-buttons__buttons-row_disable').hide();
	});
});