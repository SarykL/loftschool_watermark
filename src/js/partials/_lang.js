//------------ Change language ------------


;$(document).ready(function(){
	var LANGUAGE;
	$.redrawLanguage = function (lang) {
		$.ajax({
			url : 'js/json/' + lang + '.json',
			dataType : 'json',
			success : function (response) {
				LANGUAGE = response;
				$('body').find("[data-translate]").each(function (){

					var lng = LANGUAGE[ $(this).attr('data-translate') ];
					var tag = $(this)[0].tagName.toLowerCase();
					switch (tag) //узнаем название тега
					{
					case "input":
					$(this).val(lng);
					break;
					default:
					$(this).html(lng);
					break;
					}
				});
			}
		});
	};

	$('.language__link--eng').on('click', function(e){
		e.preventDefault();
		if(!($('.fake__placeholder').text() === "Загрузите изображение" || $('.fake__placeholder').text() === "Download image")){
			$.redrawLanguage('eng');
		} 
	});

	$('.language__link--ru').on('click', function(e){
		e.preventDefault();
		if (!($('.fake__placeholder').text() === "Загрузите изображение" || $('.fake__placeholder').text() === "Download image")){
			$.redrawLanguage('ru');
		}
	});
});