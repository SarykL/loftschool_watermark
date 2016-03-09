//------------ Change language ------------

var ru = ['Генератор водяных знаков',
          'Настройки',
          'Исходное изображение',
          'Загрузите изображение',
          'Водяной знак',
          'Загрузите изображение',
          'Положение',
          'Прозрачность',
          'Сброс',
          'Скачать',
          '© 2016, Это мой сайт, пожалуйста, не копируйте и не воруйте его'],
    eng =['Watermarks generator',
          'Settings',
          'Original image',
          'Download image',
          'Watermark',
          'Download image',
          'Place',
          'Transparency',
          'Reset',
          'Download',
          '© 2016, This is my website , please do not copy or steal it'];

function translate(lang) {
  var i=0;
  $(".lng").each(function() {
   if (lang[i]) {
    $(this).html(lang[i]);
   }
   ++i;
  });
  };

$('.language__link--eng').on('click', function(e){
  e.preventDefault();
  translate(eng)
});

$('.language__link--ru').on('click', function(e){
  e.preventDefault();
  translate(ru)
});

