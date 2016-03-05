;$(document).ready(function(){
    var op_value,
        def_value;
    $( ".sidebar-slider__block-destiny" ).slider({
      range: "min",
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.01,
      create: function(event, ui) {
        def_value = $(this).slider( "values", 0 );
        $('.sidebar-position-content').css({ opacity : def_value });
      },
      slide: function(event, ui) {
        op_value = $(this).slider( "values", 0 );
        $('.sidebar-position-content').css({ opacity : op_value });
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
});

