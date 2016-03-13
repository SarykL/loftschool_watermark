// creates uploaded file name appearing in input
/**/
;var uploadModule = (function () {
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
	  });

	var uploads = [ '#fileupload', '#watermark' ],
	    spaces = ['.workspace__unit','.workspace__square'];
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
		    	img.appendTo(spaces[0]);
		      }
		    })
		} else if ( item == '#watermark' ) {
		    $(item).fileupload({
		      dataType: 'json',
		      url: 'server/php/',
		      add: function( e, data ) {
		        data.submit();
		      },
		      done: function( e, data ) {
		        water = data.result.files[ 0 ];
		        var img = $('<img></img>').css({
		        		position: 'absolute'
		        	});
		    	img.attr('src', water.url);
		    	img.appendTo(spaces[1]);
				$.ajax({
					url: 'server/php/wide_merge.php',
					type: 'POST',
					data: {"water_url":water.url, "ground_url":ground.url},
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
		};
	});
})();