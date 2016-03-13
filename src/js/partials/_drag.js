;$(document).ready(function(){
  $('.workspace__watermark').draggable({
        drag: function(event, ui){
          $('.coordinateX').val((ui.position.left) ^ 0);
          $('.coordinateY').val((ui.position.top) ^ 0);
        },
        cursor: "move",
        containment: "parent"

    }).filter('.workspace__background');

});
