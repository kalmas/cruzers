<?php


class SuggestController extends Zend_Controller_Action
{

    public function init()
    {
    	$this->_helper->viewRenderer->setNoRender();
    	$this->_helper->layout()->disableLayout();
    }

    public function suggestAction()
    {
        $query = $this->getRequest()->getParam("query");
    	$songsRepo = new CouchRepo\SongsRepo("http://localhost:5984");
        echo json_encode($songsRepo->getSongsAutocomplete($query));
    }



}



