<?php

if (isset($_POST["link"])) {
	$data = [
		"status" => -1,
		"time" => -1,
		"headers" => "null",
		"content" => "null",
	];
	
	$start_time = round(microtime(true) * 1000);
	$content = file_get_contents($_POST["link"]);
	$end_time = round(microtime(true) * 1000);

	$headers = $http_response_header;

	$data["status"] = substr($headers[0], 9, 3);
	$data["time"] = $end_time - $start_time;
	$data["headers"] = $headers;
	$data["content"] = $content;

	echo json_encode($data);
}
