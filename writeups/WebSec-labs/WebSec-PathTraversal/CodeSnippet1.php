<?php

$file = $_GET['filename'];
$file = str_replace('../', '', $file);

echo file_get_contents($file);
?>