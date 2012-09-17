<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    protected function _initDoctype()
    {
        $this->bootstrap('view');
        $view = $this->getResource('view');
        $view->doctype('XHTML1_STRICT');
    }
    
    protected function _initRoutes() {
    	//die("herer");
    	$this->bootstrap('FrontController');
    	$front = $this->getResource('FrontController');
    	$front->getRouter()->addDefaultRoutes();
    	
    	$route = new Zend_Controller_Router_Route(
			'suggest/:query',
			array(
				'controller' => 'suggest',
				'action' => 'suggest'
			)
		);
		$front->getRouter()->addRoute('suggest', $route);
    }
}

