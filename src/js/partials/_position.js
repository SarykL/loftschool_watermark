$(document).ready(function(){
  $('.sidebar-position__link').on('click', function(e){
    e.preventDefault();
    var aTTr = $(this).attr('data-position');
    $('.workspace__square').position({
      my: aTTr,
      at: aTTr,
      of: '.workspace__unit',
      collision: 'none',
    });
    var positionX = $('.workspace__square').position().left;
    var positionY = $('.workspace__square').position().top;
    $('.coordinateX').val(positionX);
    $('.coordinateY').val(positionY);
  });
});