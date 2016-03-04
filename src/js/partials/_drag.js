$(function() {

    $('.workspace__square').draggable({
        containment: "parent"
    }).filter('.workspace__square').draggable("option", "axis", "x");

});