<?php

if (isset($_POST["link"])) {
	$data = [
		"status" => -1,
		"time" => -1,
		"raw" => "null",
	];
	
	$start_time = round(microtime(true) * 1000);

	$headers = get_headers($_POST["link"]);

	$end_time = round(microtime(true) * 1000);

	$data["status"] = substr($headers[0], 9, 3);
	$data["time"] = $end_time - $start_time;
	$data["raw"] = $headers;

	echo json_encode($data);
}
