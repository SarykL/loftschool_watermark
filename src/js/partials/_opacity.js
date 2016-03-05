;$(document).ready(function(){
    $( ".sidebar-slider__block-destiny" ).slider({
      range: "min",
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.01,
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.value );
      }

    
     
    });
    $( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
    
    //Opacity
    $(".sidebar-slider__block-destiny").slider({
    slide: function(event, ui) {
      $('.sidebar-position-content').css({ opacity : ui }); 
        console.log(ui);
    }
    })

    /*$(".sidebar-position-square").css({
      opacity: 'value1'
    });


    $('#ToTop').css({ opacity : 1 }); 
    */
});

