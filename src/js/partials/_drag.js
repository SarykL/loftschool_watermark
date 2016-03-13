;$(document).ready(function(){
  $('.workspace__watermark').draggable({
        drag: function(event, ui){
          $('.coordinateX').val((ui.position.left * dataSize.scaleBg) ^ 0);
          $('.coordinateY').val((ui.position.top * dataSize.scaleBg) ^ 0);
        },
        cursor: "move",
        containment: "parent"

    }).filter('.workspace__background');

});
