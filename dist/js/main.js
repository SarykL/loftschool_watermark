;$(document).ready(function(){
    var op_value,
        def_value;
    $( ".sidebar-slider__block-destiny" ).slider({
      range: "min",
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.01,
      create: function(event, ui) {
        def_value = 1 - $(this).slider( "values", 0 );
        $('.workspace__watermark').css({ opacity : def_value });
      },
      slide: function(event, ui) {
        op_value = 1 - $(this).slider( "values", 0 );
        $('.workspace__watermark').css({ opacity : op_value });
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
});

// creates uploaded file name appearing in input
/**/
var dataSize = {
	canvasWidth: 650,
	canvasHeight: 530,
  originWidthBg: 0,
  originHeightBg: 0,
  originWidthWm: 0,
  originHeightWm: 0,
	bgWidth: 0,
	bgHeight: 0,
	wmHeight: 0,
	wmWidth: 0,
  scaleBg: 0,
  scaleWm: 0,
	scaleWidth: 0,
	scaleHeight: 0

};

$( 'input[type="file"]' )
	.on( 'change', function() {
		var file = ( $( this ) )
			.val();
		var fileName = file.split( '\\' );
		fileName = fileName[ fileName.length - 1 ];
		$( this )
			.parent()
			.siblings( '.fake__input' )
			.find( '.fake__placeholder' )
			.text( fileName );
	} );

var uploads = [ '#fileupload', '#watermark' ],
	spaces = ['.workspace__background','.workspace__watermark'];
$.each( uploads, function( index, item ) {
	if ( item == '#fileupload' ) {
		$(item).fileupload({
			dataType: 'json',
			url: 'server/php/',
			type: 'POST',
			add: function( e, data ) {
				data.submit();
			},
			done: function( e, data ) {
				ground = data.result.files[ 0 ];
				var img = $('<img></img>').css({
						position: 'static'
					});
					img.attr('src', ground.url);
					img.load(function(){
						console.log(img.width() + ':' + img.height());
            dataSize.originWidthBg = img.width();
            dataSize.originHeightBg = img.height();
						dataSize.bgWidth = img.width();
						dataSize.bgHeight = img.height();
						console.log(dataSize);
						// if (dataSize.bgWidth >= dataSize.canvasWidth & dataSize.bgWidth > dataSize.bgHeight) {
						// 	//  if widthbg> canvas &
							// img.css({
							// 	width: '100%',
							// 	height: 'auto'
							// });

						// } else {
						// // if (dataSize.bgHeight >= dataSize.canvasHeight & dataSize.bgHeight > dataSize.bgWidth) {
						// 	img.css({
						// 		height: dataSize.canvasHeight + 'px',
						// 		width: 'auto'
						// 	});
						// }
						// if (dataSize.bgWidth < dataSize.canvasWidth & dataSize.bgWidth > dataSize.bgHeight) {
						// 	img.css({
						// 		width: dataSize.canvasWidth,
						// 		height: 'auto'
						// 	});
						// }
						// else{
						// 	img.css({
						// 		height: dataSize.canvasHeight + 'px',
						// 		width: 'auto'
						// 	});
						// }

            if(dataSize.bgWidth > dataSize.canvasWidth || dataSize.bgHeight > dataSize.canvasHeight){

              var canvasRatio = dataSize.canvasWidth / dataSize.canvasHeight;

              var bgRatio = dataSize.bgWidth / dataSize.bgHeight;
              if(canvasRatio < bgRatio){

                dataSize.bgWidth = dataSize.canvasWidth;
                dataSize.bgHeight = Math.round(dataSize.canvasWidth / bgRatio);

              }else{

                dataSize.bgWidth = Math.round(dataSize.canvasHeight * bgRatio);
                dataSize.bgHeight = dataSize.canvasHeight;
              }
            }
            dataSize.scaleBg = dataSize.originWidthBg / dataSize.bgWidth;

              img.css({
                width: dataSize.bgWidth,
                height: dataSize.bgHeight
              });

					});
				img.appendTo(spaces[0]);
				}
			});
	} else if ( item == '#watermark' ) {
			$(item).fileupload({
				dataType: 'json',
				url: 'server/php/',
				type: 'POST',
				add: function( e, data ) {
					data.submit();
				},
				done: function( e, data ) {
					water = data.result.files[ 0 ];
					var img = $('<img></img>');
					img.attr('src', water.url);
					img.appendTo(spaces[1]);
          img.load(function(){
            console.log(img.width() + ':' + img.height());





            dataSize.originWidthWm = img.width();
            dataSize.originHeightWm = img.height();
            dataSize.wmWidth = img.width();
            dataSize.wmHeight = img.height();




            if(dataSize.scaleBg !== 1){
              dataSize.wmWidth = Math.round(dataSize.wmWidth / dataSize.scaleBg);
              dataSize.wmHeight = Math.round(dataSize.wmHeight / dataSize.scaleBg);
            }



            if(dataSize.wmWidth > dataSize.bgWidth || dataSize.wmHeight > dataSize.bgHeight){

              var bgwmRatio = dataSize.bgWidth / dataSize.bgHeight;

              var wmRatio = dataSize.wmWidth / dataSize.wmHeight;

              if(bgwmRatio < wmRatio){

                dataSize.wmWidth = dataSize.bgWidth;
                dataSize.wmHeight = Math.round(dataSize.bgWidth / wmRatio);

              }
              else{

                dataSize.wmWidth = Math.round(dataSize.bgHeight * wmRatio);
                dataSize.wmHeight = dataSize.bgHeight;
              }
            }
            dataSize.scaleWm = dataSize.originWidthWm / dataSize.wmWidth;

              img.css({
                width: dataSize.wmWidth,
                height: dataSize.wmHeight
              });















            console.log(dataSize);

            // dataSize.scaleWidth = dataSize.bgWidth/dataSize.wmWidth;
            // dataSize.scaleHeight = dataSize.bgHeight/dataSize.wmHeight;
              img.css({
              // width: dataSize.wmWidth/dataSize.scaleWidth + 'px',
              // height: dataSize.wmHeight/dataSize.scaleHeight + 'px'
              height: 'auto'
              });
              // else


             //------------- Max position spinner-------------------

             var heightSpinner = dataSize.originHeightBg - dataSize.originHeightWm;

              var maxY = $( '.coordinateY' ).spinner( "option", "max", heightSpinner );

              var widthSpinner = dataSize.originWidthBg - dataSize.originWidthWm;

              var maxX = $( '.coordinateX' ).spinner( "option", "max", widthSpinner );

              maxY.spinner();
              maxX.spinner();
              //------------- End max position spinner-------------------
          });
				}
			});
	}
});


$('.download-btn').click(function() {
	var waterOpacity = $('.workspace__watermark').css('opacity')*100,
	    coordinateX = parseInt($('.workspace__watermark').css('left')) * dataSize.scaleBg,
	    coordinateY = parseInt($('.workspace__watermark').css('top')) * dataSize.scaleBg;
    console.log(coordinateX);
    console.log(coordinateY);
	console.log(waterOpacity);
	$.ajax({
		url: 'server/php/wide_merge.php',
		type: 'POST',
		data: {"water_url":water.url, "ground_url":ground.url, "water_opacity":waterOpacity, "posX":coordinateX, "posY":coordinateY},
	})
	.done(function(ans) {
		console.log("success");
		console.log(ans);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
		document.location.href="server/php/down.php?period=week&action=CSV"
	});
});

;$(document).ready(function(){
  $('.workspace__watermark').draggable({
        drag: function(event, ui){
          $('.coordinateX').val((ui.position.left * dataSize.scaleBg) ^ 0);
          $('.coordinateY').val((ui.position.top * dataSize.scaleBg) ^ 0);
        },
        cursor: "move",
        containment: "parent"

    }).filter('.workspace__background');

});

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
			var valuer = ui.value / dataSize.scaleBg;
			// var maxWidth = $('.workspace__background').width() - $('.workspace__watermark').width();
			// $('.coordinateX').attr('max', maxWidth);

			$('.workspace__watermark').css({
				left: valuer + 'px'
			});
		},
		stop: function(event, ui){
			var valuer = ui.value / dataSize.scaleBg;

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
    	var valCoordX = +$('.coordinateX').val() * dataSize.scaleBg;
    	var maxWidth = dataSize.originWidthBg - dataSize.originWidthWm;
    	if(valCoordX > maxWidth) $('.coordinateX').val(maxWidth);

	});

$('.coordinateY').keyup(function(e){
    	var valCoordY = +$('.coordinateY').val() * dataSize.scaleBg;
    	var maxHeight = dataSize.originHeightBg - dataSize.originHeightWm;
    	if(valCoordY > maxHeight) $('.coordinateY').val(maxHeight);

	});

/* //= partials/_disable.js */

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

//------------ Change language ------------


;$(document).ready(function(){
  var LANGUAGE;
  $.redrawLanguage = function (lang) {
    $.ajax({
      url : 'js/json/' + lang + '.json',
      dataType : 'json',
      success : function (response) {
        LANGUAGE = response;
        $('body').find("[data-translate]").each(function (){

          var lng = LANGUAGE[ $(this).attr('data-translate') ];
          var tag = $(this)[0].tagName.toLowerCase();
          switch (tag) //узнаем название тега
          {
          case "input":
          $(this).val(lng);
          break;
          default:
          $(this).html(lng);
          break;
          }
        });
      }
    });
  }

  $('.language__link--eng').on('click', function(e){
    e.preventDefault();
    $.redrawLanguage('eng');
  });

  $('.language__link--ru').on('click', function(e){
    e.preventDefault();
    $.redrawLanguage('ru')
  });
});

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