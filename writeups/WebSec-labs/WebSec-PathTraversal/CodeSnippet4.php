<?php

$base_dir = "/var/www/images/";
$file = $_GET['filename'];

if (!str_ends_with($file, ".jpg")) 
{
    die("Invalid file type");
}

$path = $base_dir . $file;

echo file_get_contents($path);
?>