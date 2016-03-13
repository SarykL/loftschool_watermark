<?php
include 'lib/WideImage.php';

$ground_url = $_POST['ground_url'];
$water_url = $_POST['water_url'];

// исходное изображение
$img = substr($ground_url, 23);

// imagecreatefrompng - создаёт новое изображение из файла или URL
// водяной знак
$wm = substr($water_url, 23);;
echo json_encode($wm);
echo json_encode($img);
//==================================================

if(preg_match("/.gif/i",$img)):
	$wm=imagecreatefromgif($wm);
elseif(preg_match("/.jpeg/i",$img) or preg_match("/.jpg/i",$img)):
	$wm=imagecreatefromjpeg($wm);
elseif(preg_match("/.png/i",$img)):
	$wm=imagecreatefrompng($wm);
else:
	die("Ошибка! Неизвестное расширение изображения1");
endif;

//=================================================


// imagesx - получает ширину изображения
$wmW=imagesx($wm);

// imagesy - получает высоту изображения
$wmH=imagesy($wm);

// imagecreatetruecolor - создаёт новое изображение true color
$image=imagecreatetruecolor($wmW, $wmH);




// выясняем расширение изображения на которое будем накладывать водяной знак
if(preg_match("/.gif/i",$img)):
	$image=imagecreatefromgif($img);
elseif(preg_match("/.jpeg/i",$img) or preg_match("/.jpg/i",$img)):
	$image=imagecreatefromjpeg($img);
elseif(preg_match("/.png/i",$img)):
	$image=imagecreatefrompng($img);
else:
	die("Ошибка! Неизвестное расширение изображения");
endif;
// узнаем размер изображения
$size=getimagesize($img);


// imagecolorallocatealpha - делаем изображение прозрачным
$alpha = 110;
imagecolorallocatealpha($image, 0, 0, 0, $alpha);


// указываем координаты, где будет располагаться водяной знак
/*
* $size[0] - ширина изображения
* $size[1] - высота изображения
* - 10 -это расстояние от границы исходного изображения
*/
$cx=$size[0]-$wmW-40;
$cy=$size[1]-$wmH-10;

/* imagecopyresampled - копирует и изменяет размеры части изображения
* с пересэмплированием
*/
imagecopyresampled ($image, $wm, $cx, $cy, 0, 0, $wmW, $wmH, $wmW, $wmH);

/* imagejpeg - создаёт JPEG-файл filename из изображения image
* третий параметр - качество нового изображение 
* параметр является необязательным и имеет диапазон значений 
* от 0 (наихудшее качество, наименьший файл)
* до 100 (наилучшее качество, наибольший файл)
* По умолчанию используется значение по умолчанию IJG quality (около 75)
*/
imagejpeg($image,$img,90);

// imagedestroy - освобождает память
imagedestroy($image);

imagedestroy($wm);

// на всякий случай
unset($image,$img);


exit;
?>