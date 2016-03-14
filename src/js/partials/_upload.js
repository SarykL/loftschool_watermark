// creates uploaded file name appearing in input
/**/
;

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

var spaces = ['.workspace__background','.workspace__watermark'];

		$('#fileupload').fileupload({
			url: 'server/php/',
			type: 'POST',
			add: function(e, data) {
				var uploadErrors = [];
				var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
				if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
						$('span.fake__placeholder').empty();
						uploadErrors.push('Файл не того формата');
				}
				if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 5000000) {
						uploadErrors.push('Файл слишком большой');
				}
				if(uploadErrors.length > 0) {
						alert(uploadErrors.join("\n"));
				} else {
					if($('.workspace__background').find('.bg-load')){
					$('.workspace__background').find('.bg-load').remove();
				}
						data.submit();
				}
			},
			done: function( e, data ) {
				ground = data.result.files[ 0 ];
				var img = $('<img class="bg-load"></img>');
				img.css({
						position: 'static',
						verticalAlign: 'middle'
					});
					img.attr('src', ground.url);
					img.load(function(){
						console.log(img.width() + ':' + img.height());
						dataSize.originWidthBg = img.width();
						dataSize.originHeightBg = img.height();
						dataSize.bgWidth = img.width();
						dataSize.bgHeight = img.height();

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

		$('#watermark').fileupload({
			dataType: 'json',
			url: 'server/php/',
			type: 'POST',
			add: function(e, data) {
						var uploadErrors = [];
						var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
						if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
								$('span.fake__placeholder').empty();
								$('#fileupload').on('change', function () {
									$('.watermark__section_disable').hide();
								});
								uploadErrors.push('Файл не того формата');
						}
						if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 5000000) {
								uploadErrors.push('Файл слишком большой');
						}
						if(uploadErrors.length > 0) {
								alert(uploadErrors.join("\n"));
						} else {
						if($('.workspace__watermark').find('img').length){
								$('.workspace__watermark').find('img').remove();
								$('.workspace__watermark').css({left : 0});
								$('.workspace__watermark').css({top : 0});
								$('.position-input').spinner('value', 0);
								$('.sidebar-position__link').removeClass('sidebar-position__link--active');
						}
						$('#fileupload').on('change', function () {
							$('.workspace__watermark').css({left : 0});
							$('.workspace__watermark').css({top : 0});
							$('.position-input').spinner('value', 0);
						});		            data.submit();
							}
			},
			done: function( e, data ) {
				water = data.result.files[ 0 ];
				var img = $('<img></img>');
				img.css({
					verticalAlign: 'middle'
				});
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

					 var heightSpinner = dataSize.bgHeight - dataSize.wmHeight;

						var maxY = $( '.coordinateY' ).spinner( "option", "max", heightSpinner );

						var widthSpinner = dataSize.bgWidth - dataSize.wmWidth;

						var maxX = $( '.coordinateX' ).spinner( "option", "max", widthSpinner );

						maxY.spinner();
						maxX.spinner();
						//------------- End max position spinner-------------------
				});
			}
		});


$('.download-btn').click(function() {
	var waterOpacity = $('.workspace__watermark').css('opacity')*100,
			coordinateX = parseInt($('.workspace__watermark').css('left')) * dataSize.scaleBg,
			coordinateY = parseInt($('.workspace__watermark').css('top')) * dataSize.scaleBg;
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