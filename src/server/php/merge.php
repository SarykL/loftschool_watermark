<?php
	include 'WideImage.php';
	$result1 = $POST['ground'];;
	$result1 = $POST['water'];
	$watermark = WideImage::load($result1);
	$base = WideImage::load('files/woman.jpg');
	$result = $base->merge($watermark, "right - 10", "bottom - 10", 50);
	// applies a logo aligned to bottom-right corner with a 10 pixel margin
	header("Content-Type: application/json");
	echo json_encode($result);
	exit;
?>
 ?>