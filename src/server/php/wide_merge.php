<?php
// подключаем библиотеку
include 'lib/WideImage.php';

$ground_url = $_POST['ground_url'];
$water_url = $_POST['water_url'];
//$water_opacity = $_POST['water_opacity'];

// основной фон
$img = substr($ground_url, 23);


// водяной знак
$wm = substr($water_url, 23);;

echo json_encode($wm);
echo json_encode($img);

$alpha = $_POST['water_opacity'];
$posX = $_POST['posX'];;
$posY = $_POST['posY'];;
$img = WideImage::load($ground_url);
$watermark = WideImage::load($water_url);
$new = $img->merge($watermark, $posX, $posY, $alpha);
$new->saveToFile('image.jpg');


?>