// creates uploaded file name appearing in input
$('input[type="file"]').on('change', function () {
   var file = ($(this)).val();
   var fileName = file.split('\\');
   var fileType = ('.' + file.split('.')[1]);
   var fileTypes = ['.jpeg', '.png', '.jpg', '.bmp', '.tiff'];

   if (($.inArray(fileType, fileTypes)) == -1) {
     console.log('stop');
     file = 'Загрузите изображение';
     return false;
   } else {
     console.log('ok');
   }
   fileName = fileName[fileName.length - 1];
   $(this)
   .parent()
   .siblings('.fake__input')
   .find('.fake__placeholder')
   .text(fileName);


});
