//= partials/_opacity.js

// creates uploaded file name appearing in input
       $('input[type="file"]').on('change', function () {
           var file = ($(this)).val();
           var fileName = file.split('\\');
           fileName = fileName[fileName.length - 1];
           $(this)
           .parent()
           .siblings('.fake__input')
           .find('.fake__placeholder')
           .text(fileName);
       });