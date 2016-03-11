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
    var mainImg = $( '#fileupload' ),
      	watermark = $( '#watermark' ),
      	current;
    if ( item == '#fileupload' ) {
	    $(item).fileupload({
	      dataType: 'json',
	      url: '/php/',
	      add: function( e, data ) {
	        console.log( 'add' );
	        data.submit();
	      },
	      done: function( e, data ) {
	        var upload = data.result.files[ 0 ],
	        	img = $('<img></img>').css({
	        		position: 'static'
	        	});
	    	img.attr('src', upload.url);
	    	img.appendTo(spaces[0]);
	      }
	    });
    } else if ( item == '#watermark' ) {
	    $(item).fileupload({
	      dataType: 'json',
	      url: '/php/',
	      add: function( e, data ) {
	        console.log( 'add' );
	        data.submit();
	      },
	      done: function( e, data ) {
	        var upload = data.result.files[ 0 ],
	        	img = $('<img></img>').css({
	        		position: 'absolute'
	        	});
	        console.log( upload );
	        console.log(current);
	        console.log(upload.url);
	    	img.attr('src', upload.url);
	    	img.appendTo(spaces[1]);
	      }
	    });
    }

  } );


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