// creates uploaded file name appearing in input
/*$('input[type="file"]').on('change', function () {
	var file = ($(this)).val();
	var fileName = file.split('\\');
	fileName = fileName[fileName.length - 1];
	$(this)
	.parent()
	.siblings('.fake__input')
	.find('.fake__placeholder')
	.text(fileName);
 });*/

 ;$(document).ready(function(){
	$(function () {
	    'use strict';
	    // Initialize the jQuery File Upload widget:
	    $('#fileupload').fileupload({
	        // Uncomment the following to send cross-domain cookies:
	        //xhrFields: {withCredentials: true},
	        url: 'server/php/',
	        add: function(e, data) {
	        	console.log('add');
	        	data.submit();
	        },
	        done: function(e, data) {
	        	console.log('done');
	        }	        

	    });
	});
});