<?php
	
	$name = $_POST['projectName'];
	$data = array();

	
	$data['mes'] = 'OK';

	header("Content-Type: application/json");
	echo json_encode($data);
	exit;


 ?>