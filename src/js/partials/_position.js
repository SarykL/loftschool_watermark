//----------- Position block -------------

$(document).ready(function(){
  $('.sidebar-position__link').on('click', function(e){
    e.preventDefault();

    var aTTr = $(this).attr('data-position');

    $('.sidebar-position__link').removeClass('sidebar-position__link--active')
    $(this).addClass('sidebar-position__link--active')

    $('.workspace__square').position({
      my: aTTr,
      at: aTTr,
      of: '.workspace__unit',
      collision: 'none',
    });
    var positionX = $('.workspace__square').position().left;
    var positionY = $('.workspace__square').position().top;
    var mathPositionX = positionX ^ 0;
    var mathPositionY = positionY ^ 0;
    $('.coordinateX').val(mathPositionX);
    $('.coordinateY').val(mathPositionY);
  });

//--------------- Spinner ---------------

  $('.coordinateX').spinner({
    spin: function(event, ui){
      var valuer = ui.value;

      $('.workspace__square').css({
        left: valuer + 'px'
      })


    },

    min: 0,
    max: $('.workspace__unit').width() - $('.workspace__square').width()
  });


  $('.coordinateY').spinner({
    spin: function(event, ui){
      var valuer = ui.value;

      $('.workspace__square').css({
          top: valuer + 'px'
        })

    },

    min: 0,
    max: $('.workspace__unit').height() - $('.workspace__square').height()
  });
});