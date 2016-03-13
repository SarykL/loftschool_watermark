//----------- Position block -------------

;$(document).ready(function(){
	$('.sidebar-position__link').on('click', function(e){
		e.preventDefault();

		var aTTr = $(this).attr('data-position');

		$('.sidebar-position__link').removeClass('sidebar-position__link--active');
		$(this).addClass('sidebar-position__link--active');

		$('.workspace__watermark').position({
			my: aTTr,
			at: aTTr,
			of: '.workspace__background',
			collision: 'none',
		});
		var positionX = $('.workspace__watermark').position().left;
		var positionY = $('.workspace__watermark').position().top;
		var mathPositionX = (positionX * dataSize.scaleBg) ^ 0;
		var mathPositionY = (positionY * dataSize.scaleBg) ^ 0;
		$('.coordinateX').val(mathPositionX);
		$('.coordinateY').val(mathPositionY);
	});


//--------------- Spinner ---------------

	$('.coordinateX').spinner({

		spin: function(event, ui){
			var valuer = ui.value / dataSize.scaleBg;

			$('.workspace__watermark').css({
				left: valuer + 'px'
			});
		},
		change: function(event, ui){
			var valuer = $('.coordinateX').val() * dataSize.scaleBg;
			// var maxWidth = $('.workspace__background').width() - $('.workspace__watermark').width();
			// $('.coordinateX').attr('max', maxWidth);

			$('.workspace__watermark').css({
				left: valuer + 'px'
			});
		},
		stop: function(event, ui){
			var valuer = $('.coordinateX').val() / dataSize.scaleBg;

			$('.workspace__watermark').css({
				left: valuer + 'px'
			});
		},

		min: 0,
		// max: $('.workspace__background').width() - $('.workspace__watermark').width()
	});




		$('.coordinateY').spinner({
			spin: function(event, ui){
				var valuer2 = ui.value / dataSize.scaleBg;

				$('.workspace__watermark').css({
						top: valuer2 + 'px'
					});

			},

			change: function(event, ui){
				var valuer2 = ui.value / dataSize.scaleBg;

				$('.workspace__watermark').css({
					top: valuer2 + 'px'
				});

			},

			stop: function(event, ui){
				var valuer2 = ui.value / dataSize.scaleBg;

				$('.workspace__watermark').css({
					top: valuer2 + 'px'
				});
			},

			min: 0,
		});




//---------- Numeric entry in input only -------------

	$('.position-input').bind("change keyup input click", function() {
	    if (this.value.match(/[^0-9]/g)) {
	        this.value = this.value.replace(/[^0-9]/g, '');
	    }
	});


});

//------------ Input limit ---------------

$('.coordinateX').keyup(function(e){
    	var valCoordX = +$('.coordinateX').val();
    	var maxWidth = dataSize.originWidthBg - dataSize.originWidthWm;
    	$('.workspace__watermark').css({
					left: valCoordX / dataSize.scaleBg + 'px'
				});
    	if(valCoordX > maxWidth) $('.coordinateX').val(maxWidth);

	});

$('.coordinateY').keyup(function(e){
    	var valCoordY = +$('.coordinateY').val() * dataSize.scaleBg;
    	var maxHeight = dataSize.originHeightBg - dataSize.originHeightWm;
    	$('.workspace__watermark').css({
					top: valCoordY / dataSize.scaleBg + 'px'
				});
    	if(valCoordY > maxHeight) $('.coordinateY').val(maxHeight);

	});


