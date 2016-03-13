<?php
// подключаем библиотеку
include 'lib/WideImage.php';

$ground_url = $_POST['ground_url'];
$water_url = $_POST['water_url'];


// основной фон
$img = substr($ground_url, 23);


// водяной знак
$wm = substr($water_url, 23);;

echo json_encode($wm);
echo json_encode($img);

$alpha = 40;
$posX = 150;
$posY = 200;
$img = WideImage::load($ground_url);
$watermark = WideImage::load($water_url);
$new = $img->merge($watermark, $posX, $posY, $alpha);
$new->saveToFile('image.jpg');


?>