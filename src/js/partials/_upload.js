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

var uploads = [ '#fileupload', '#watermark' ];
  $.each( uploads, function( index, item ) {
    var mainImg = $( '#fileupload' ),
      watermark = $( '#watermark' ),
      current;
    if ( item == '#fileupload' ) {
      current = mainImg;
    } else if ( item == '#watermark' ) {
      current = watermark;
    }

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
    	img.appendTo('.workspace__square');
      }
    });

  } );
