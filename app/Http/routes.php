<?php

//Event::listen('illuminate.query', function($query) {
//	echo $query . '<br /><br />';
//});

/**
 * Load all routes
 */
foreach(File::allFiles(__DIR__.'/routes') as $partial)
{
    require_once $partial->getPathname();
}