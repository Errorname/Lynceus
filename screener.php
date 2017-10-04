<?php

require __DIR__ . '/vendor/autoload.php';

use Screen\Capture;

if (!isset($_GET['w'])) {
	exit();
}

$screen = new Capture($_GET['w']);

/* If you are on mac, uncomment the following line */
// $screen->setBinPath('/usr/local/Cellar/phantomjs/2.1.1/bin/');

$screen->setWidth('1200')
		->setHeight('800')
		->setClipWidth('1200')
		->setClipHeight('800')
		->setImageType('png')
		->save('tmp/screenshot.png',true);

header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.
header('Content-Type:' . $screen->getImageType()->getMimeType());
header('Content-Length: ' . filesize($screen->getImageLocation()));
readfile($screen->getImageLocation());
