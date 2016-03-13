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
		var mathPositionX = (positionX) ^ 0;
		var mathPositionY = (positionY) ^ 0;
		$('.coordinateX').val(mathPositionX);
		$('.coordinateY').val(mathPositionY);
	});


//--------------- Spinner ---------------

	$('.coordinateX').spinner({

		spin: function(event, ui){
			var valuer = ui.value;

			$('.workspace__watermark').css({
				left: valuer + 'px'
			});
		},
		change: function(event, ui){
			var valuer = $('.coordinateX').val();
			$('.workspace__watermark').css({
				left: valuer + 'px'
			});
		},
		stop: function(event, ui){
			var valuer = $('.coordinateX').val();

			$('.workspace__watermark').css({
				left: valuer + 'px'
			});
		},

		min: 0
	});




		$('.coordinateY').spinner({
			spin: function(event, ui){
				var valuerTop = ui.value;

				$('.workspace__watermark').css({
						top: valuerTop + 'px'
					});

			},

			change: function(event, ui){
				var valuerTop = $('.coordinateY').val();
				$('.workspace__watermark').css({
					top: valuerTop + 'px'
				});

			},

			stop: function(event, ui){
				var valuerTop = $('.coordinateY').val();

				$('.workspace__watermark').css({
					top: valuerTop + 'px'
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
    	var maxWidth = dataSize.bgWidth - dataSize.wmWidth;
    	if(valCoordX > maxWidth) $('.coordinateX').val(maxWidth);

	});

$('.coordinateY').keyup(function(e){
    	var valCoordY = +$('.coordinateY').val();
    	var maxHeight = dataSize.bgHeight - dataSize.wmHeight;
    	if(valCoordY > maxHeight) $('.coordinateY').val(maxHeight);

	});


