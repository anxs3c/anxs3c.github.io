<?php

$file = $_GET['filename'];

if (strpos($file, '../') !== false) 
{ 
    die("Invalid input detected");
}

$file = urldecode($file);
$path = $file;

echo file_get_contents($path);
?>