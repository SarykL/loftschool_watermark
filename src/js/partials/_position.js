//----------- Position block -------------

;$(document).ready(function(){
	$('.sidebar-position__link').on('click', function(e){
		e.preventDefault();

		var aTTr = $(this).attr('data-position');

		$('.sidebar-position__link').removeClass('sidebar-position__link--active');
		$(this).addClass('sidebar-position__link--active');

		$('.workspace__square').position({
			my: aTTr,
			at: aTTr,
			of: '.workspace__unit',
			collision: 'none',
		});
		var positionX = $('.workspace__square').position().left;
		var positionY = $('.workspace__square').position().top;
		var mathPositionX = positionX ^ 0;
		var mathPositionY = positionY ^ 0;
		$('.coordinateX').val(mathPositionX);
		$('.coordinateY').val(mathPositionY);
	});


//--------------- Spinner ---------------

	$('.coordinateX').spinner({

		spin: function(event, ui){
			var valuer = ui.value;

			$('.workspace__square').css({
				left: valuer + 'px'
			});
		},
		change: function(event, ui){
			var valuer = $('.coordinateX').val();
			var maxWidth = $('.workspace__unit').width() - $('.workspace__square').width()
			$('.coordinateX').attr('max', maxWidth)

			$('.workspace__square').css({
				left: valuer + 'px'
			});
		},
		stop: function(event, ui){
			var valuer = $('.coordinateX').val();

			$('.workspace__square').css({
				left: valuer + 'px'
			});
		},

		min: 0,
		max: $('.workspace__unit').width() - $('.workspace__square').width()
	});

	$('.coordinateY').spinner({
		spin: function(event, ui){
			var valuer = ui.value;

			$('.workspace__square').css({
					top: valuer + 'px'
				});

		},

		change: function(event, ui){
			var valuer = $('.coordinateY').val();

			$('.workspace__square').css({
				top: valuer + 'px'
			});
		},

		stop: function(event, ui){
			var valuer = $('.coordinateY').val();

			$('.workspace__square').css({
				top: valuer + 'px'
			});
		},
		min: 0,
		max: $('.workspace__unit').height() - $('.workspace__square').height()
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
    	var maxWidth = $('.workspace__unit').width() - $('.workspace__square').width();
    	if(valCoordX > maxWidth) $('.coordinateX').val(maxWidth);

	});

$('.coordinateY').keyup(function(e){
    	var valCoordY = +$('.coordinateY').val();
    	var maxHeight = $('.workspace__unit').height() - $('.workspace__square').height();
    	if(valCoordY > maxHeight) $('.coordinateY').val(maxHeight);

	});


// 		min: 0,
// 		max: $('.workspace__unit').height() - $('.workspace__square').height()
// 	});
// });


