// creates uploaded file name appearing in input
/**/
var dataSize = {
	canvasWidth: 650,
	canvasHeight: 530,
	bgWidth: 0,
	bgHeight: 0,
	wmHeight: 0,
	wmWidth: 0,
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
						dataSize.bgWidth = img.width();
						dataSize.bgHeight = img.height();
						console.log(dataSize);
						if (dataSize.bgWidth >= dataSize.canvasWidth & dataSize.bgWidth > dataSize.bgHeight) {
							//  if widthbg> canvas &
							img.css({
								width: '100%',
								height: 'auto'
							});
							
						} else {
						// if (dataSize.bgHeight >= dataSize.canvasHeight & dataSize.bgHeight > dataSize.bgWidth) {
							img.css({
								height: dataSize.canvasHeight + 'px',
								width: 'auto'
							});
						}
						if (dataSize.bgWidth < dataSize.canvasWidth & dataSize.bgWidth > dataSize.bgHeight) {
							img.css({
								width: dataSize.canvasWidth,
								height: 'auto'
							});
						} 
						else{
							img.css({
								height: dataSize.canvasHeight + 'px',
								width: 'auto'
							});
						}
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
					img.load(function(){
						console.log(img.width() + ':' + img.height());
						dataSize.wmWidth = img.width();
						dataSize.wmHeight = img.height();
						console.log(dataSize);
						dataSize.scaleWidth = dataSize.bgWidth/dataSize.wmWidth;
						dataSize.scaleHeight = dataSize.bgHeight/dataSize.wmHeight;
							img.css({
							width: dataSize.wmWidth/dataSize.scaleWidth + 'px',
							// height: dataSize.wmHeight/dataSize.scaleHeight + 'px'
							height: 'auto'
							});
							// else



						 //------------- Max position spinner-------------------

						 var heightSpinner = $('.workspace__background').height() - $('.workspace__watermark').height();

							var maxY = $( '.coordinateY' ).spinner( "option", "max", heightSpinner );

							var widthSpinner = $('.workspace__background').width() - $('.workspace__watermark').width();

							var maxX = $( '.coordinateX' ).spinner( "option", "max", widthSpinner );

							maxY.spinner();
							maxX.spinner();

							//------------- End max position spinner-------------------
				 	});
					img.appendTo(spaces[1]);
				}
			});
	}
});


$('.download-btn').click(function() {
	waterOpacity = $('.workspace__watermark').css('opacity')*100;

	console.log(waterOpacity);
	$.ajax({
		url: 'server/php/wide_merge.php',
		type: 'POST',
		data: {"water_url":water.url, "ground_url":ground.url, "water_opacity":waterOpacity},
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
	});	
});