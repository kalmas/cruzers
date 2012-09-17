<?php

namespace CouchRepo;
use Data\Song;

use Data;

class SongsRepo extends CouchRepo{
	
	public function __construct($couchServerUri){
		parent::__construct($couchServerUri, "songs");
	}
	
	public function save(Song $song){
		parent::save($song, "song");
	}
	
	public function getSongsAutocomplete($string){
		//die($this->getViewQueryUri("songsByTitle", array($string, $string . '\u9999')));
		//die($this->getViewQueryUri("songsByTitle", array($string, $string . '\u9999'), 10));
		$this->httpClient->setUri(
				$this->getViewQueryUri("songsByTitle", array($string, $string . '\u9999'), 10)
			);
		$response = $this->httpClient->request(\Zend_http_Client::GET);
		$results = $this->map($response->getBody());
		return $results;
		
	}
	
	public function map($json){
		$response = json_decode($json);
		if(!isset($response->rows)) return array();
		$results = array();
		foreach ($response->rows as $row){
			$song = new Song();
			$song->_id = $row->value->_id;
			$song->artist = $row->value->artist;
			$song->code = $row->value->code;
			$song->title = $row->value->title;
			$results[] = $song;			
		}
		return $results;
	}

	
}