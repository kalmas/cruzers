<?php
$dataDir = "../data/";
$originalFile = $dataDir . "songlist/allpagesrawtouched.txt";
$strippedFile = $dataDir . "songlist/1";
$parsedFile = $dataDir . "songlist/2.csv";

$filestring = file_get_contents($originalFile);
$filestring = preg_replace('/songlist.*\n/i', '', $filestring);
$filestring = preg_replace('/\.\d\..*\n/', '', $filestring);
$filestring = preg_replace('/1 - 13089.*\n/', '', $filestring);
$filestring = preg_replace("/[A-Z]\n/", "", $filestring);
$filestring = str_replace('|', '', $filestring);
$filestring = str_replace('"', '', $filestring);
$filestring = preg_replace('/\n\n/s', "\n", $filestring);
$filestring = preg_replace('/\n\n/s', "\n", $filestring);
$filestring = preg_replace('/\n\n/s', "\n", $filestring);
$filestring = preg_replace('/\n\n/s', "\n", $filestring);
$filestring = preg_replace('/\n\n/s', "\n", $filestring);
$filestring = preg_replace('/\n\n/s', "\n", $filestring);
$filestring = preg_replace('/\n\n/s', "\n", $filestring);
$filestring = preg_replace('/\n\n/s', "\n", $filestring);
file_put_contents($strippedFile, $filestring);

$inhandle = fopen($strippedFile, "r");
$outhandle = fopen($parsedFile, "w");
if (!$inhandle || !$outhandle) exit();

function printLine(array $row, $outhandle){
	$line = implode("|", $row);
	fputs($outhandle, $line. "\n");
}

function getNextLine($inhandle, $outhandle, array $row){
	if(($next = fgets($inhandle)) === false){
		// dump array
		printLine($row, $outhandle);
		// die
		fclose($inhandle);
		fclose($outhandle);
		die();
	}
	return $next;
}

function couldBeNewLine($str){
	if(is_numeric($str)) return true;
	$words = explode(" ", $str);
	if(is_numeric($words[0]) && $words[0] > 10) return true;
	return false;
}

$row = array();
$col = 0;
$in = getNextLine($inhandle, $outhandle, $row);

$next=false;

while (true) {
	$str = trim($in);
	if($col == 1 || $col == 2){
		if(couldBeNewLine($str)){
			printLine($row, $outhandle);
			$col = 0;
			continue;
		}
	}
	switch ($col){
		case 0:
			// Look for song code
			if(is_numeric($str)){
				$row[$col] = $str;
				$col = $col + 1;
				$in = getNextLine($inhandle, $outhandle, $row);
				continue;
			} else {
				// see if string is numeric but ended up with spaces in it
				$collapsed = preg_replace( '/\s+/', '', $str);
				if(is_numeric($collapsed)){
					$row[$col] = $collapsed;
					$col = $col + 1;
					$in = getNextLine($inhandle, $outhandle, $row);
					continue;
				}				
				
				// see if the code was stuck on the front of the next field
				$words = explode(" ", $str);
				if(is_numeric($words[0])){
					$row[$col] = $words[0];
					$col = $col + 1;
					$in = str_replace($words[0], "", $str);
					continue;
				} else {
					// skip along to song title
					$row[$col] = "";
					$col = $col + 1;
					$in = $str;
				}
			}
			break;
		case 1:
			// look for song title
			$row[$col] = $str;
			$col = $col + 1;
			$in = getNextLine($inhandle, $outhandle, $row);
			break;
		case 2:
			// look for artist
			$row[$col] = $str;
			$col = $col + 1;
			$in = getNextLine($inhandle, $outhandle, $row);
			break;
		case 3:
			// print
			printLine($row, $outhandle);
			$row = array();
			$col = 0;
			break;
	}
	
}





?>
