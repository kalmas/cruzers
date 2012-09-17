<?php 
// Define path to application directory
defined('APPLICATION_PATH')
|| define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

// Define application environment
defined('APPLICATION_ENV')
|| define('APPLICATION_ENV', (getenv('ServerEnvironment') ? getenv('ServerEnvironment') : 'production'));

// We will be assuming a Globally available ZendFramework, however
// we still would like to include the local Library path for shared
// code between multi-site domains
set_include_path(implode(PATH_SEPARATOR, array(
realpath(APPLICATION_PATH . '/../library'),
realpath(APPLICATION_PATH . '/../scripts'),
get_include_path(),
)));

if (!defined('LIB_CURL_PORT')) define('LIB_CURL_PORT', 80);

/** Zend_Application */
require_once 'Zend/Application.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
		APPLICATION_ENV,
		APPLICATION_PATH . '/configs/application.ini'
);
$application->bootstrap();

?>