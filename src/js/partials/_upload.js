// creates uploaded file name appearing in input
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


  $('#fileuploads').fileupload({
      url: 'js/libs/upload/server/php/',
      add: function (e, data) {
        console.log('add');
        data.submit();
      },
      done: function (e, data) {
        console.log('done');
      }
  });

  // $( '.fileupload__input' ).fileupload({
  //   url: '../dist/server/php',
  //   dataType: 'json',
  //   add: function (e, data) {
  //     imgName = data.files[0].name;
  //     if (!(imgName.match(/\.(jpeg|jpg|png|gif)$/i))) {
  //       $(this).parent().siblings('.error_message').css('font-size','14px'); // показываем предупреждение что не картинка
  //       return;
  //     } else {
  //       $(this).parent().siblings('.error_message').css('font-size','0');
  //       data.formData = {
  //         img: data.files[0]
  //       };
  //       data.submit(); // отправляем данные на сервер
  //       console.log('add');
  //     }
  //   }
  // });
