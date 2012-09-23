<?php
set_include_path(get_include_path() . ":" . "/usr/share/php/ZendFramework-1.12.0/library");

use CouchRepo\SongsRepo;
use Data\Song;

include_once 'Bootstrap.php';

$inputFile = "/home/kyle/songlist.csv";
$handle = fopen($inputFile, "r");

if ($handle) {
	$repo =  new SongsRepo("http://localhost:5984/", "songs");
	$i = 0;
	while (($line = fgets($handle, 4096)) !== false) {
		$row = explode("|", trim($line));
		if(empty($row[0])) continue;
		$code = (isset($row[0])) ? trim($row[0]) : "";
		$title = (isset($row[1])) ? trim($row[1]) : "";
		$artist = (isset($row[2])) ? trim($row[2]) : "";
		$song = new Song();
		$song->_id = $i;
		$song->code = $code;
		$song->title = $title;
		$song->artist = $artist;		
		$repo->save($song);
		$i++;
	}
	if (!feof($handle)) {
		echo "Error: unexpected fgets() fail\n";
	}
	fclose($handle);
}


?>
