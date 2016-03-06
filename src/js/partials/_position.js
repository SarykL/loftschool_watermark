$('.sidebar-position__link').on('click', function(e){
  e.preventDefault();
  var aTTr = $(this).attr('data-position');
  $('.workspace__square').position({
    my: aTTr,
    at: aTTr,
    of: '.workspace__unit',
    collision: 'none'
  });
})