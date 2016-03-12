// creates uploaded file name appearing in input
/**/
var dataSize = {
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
	        var ground = data.result.files[ 0 ],
	        	img = $('<img></img>').css({
	        		position: 'static'
	        	});
	    	img.attr('src', ground.url);
	    	img.load(function(){
                   console.log(img.width() + ':' + img.height());
                   dataSize.bgWidth = img.width();
                   dataSize.bgHeight = img.height();
                   console.log(dataSize);
					//  if widthbg> canvas &
		    	img.css({
		    		width: '100%',
		    		height: 'auto'
		    	});
		    	// else
               });
	    	img.appendTo(spaces[0]);
			var result = $.ajax({
				url: 'server/php/merge.php',
				type: 'POST',
				dataType: 'json',
				data: ground,
			});
			console.log(e);
			return result;
	      }


	    });
	} else if ( item == '#watermark' ) {
	    $(item).fileupload({
	      dataType: 'json',
	      url: 'server/php/',
	      add: function( e, data ) {
	        data.submit();
	      },
	      done: function( e, data ) {
	        var water = data.result.files[ 0 ],

	        	img = $('<img></img>');
            // var maxHeightSp = dataSize.bgHeight - dataSize.wmHeight;

          //   .css({
	        	// 	position: 'absolute'
	        	// });

	    	img.attr('src', water.url);
		    	img.load(function(){
           // console.log(img.width() + ':' + img.height());
           dataSize.wmWidth = img.width();
           dataSize.wmHeight = img.height();

           //------------- Max position spinner-------------------

           var heightSpinner = $('.workspace__background').height() - $('.workspace__watermark').height();

            var maxY = $( '.coordinateY' ).spinner( "option", "max", heightSpinner );

            var widthSpinner = $('.workspace__background').width() - $('.workspace__watermark').width();

            var maxX = $( '.coordinateX' ).spinner( "option", "max", widthSpinner );

            maxY.spinner();
            maxX.spinner();

            //------------- End max position spinner-------------------



           // console.log(dataSize);
			//  if widthbg> canvas &

			// dataSize.scaleWidth = dataSize.bgWidth/dataSize.wmWidth;
			// dataSize.scaleHeight = dataSize.bgHeight/dataSize.wmHeight;
    	img.css({
			width: dataSize.wmWidth/dataSize.scaleWidth + 'px',
	    		// height: dataSize.wmHeight/dataSize.scaleHeight + 'px'
	    		height: 'auto'
    	});
    	// else
       });
	    	img.appendTo(spaces[1]);
			$.ajax({
				url: '../server/php/merge.php',
				type: 'POST',
				dataType: 'json',
				data: water,
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
	      }
	    });
	}
});

$.ajax({
	url: '../server/php/merge.php',
	type: 'POST',
	dataType: 'json',
	data: 'water',
})
.done(function(ans) {
	console.log("success");
	console.log(ans);
})
.fail(function() {
	console.log("error123");
})
.always(function() {
	console.log("complete123");
});

	/*
	var mergephp = 'server/php/merge.php'
	$.ajax({
		url: mergephp,
		type: 'POST',
		dataType: 'json',
	}).fail( function (ans) {
		console.log('проблемы в PHP');
	});
		//console.log(result);
//===============================================
		var res1 = 'dfgsdfgsdf';
		console.log(data);
		$.ajax({
			url: '../server/php/merge.php',
			type: 'POST',
			dataType: 'json',
			data: res1,
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});*/





/*
    $(item).fileupload({
      dataType: 'json',
      url: 'server/php/',
      add: function( e, data ) {
        console.log( 'add' );
        data.submit();
      },
      done: function( e, data ) {
        var upload = data.result.files[ 0 ],
        	img = $('<img></img>');
        console.log( upload );
        console.log(current);
        console.log(upload.url);
    	img.attr('src', upload.url);
    	img.appendTo(spaces[0]);
      }
    });
*/