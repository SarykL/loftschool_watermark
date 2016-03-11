// creates uploaded file name appearing in input
/**/
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
	        var ground = data.result.files[ 0 ],
	        	img = $('<img></img>').css({
	        		position: 'static'
	        	});
	    	img.attr('src', ground.url);
	    	img.appendTo(spaces[0]);
			var result = $.ajax({
				url: '../server/php/merge.php',
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
	        	img = $('<img></img>').css({
	        		position: 'absolute'
	        	});
	    	img.attr('src', water.url);
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
	url: 'merge.php',
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