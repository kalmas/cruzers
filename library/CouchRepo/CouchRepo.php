<?php

namespace CouchRepo;

class CouchRepo{
	public $couchServerUri;
	public $database;
	public $httpClient;
	
	public function __construct($couchServerUri, $database){
		$this->couchServerUri = $couchServerUri;
		$this->database = $database;
		$this->httpClient = new \Zend_Http_Client();
		$this->httpClient->setConfig(array(
				'maxredirects' => 5,
				'timeout'      => 30));
		$this->httpClient->setMethod(\Zend_Http_Client::GET);
	}
	
	public function getDocumentUri($documentId){
		$uri = $this->couchServerUri;
		$uri .= '/' . $this->database . '/';
		$uri .= $documentId;
		return $uri;
	}
	
	public function getViewQueryUri($viewName, $key, $limit = null){
		$path = $this->couchServerUri;
		$path .= '/' . $this->database . '/';
		$path .= '_design/' . $this->database . '/_view/';
		$path .= $viewName;
		if (is_array($key)){
			$start = urlencode(sprintf('"%s"', $key[0]));
			$end = urlencode(sprintf('"%s"', $key[1]));
			$query = sprintf('startkey=%s&endkey=%s', $start, $end);
		} else {
			$query = sprintf('key="%s"', $key);
		}
		if(isset($limit)){
			$query = $query . sprintf('&limit=%s', $limit);
		}
		return $path . '?' . $query;
	}
	
	public function save($object, $type = null){
		if ($type != null) $object->type = $type;
		$id = $object->_id;
		unset($object->_id);
		$json = json_encode($object);
		$this->httpClient->setRawData($json)->setEncType("application/json");
		$this->httpClient->setUri($this->getDocumentUri($id));
	
		$return = $this->httpClient->request(\Zend_Http_Client::PUT);
		$this->httpClient->setMethod(\Zend_Http_Client::GET);
		return $return;
	}
	
	
}