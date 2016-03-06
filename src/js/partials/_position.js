$(document).ready(function(){
  $('.sidebar-position__link').on('click', function(e){
    e.preventDefault();
    var aTTr = $(this).attr('data-position');
    console.log(aTTr)
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





// Реализовать второй спинер  .coordinateX .coordinateY

  $('.position-input').spinner({
    icons:{ down: "ui-spinner-down",
            up: "ui-spinner-up" },
    spin: function(event, ui){
      var valuer = ui.value;
      $('.workspace__square').css({
        left: valuer + 'px',
        // top: valuer + 'px'
      })
    },
    min: 0,
    max: $('.workspace__unit').width() - $('.workspace__square').width()   // Рассмотреть overflov

  })

});

