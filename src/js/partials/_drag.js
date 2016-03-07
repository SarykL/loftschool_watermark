;$(document).ready(function(){
  $('.workspace__square').draggable({
        drag: function(event, ui){
          $('.coordinateX').val(ui.position.left);
          $('.coordinateY').val(ui.position.top);
        },
        cursor: "move",
        containment: "parent"
    }).filter('.workspace__square');
});
