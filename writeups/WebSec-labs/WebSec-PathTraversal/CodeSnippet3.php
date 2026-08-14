<?php

$base_dir = "/var/www/images/";
$file = $_GET['filename'];

if (strpos($file, $base_dir) !== 0) 
{
    die("Access denied");
}

echo file_get_contents($file);
?>